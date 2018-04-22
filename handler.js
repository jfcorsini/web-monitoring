'use strict';

const requestUrl = require('./src/requestUrl');
const scrape = require('./src/scrape');
const { urls } = require('./config');

module.exports.requestUrl = (event, context) => {
  requestUrl(event.url, event.content);
};

module.exports.scrape = (event, context) => {
  scrape(urls);
};
