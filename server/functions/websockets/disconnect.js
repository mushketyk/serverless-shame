const awsXRay = require('aws-xray-sdk');
const AWS = awsXRay.captureAWS(require('aws-sdk'));

const docClient = new AWS.DynamoDB.DocumentClient();

const connectionsTable = process.env.CONNECTIONS_TABLE;

module.exports.handler = async (event) => {
  console.log('Websockets disconnect', event);

  const connectionId = event.requestContext.connectionId;

  console.log('Removing item: ', item);

  await docClient.delete({
    TableName: connectionsTable,
    Key: {
      id: connectionId
    }
  }).promise();

  return {}
}
