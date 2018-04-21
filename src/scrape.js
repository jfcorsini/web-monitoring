'use strict';

module.exports = (event, context, callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Scrape function was executed!',
      input: event,
    }),
  };
  console.log('Method scrape was called');

  callback(null, response);
};
