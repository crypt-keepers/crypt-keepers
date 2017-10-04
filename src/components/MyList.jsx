import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  list: PropTypes.arrayOf(PropTypes.string),
};

const defaultProps = {
  list: [],
};

const MyList = props => (
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

MyList.propTypes = propTypes;
MyList.defaultProps = defaultProps;

export default MyList;
