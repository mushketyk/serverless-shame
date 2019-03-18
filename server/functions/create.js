'use strict';

const bluebird = require('bluebird');
const AWS = require('aws-sdk');
AWS.config.setPromisesDependency(bluebird);
const uuid = require('uuid');
var jwtDecode = require('jwt-decode');

const docClient = new AWS.DynamoDB.DocumentClient();

const tableName = process.env.DYNAMODB_TABLE;

module.exports.handler = async (event) => {
  console.log('Caller event', event);
  console.log('Creating shame with data ', event.body);
  const timestamp = new Date().toISOString();
  const jwtToken = event.headers.Authorization;
  const decodedJwt = jwtDecode(jwtToken);

  const reporter = `${decodedJwt.given_name} ${decodedJwt.family_name}`; 

  const bodyJson = JSON.parse(event.body);

  const newItem = await docClient.put({
    TableName: tableName,
    Item: {
      id: uuid.v4(),
      ...bodyJson,
      reporter: reporter,
      timestamp
    }
  }).promise();

  return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify(
      newItem.Attributes
    ),
  };
};
