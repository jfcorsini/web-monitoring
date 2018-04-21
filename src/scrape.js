'use strict';

const AWS = require('aws-sdk');

const urls = require('../list');

const euCentralLambda = new AWS.Lambda({
  region: 'eu-central-1',
});

module.exports = (event, context) => {
  urls.forEach((payload) => {
    const params = {
      FunctionName: 'web-monitoring-dev-requestUrl',
      InvocationType: 'RequestResponse',
      Payload: JSON.stringify(payload),
    };

    return euCentralLambda.invoke(params, (err) => {
      if (err) {
        console.debug('Error when invoking', err, err.stack);
      }
    });
  });
};
