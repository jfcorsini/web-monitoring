'use strict';

const AWS = require('aws-sdk');
const sinon = require('sinon');

const scrape = require('../../src/scrape');

describe('Testing scrape method', () => {
  let sandbox;

  beforeEach(() => {
    process.env.REGION = 'eu-central-1';
    process.env.STAGE = 'dev';
    sandbox = sinon.sandbox.create();
  });

  afterEach(() => sandbox.restore());

  it('Should invoke lambda function for each url as param', (done) => {
    const invokeFunction = sinon.spy();
    sandbox.stub(AWS, 'Lambda').returns({
      invoke: invokeFunction,
    });

    const urls = [
      {
        url: 'url1',
        content: 'content1',
      },
      {
        url: 'url2',
        content: 'content2',
      },
    ];
    scrape(urls);

    sinon.assert.calledTwice(invokeFunction);
    done();
  });

  it('Should build correct payload to send to lambda', (done) => {
    const invokeFunction = sinon.spy();
    sandbox.stub(AWS, 'Lambda').returns({
      invoke: invokeFunction,
    });

    const urls = [
      {
        url: 'url1',
        content: 'content1',
      },
    ];
    scrape(urls);

    sinon.assert.calledOnce(invokeFunction);
    sinon.assert.calledWith(invokeFunction, {
      FunctionName: 'web-monitoring-dev-requestUrl',
      InvocationType: 'RequestResponse',
      Payload: JSON.stringify(urls[0]),
    });
    done();
  });
});
