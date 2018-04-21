'use strict';

const axios = require('axios');
const util = require('../lib');

module.exports = (event, context) => {
  const { url, content } = event;

  const time = process.hrtime();
  const region = process.env.REGION;
  axios.get(url)
    .then((response) => {
      const totalTime = util.getMilisecondsDiffFromNow(time);
      const status = util.getStatusBasedOnResponse(response, content);

      console.log({
        url,
        content,
        status,
        totalTime,
        region,
      });
    })
    .catch((error) => {
      const totalTime = util.getMilisecondsDiffFromNow(time);
      const status = util.getStatusBasedOnError(error);

      console.log({
        url,
        content,
        status,
        totalTime,
        region,
      });
    });
};
