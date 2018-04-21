'use strict';

const STATUS_SUCCESS = 'success';
const STATUS_NOT_FULFILLED = 'not_fulfilled';
const STATUS_BAD_REQUEST = 'bad_request';
const STATUS_SERVER_ERROR = 'server_error';
const STATUS_CONNECTION_REFUSED = 'connection_refused';

/**
 * Retuns status to log, based on the response and the content it should find on the page
 *
 * @param {AxiosResponse} response
 * @param {String} content
 * @return {String} status
 */
const getStatusBasedOnResponse = (response, content) => {
  switch (true) {
    case response.status < 200 || response.status >= 300:
      return STATUS_BAD_REQUEST;
    case response.data.indexOf(content) >= 0:
      return STATUS_SUCCESS;
    default:
      return STATUS_NOT_FULFILLED;
  }
};

/**
 * Retuns status to log, based on the error received.
 *
 * @param {AxiosError} response
 * @return {String} status
 */
const getStatusBasedOnError = (error) => {
  switch (true) {
    case error.code === 'ECONNREFUSED':
      return STATUS_CONNECTION_REFUSED;
    default:
      return STATUS_SERVER_ERROR;
  }
};

module.exports = {
  getStatusBasedOnResponse,
  getStatusBasedOnError,
};
