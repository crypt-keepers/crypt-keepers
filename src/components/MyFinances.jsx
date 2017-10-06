import React from 'react';
import PropTypes from 'prop-types';
import helpers from '../helpers/api-helpers';

const propTypes = {
  handleSubmit: PropTypes.func,
};

const defaultProps = {
  handleSubmit: () => {},
};

class MyFinances extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coin: '',
      quantity: '',
      username: '',
      position: {},
      value: {},
      sum: 0,
      showAlert: false,
    };
  }

  componentDidMount() {
    this.props.handleSubmit()
      .then(userData => this.calculateValue(userData));
  }

  addCoin(e) {
    this.props.handleSubmit(e, this.state.coin, this.state.quantity)
      .then(userData => this.calculateValue(userData))
      .then(() => this.setState({
        showAlert: true,
      }));
  }

  calculateValue(userData) {
    return helpers.getTickerData()
      .then((tickerData) => {
        let value = {};
        let sum = 0;
        tickerData.forEach((coinObj) => {
          value[coinObj.coin] = userData.position[coinObj.coin] * coinObj.data.price;
          sum += value[coinObj.coin];
        });
        return this.setState({
          username: userData.username,
          position: userData.position,
          value,
          sum,
        });
      });
  }

  render() {
    const Alert = (this.state.showAlert)
      ? <div>Coin added to {`${this.state.username}'`}s Wallet!</div>
      : '';

    const TableData = Object.keys(this.state.position).map(key => (
      <tr key={key}>
        <td>{key}</td>
        <td>{this.state.position[key]}</td>
        <td>$ {this.state.value[key]}</td>
      </tr>
    ));

    const PieChart = <div>PIE CHART!!!</div>;

    return (
      <div>
        <div>
          <select
            value={this.state.coin}
            onChange={e => this.setState({ coin: e.target.value, showAlert: false })}
          >
            <option value="BTC">Bitcoin</option>
            <option value="ETH">Etherium</option>
            <option value="LTC">Litecoin</option>
          </select>
          <input
            value={this.state.quantity}
            onChange={e => this.setState({ quantity: e.target.value, showAlert: false })}
            placeholder="Enter Quantity"
          />
          <button onClick={e => this.addCoin(e)}>Add</button>
        </div>
        {Alert}
        <div>{`${this.state.username}'`}s Wallet in USD</div>
        <table>
          <thead>
            <tr>
              <th>Coin</th>
              <th>Quantity</th>
              <th>Value</th>
            </tr>

          </thead>
          <tbody>
            {TableData}
            <tr>
              <td>Total:</td>
              <td />
              <td>$ {this.state.sum}</td>
            </tr>
          </tbody>
        </table>
        {PieChart}
      </div>
    );
  }
}

MyFinances.propTypes = propTypes;
MyFinances.defaultProps = defaultProps;

export default MyFinances;
