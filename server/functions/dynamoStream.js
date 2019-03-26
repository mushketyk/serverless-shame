const awsXRay = require('aws-xray-sdk');
const AWS = awsXRay.captureAWS(require('aws-sdk'));

const docClient = new AWS.DynamoDB.DocumentClient()

// const tableName = process.env.DYNAMODB_TABLE;
const connectionsTableName = process.env.CONNECTIONS_TABLE;
const stage = process.env.STAGE;
const apiId = process.env.API_ID;

module.exports.handler = async (event) => {
  console.log('Processing events batch from DynamoDB', event);

  for (const record of event.Records) {
    console.log('Processing record', record)
    if (record.eventName !== 'INSERT') {
      continue
    }

    const connections = await docClient.scan({
      TableName: connectionsTableName
    }).promise();

    console.log('Current connections', connections)

    const crime = JSON.stringify(record.dynamodb.NewImage.crime.S);
    const payload = {
      crime
    }

    for (const connection of connections.Items) {
      const connectionId = connection.id;
      await sendMessageToClient(connectionId, payload);
    }

  }
  return {}
};

async function sendMessageToClient(connectionId, payload) {
  const connectionParams = {
    apiVersion: "2018-11-29",
    endpoint: `${apiId}.execute-api.eu-central-1.amazonaws.com/${stage}`
  };
  console.log('Connecting to API Gateway', connectionParams);
  const gatewayApi = new AWS.ApiGatewayManagementApi(connectionParams);

  try {
    await gatewayApi.postToConnection({
      ConnectionId: connectionId,
      Data: JSON.stringify(payload),
    }).promise();
  } catch (e) {
    console.log('Failed to send message', JSON.stringify(e))
    if (e.statusCode === 410) {
      console.log('Stale connection');
      await docClient.delete({
        TableName: connectionsTableName,
        Key: {
          id: connectionId
        }
      }).promise();
    }
  }
}
