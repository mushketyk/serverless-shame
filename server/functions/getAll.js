'use strict';

const AWS = require('aws-sdk');

const bluebird = require('bluebird');
AWS.config.setPromisesDependency(bluebird);
const docClient = new AWS.DynamoDB.DocumentClient();

const cors = require('cors')
const express = require('express')
const app = express()

const awsServerlessExpress = require('aws-serverless-express')

const tableName = process.env.DYNAMODB_TABLE;

app.use(cors())
app.get('/shames', async (req, res) => {
  console.log('Fetching all shames');
  const result = await docClient.scan({
    TableName: tableName
  }).promise();

  console.log('Fetched shames: ', {
    items: result.Items
  });
 
  // res.setHeader('Content-Type', 'application/json')
  res.json(
    result.Items
  );
})

// app.use('/', router)

const server = awsServerlessExpress.createServer(app)
exports.handler = (event, context) => { awsServerlessExpress.proxy(server, event, context) }
