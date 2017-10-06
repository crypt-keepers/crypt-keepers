import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  coin: PropTypes.shape({
    price: PropTypes.string,
    bid: PropTypes.string,
    ask: PropTypes.string,
    size: PropTypes.string,
    time: PropTypes.string,
    volume: PropTypes.string,
  }),
};

const defaultProps = {
  coin: {},
};

const OverviewItem = props => (
  <div>
    <div>
      Price: {props.coin ? Number(props.coin.price).toFixed(2) : ''}
    </div>
    <div>
      Bid: {props.coin ? Number(props.coin.bid).toFixed(2) : ''}
    </div>
    <div>
      Ask: {props.coin ? Number(props.coin.ask).toFixed(2) : ''}
    </div>
  </div>
);

OverviewItem.propTypes = propTypes;
OverviewItem.defaultProps = defaultProps;

export default OverviewItem;
