import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  list: PropTypes.arrayOf(PropTypes.string),
  handleSubmit: PropTypes.func,
};

const defaultProps = {
  list: [],
  handleSubmit: () => {},
};

class MyFinances extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coin: '',
      amount: '',
    };
  }

  addCoin(e) {
    this.props.handleSubmit(e, this.state.coin, this.state.amount);
  }

  render() {
    const InputCoin =
      <div>
        <select value={this.state.coin} onChange={e => this.setState({ coin: e.target.value })}>
          <option value="BTC">Bitcoin</option>
          <option value="ETH">Etherium</option>
          <option value="LTC">Litecoin</option>
        </select>
        <input value={this.state.amount} onChange={e => this.setState({ amount: e.target.value })} placeholder="Enter Amount"></input>
        <button onClick={e => this.addCoin(e)}>Add</button>
      </div>;

    const DisplayCoin = <div>List of Coins, Quantity, Current Value in USD</div>;

    const PieChart = <div>PIE CHART!!!</div>;

    return (
      <div>
        {InputCoin}
        {DisplayCoin}
        {PieChart}
      </div>
    );
  }
}

MyFinances.propTypes = propTypes;
MyFinances.defaultProps = defaultProps;

export default MyFinances;
