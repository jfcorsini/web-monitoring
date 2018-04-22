'use strict';

const axios = require('axios');
const sinon = require('sinon');
const { expect } = require('chai');

const requestUrl = require('../../src/requestUrl');

describe('Testing requestUrl method', () => {
  let sandbox;

  beforeEach(() => {
    process.env.REGION = 'eu-central-1';
    sandbox = sinon.sandbox.create();
  });

  afterEach(() => sandbox.restore());

  it('Should fetch URL which responds with 200 and content belongs to, so status is success', (done) => {
    const axiosReturn = new Promise(response => response({
      data: 'String string Log in to Facebook string string',
      status: 200,
    }));

    sandbox.stub(axios, 'get').returns(axiosReturn);

    const url = 'https://en-gb.facebook.com/login';
    const content = 'Log in to Facebook';

    requestUrl(url, content)
      .then((response) => {
        expect(response.status).to.equal('success');
        expect(response.url).to.equal(url);
        expect(response.content).to.equal(content);
        expect(response.region).to.equal('eu-central-1');
        expect(response.totalTime).to.greaterThan(0);

        done();
      });
  });

  it('Should fetch URL which responds with 200 but content is not found, so status is not_fulfilled', (done) => {
    const axiosReturn = new Promise(response => response({
      data: 'String string string string string string',
      status: 200,
    }));

    sandbox.stub(axios, 'get').returns(axiosReturn);

    const url = 'https://en-gb.facebook.com/login';
    const content = 'Log in to Facebook';

    requestUrl(url, content)
      .then((response) => {
        expect(response.status).to.equal('not_fulfilled');

        done();
      });
  });

  it('Should fetch URL which responds with 400 and content is found, but status is bad_request', (done) => {
    const axiosReturn = new Promise(response => response({
      data: 'String string Log in to Facebook string',
      status: 400,
    }));

    sandbox.stub(axios, 'get').returns(axiosReturn);

    const url = 'https://en-gb.facebook.com/login';
    const content = 'Log in to Facebook';

    requestUrl(url, content)
      .then((response) => {
        expect(response.status).to.equal('bad_request');

        done();
      });
  });

  it('Should fetch URL which responds with 400 and content is not found, so status is bad_request', (done) => {
    const axiosReturn = new Promise(response => response({
      data: 'String string string string string',
      status: 400,
    }));

    sandbox.stub(axios, 'get').returns(axiosReturn);

    const url = 'https://en-gb.facebook.com/login';
    const content = 'Log in to Facebook';

    requestUrl(url, content)
      .then((response) => {
        expect(response.status).to.equal('bad_request');

        done();
      });
  });

  it('Should fetch URL which does not exist, so status should be connection_refused', (done) => {
    const axiosReturn = new Promise((_, error) => error({
      code: 'ECONNREFUSED',
    }));

    sandbox.stub(axios, 'get').returns(axiosReturn);

    const url = 'http://connection.refused.com';
    const content = 'Log in to Facebook';

    requestUrl(url, content)
      .then((response) => {
        console.log(response);
        expect(response.status).to.equal('connection_refused');

        done();
      });
  });

  it('If some unknow error happens, status should be server_error', (done) => {
    const axiosReturn = new Promise((_, error) => error({
      code: 'UNKNOWN_ERROR',
    }));

    sandbox.stub(axios, 'get').returns(axiosReturn);

    const url = 'http:://url.of.weird.website.com';
    const content = 'Log in to Facebook';

    requestUrl(url, content)
      .then((response) => {
        console.log(response);
        expect(response.status).to.equal('server_error');

        done();
      });
  });
});
