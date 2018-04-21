'use strict';

const NS_IN_SECOND = 1e9;
const MS_IN_SECOND = 1e6;

/**
 * A timeout in milliseconds to abort a request. If set to 0 (default)
 * @param {Array} start - [seconds, nanoseconds]
 * @return {Number} durationInMs
 */
const getMilisecondsDiffFromNow = (start) => {
  const now = process.hrtime();
  const nsDiff = ((now[0] - start[0]) * NS_IN_SECOND) + (now[1] - start[1]);

  return nsDiff / MS_IN_SECOND;
};

module.exports = {
  getMilisecondsDiffFromNow,
};
