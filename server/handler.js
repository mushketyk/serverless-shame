'use strict';

module.exports.hello = async (event) => {
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify(
      [
        {
          reporter: 'John Woods',
          crime: 'Portafilter is dirty',
          shame: 'Oh no-no-no',
          timestamp: '2019-03-18T13:24:15+0000'
        },
        {
          reporter: 'Anonymous',
          crime: 'Wrongful shaming',
          shame: 'Somebody is creating bogus shames',
          timestamp: '2019-03-18T13:24:15+0000'
        }
      ]
    ),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
