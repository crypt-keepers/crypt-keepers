import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  coin: PropTypes.string,
};

const defaultProps = {
  coin: '',
};

const MyList = props => {
  return <div>MyList {props.coin}</div>;
};

MyList.propTypes = propTypes;
MyList.defaultProps = defaultProps;

export default MyList;
