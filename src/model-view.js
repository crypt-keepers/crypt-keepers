import React from 'react';
import dummyData from './data.json';

// class Model {
//   constructor() {
//     this._data = JSON.stringify(dummyData);
//   }
//
//   set data(newData) {
//     this._data = newData;
//   }
//
//   get data() {
//     return this._data;
//   }
// }

// export default new Model();

const EventEmitter = require('events').EventEmitter;

const emitter = new EventEmitter();

const data = dummyData;

module.exports = {
  getData: () => (
    data.concat()
  ),

  // subscribe: (callback) => {
  //   emitter.addListener('update', callback);
  // },
  //
  // unsubscribe: (callback) => {
  //   emitter.removeListener('update', callback);
  // },

  newData: (element) => {
    data.push(element);
    emitter.emit('update');
  },
};
