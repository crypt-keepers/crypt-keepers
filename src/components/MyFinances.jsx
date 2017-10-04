import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  list: PropTypes.arrayOf(PropTypes.string),
};

const defaultProps = {
  list: [],
};

const MyFinances = props => (
  <div>
    {props.list.map(coin => (
      <div
        key={coin}
        onClick={() => (props.handleClick(coin))}
        role="menuitem"
        tabIndex="0"
      >
        {coin}
      </div>
    ))}
  </div>
);

MyFinances.propTypes = propTypes;
MyFinances.defaultProps = defaultProps;

export default MyFinances;
