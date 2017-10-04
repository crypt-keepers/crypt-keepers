import React from 'react';
import PropTypes from 'prop-types';
import tickerData from '../ticker-data';
import helpers from '../helpers/api-helpers';

const Overview = () => {
  helpers.getTickerData()
    .then((tickerData) => {
      console.log(tickerData);
    });

  return (
    <div>Overview and Pie Chart!
      <div>Ticker</div>
    </div>
  );
};

export default Overview;
