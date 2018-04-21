'use strict';

module.exports = (event, context, callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'RequestUrl function was executed!',
      input: event,
    }),
  };

  callback(null, response);
};
