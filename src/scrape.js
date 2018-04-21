'use strict';

const AWS = require('aws-sdk');

const { urls } = require('../config');

const euCentralLambda = new AWS.Lambda({
  region: process.env.REGION,
});

module.exports = (event, context) => {
  urls.forEach((payload) => {
    const params = {
      FunctionName: `web-monitoring-${process.env.STAGE}-requestUrl`,
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
