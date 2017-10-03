const Promise = require('bluebird');
const db = require('../db');

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
    get: () => {
      let dummyData = 'Search';
      return new Promise((resolve, reject) => {
        resolve(dummyData);
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
