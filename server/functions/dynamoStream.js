const awsXRay = require('aws-xray-sdk');
const AWS = awsXRay.captureAWS(require('aws-sdk'));

const docClient = new AWS.DynamoDB.DocumentClient()

// const tableName = process.env.DYNAMODB_TABLE;
const connectionsTableName = process.env.CONNECTIONS_TABLE;
const stage = process.env.STAGE;
const apiId = process.env.API_ID;

module.exports.handler = async (event) => {
  console.log('Processing events batch from DynamoDB', event);
  // const domain = event.requestContext.domainName;
  // const stage = event.requestContext.stage;
  // const callbackUrlForAWS = util.format(util.format('https://%s/%s', domain, stage)); //construct the needed url

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
    // callback(null, `Successfully processed ${event.Records.length} records.`);
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
      ConnectionId: connectionId, // connectionId of the receiving ws-client
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
    // throw e;
  }
}

// module.exports.defaultHandler = async (event, context) => {

//   return {
//     statusCode: 200
//   };
// }
