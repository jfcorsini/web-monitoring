'use strict';

module.exports = (event, context, callback) => {
  console.debug('url: ', event.url, 'content', event.content);

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'RequestUrl function was executed!',
      input: event,
    }),
  };

  callback(null, response);
};
