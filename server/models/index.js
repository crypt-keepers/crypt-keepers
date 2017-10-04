const Promise = require('bluebird');
const db = require('../db');
const request = require('request');
const CONSTANTS = require('../constants');

module.exports = {
  user: {
    get: () => {
      let dummyData = 'User';
      return new Promise((resolve, reject) => {
        resolve(dummyData);
      });
    },
    post: () => {

    },
  },
  range: {
    get: () => {
      let dummyData = 'Range';
      return new Promise((resolve, reject) => {
        resolve(dummyData);
      });
    },
    post: () => {

    },
  },
  search: {
    get: (currency) => {
      const options = {
        method: 'GET',
        uri: CONSTANTS.CRYPTOPANIC_URI,
        qs: {
          auth_token: CONSTANTS.AUTH_TOKEN,
          currency: currency,
        },
        headers: { 'User-Agent': 'cryptonium' },
        json: true,
      };

      return new Promise((resolve, reject) => {
        request.get(options, (error, response, body) => {
          if (error) {
            reject(error);
          } else if (response.statusCode === 200) {
            resolve(body);
          }
        });
      });
    },
    post: () => {

    },
  },
  list: {
    get: () => {
      let dummyData = 'List';
      return new Promise((resolve, reject) => {
        resolve(dummyData);
      });
    },
    post: () => {

    },
  },
};
