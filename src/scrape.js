'use strict';

const AWS = require('aws-sdk');

const lambda = new AWS.Lambda({
  region: process.env.REGION,
});

/**
 * This method receives an array of URLs and content to be found on that page.
 * For each of these, a lambda function will be invoked to scrape and process it.
 *
 * @param {Array} urls - [{url: string, content: string}]
 */
const scrape = (urls) => {
  urls.forEach((payload) => {
    const params = {
      FunctionName: `web-monitoring-${process.env.STAGE}-requestUrl`,
      InvocationType: 'RequestResponse',
      Payload: JSON.stringify(payload),
    };

    return lambda.invoke(params, (err) => {
      if (err) {
        console.debug('Error when invoking', err, err.stack);
      }
    });
  });
};

module.exports = scrape;
