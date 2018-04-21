'use strict';

const STATUS_SUCCESS = 'success';
const STATUS_NOT_FULFILLED = 'not_fulfilled';
const STATUS_BAD_REQUEST = 'bad_request';
const STATUS_SERVER_ERROR = 'server_error';

const axios = require('axios');
const { getMilisecondsDiffFromNow } = require('../lib');

module.exports = (event, context) => {
  const { url, content } = event;

  const time = process.hrtime();
  axios.get(url)
    .then((response) => {
      const totalTime = getMilisecondsDiffFromNow(time);
      let status = STATUS_NOT_FULFILLED;

      if (response.status < 200 || response.status >= 300) {
        status = STATUS_BAD_REQUEST;
      } else if (response.data.indexOf(content) >= 0) {
        status = STATUS_SUCCESS;
      }

      console.log({
        url,
        status,
        totalTime,
      });
    })
    .catch(() => {
      console.log({
        url,
        status: STATUS_SERVER_ERROR,
        totalTime: getMilisecondsDiffFromNow(time),
      });
    });
};
