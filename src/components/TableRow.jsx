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
  name: PropTypes.string,
  onClick: PropTypes.func,
};

const defaultProps = {
  coin: {},
  name: '',
  onClick: e => (e),
};

const nameToSymbol = { BTC: 'Bitcoin', LTC: 'Litecoin', ETH: 'Etherium' };

const TableRow = props => (
  <tr onClick={props.onClick}>
    <th>{nameToSymbol[props.name]}</th>
    <th>{Number(props.coin.price).toFixed(2)} </th>
    <th>{Number(props.coin.bid).toFixed(2)}</th>
    <th>{Number(props.coin.ask).toFixed(2)}</th>
  </tr>
);

TableRow.propTypes = propTypes;
TableRow.defaultProps = defaultProps;

export default TableRow;
