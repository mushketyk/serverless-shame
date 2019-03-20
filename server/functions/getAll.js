'use strict';

const AWS = require('aws-sdk');

const bluebird = require('bluebird');
AWS.config.setPromisesDependency(bluebird);
const docClient = new AWS.DynamoDB.DocumentClient();

const tableName = process.env.DYNAMODB_TABLE;

module.exports.handler = async (event) => {
  console.log('Fetching all shames');
  const result = await docClient.scan({
    TableName: tableName
  }).promise();

  console.log('Fetched shames: ', {
    items: result.Items
  });

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify(
      result.Items
    ),
  };
};
