// const request = require('request');
// const expect = require('chai').expect;

const expect = require('chai').expect;
const supertest = require('supertest');
const server = require('../index.js');
const request = supertest.agent(server);

describe('Cryptonoium Server tests', () => {
  before(() => {
    // runs before all tests in this block
  });

  after(() => {
    // runs after all tests in this block
  });

  beforeEach(() => {
    // runs before each test in this block
  });

  afterEach(() => {
    // runs after each test in this block
  });

  describe('Cryptonoium User tests', () => {
    it('Should get user details');
    it('Should post user details');
  });

  describe('Cryptonoium Search tests', () => {
    xit('Should get news search for specific currency', (done) => {
      // http://localhost:3000/search?currency=ETH
      done();
    });
    xit('Should get news search for all currencies', (done) => {
      // http://localhost:3000/search
      done();
    });
  });

  describe('Cryptonoium Range tests', () => {
    it('should return an array of time series data', (done) => {
      request
        .get('/range')
        .expect(200);
      done();
    });
    it('Should get range details');
  });

  describe('Cryptonoium List tests', () => {
    it('Should get list details');
    it('Should post list details', (done) => {
      request
        .post('/list')
        .send({username: "bob", coin: "TST"})
        .expect(201)
      done();
    });
    xit('Adds coins to a user watchlist', (done) => {

    });
    xit('Should not add duplicate coins to watchlist', (done) => {

    });
  });
});
