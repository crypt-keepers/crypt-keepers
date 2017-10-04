import React from 'react';
import PropTypes from 'prop-types';
import tickerData from '../ticker-data';
import helpers from '../helpers/api-helpers';

const Trending = () => {
  helpers.getTickerData()
    .then((data) => console.log(data));

  return (
    <div>Trending and Pie Chart!
      <div>Ticker</div>
    </div>
  );
};

export default Trending;
