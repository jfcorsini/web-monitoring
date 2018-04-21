'use strict';

const getMilisecondsDiffFromNow = require('./getMilisecondDiffFromNow');
const { getStatusBasedOnResponse, getStatusBasedOnError } = require('./getStatus');

module.exports = {
  getMilisecondsDiffFromNow,
  getStatusBasedOnResponse,
  getStatusBasedOnError,
};
