'use strict';

const axios = require('axios');

const lib = require('../lib');

/**
 * Gather all information and log to the console together with aws region.
 *
 * @param {String} url
 * @param {String} content
 * @param {String} status
 * @param {String} totalTime
 */
const logAndReturn = (url, content, status, totalTime) => {
  const params = {
    url,
    content,
    status,
    totalTime,
    region: process.env.REGION,
  };

  console.log(params);
  return params;
};

/**
 * Make a GET request to the URL param and check wheter the content parame
 * can be found on that page. After that we log information about that request
 * together with the total time it took.
 *
 * @param {String} url
 * @param {String} content
 */
const requestUrl = (url, content) => {
  const time = process.hrtime();

  return axios.get(url)
    .then((response) => {
      const totalTime = lib.getMilisecondsDiffFromNow(time);
      const status = lib.getStatusBasedOnResponse(response, content);

      return logAndReturn(url, content, status, totalTime);
    })
    .catch((error) => {
      const totalTime = lib.getMilisecondsDiffFromNow(time);
      const status = lib.getStatusBasedOnError(error);

      return logAndReturn(url, content, status, totalTime);
    });
};

module.exports = requestUrl;
