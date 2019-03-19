'use strict';

const bluebird = require('bluebird');
const AWS = require('aws-sdk');
AWS.config.setPromisesDependency(bluebird);
const uuid = require('uuid');
var jwtDecode = require('jwt-decode');

const docClient = new AWS.DynamoDB.DocumentClient();
const s3 = new AWS.S3();

const tableName = process.env.DYNAMODB_TABLE;
const bucketName = process.env.FILES_S3_BUCKET;
const urlExpiration = process.env.SIGNED_URL_EXPIRATION;

module.exports.handler = async (event) => {
  console.log('Caller event', event);
  console.log('Creating shame with data ', event.body);
  const timestamp = new Date().toISOString();
  const jwtToken = event.headers.Authorization;
  const decodedJwt = jwtDecode(jwtToken);

  const reporter = `${decodedJwt.given_name} ${decodedJwt.family_name}`; 

  const bodyJson = JSON.parse(event.body);
  const shameId = uuid.v4();

  const newItem = await docClient.put({
    TableName: tableName,
    Item: {
      id: shameId,
      ...bodyJson,
      reporter: reporter,
      timestamp,
      imageUrl: `https://${bucketName}.s3.amazonaws.com/${shameId}`
    }
  }).promise();

  const url = s3.getSignedUrl('putObject', {
    Bucket: bucketName,
    Key: shameId,
    Expires: urlExpiration
  })

  return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify({
      newItem: newItem.Attributes,
      uploadUrl: url
    }),
  };
};
