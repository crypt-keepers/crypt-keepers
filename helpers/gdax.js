const request = require('request');
const rp = require('request-promise');

<<<<<<< HEAD
<<<<<<< HEAD
const getTimeSeriesByRange = (coin = 'BTC', dateStart, dateEnd, granularity, currency = 'USD') => {
  const options = {
    url: `https://api.gdax.com/products/${coin}-${currency}/candles`,
    qs: {
      start: new Date(Number(dateStart)),
      end: new Date(Number(dateEnd)),
      granularity: Number(granularity),
    },
    headers: {
      'User-Agent': 'Cryptonium',
=======
=======
>>>>>>> (feat) Get time series by range
const getTimeSeriesByRange = (coin = 'BTC',  dateStart = Date.now() - 86400000, dateEnd = Date.now(), granularity = 600, currency = 'USD') => {
  const options = {
    url: `https://api.gdax.com/products/${coin}-${currency}/candles`,
    qs: {
      start: new Date(dateStart),
      end: new Date(dateEnd),
      granularity: granularity,
    },
    headers: {
      'User-Agent': 'Request-Promise',
<<<<<<< HEAD
>>>>>>> (feat) Get time series by range
=======
>>>>>>> (feat) Get time series by range
    },
    json: true,
  };

  return rp(options)
    .then(series => series)
    .catch(err => console.error(err));
};

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD

=======
>>>>>>> (feat) Implement ticker route to fetch spot, bid, ask prices
const getTickerData = (coin = 'BTC', currency = 'USD') => {
  const options = {
    url: `https://api.gdax.com/products/${coin}-${currency}/ticker`,
    headers: {
<<<<<<< HEAD
      'User-Agent': 'Cryptonium',
=======
      'User-Agent': 'Request-Promise',
>>>>>>> (feat) Implement ticker route to fetch spot, bid, ask prices
    },
    json: true,
  };

  return rp(options)
<<<<<<< HEAD
    .then(data => data)
    .catch(err => console.error(err));
};

module.exports.getTimeSeriesByRange = getTimeSeriesByRange;
module.exports.getTickerData = getTickerData;
=======
module.exports.getTimeSeriesByRange = getTimeSeriesByRange;
>>>>>>> (feat) Get time series by range
=======
module.exports.getTimeSeriesByRange = getTimeSeriesByRange;
>>>>>>> (feat) Get time series by range
=======
    .then(series => series)
    .catch(err => console.error(err));
};

module.exports.getTimeSeriesByRange = getTimeSeriesByRange;
module.exports.getTickerData = getTickerData;
>>>>>>> (feat) Implement ticker route to fetch spot, bid, ask prices
