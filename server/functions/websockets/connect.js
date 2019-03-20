const awsXRay = require('aws-xray-sdk');
const AWS = awsXRay.captureAWS(require('aws-sdk'));

const docClient = new AWS.DynamoDB.DocumentClient();

const connectionsTable = process.env.CONNECTIONS_TABLE;

module.exports.handler = async (event) => {
  console.log('Websockets connect', event);

  const connectionId = event.requestContext.connectionId;
  const item = {
    id: connectionId
  };

  console.log('Storing item: ', item);

  await docClient.put({
    TableName: connectionsTable,
    Item: item
  }).promise();

  return {}
}
