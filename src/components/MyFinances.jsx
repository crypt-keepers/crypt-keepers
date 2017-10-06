import React from 'react';
import PropTypes from 'prop-types';
import helpers from '../helpers/api-helpers';

const propTypes = {
  className: PropTypes.string,
  username: PropTypes.string,
};

const defaultProps = {
  className: '',
  username: '',
};

class MyFinances extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coin: 'ETH',
      quantity: '',
      position: {},
      value: {},
      sum: 0,
      showAlert: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.username.length) {
      this.handleSubmit(null, null, null, nextProps.username)
        .then(userData => this.calculateValue(userData));
    }
  }

  handleSubmit(e, coin, quantity, username) {
    if (e && coin) {
      return helpers.postUserData(this.props.username, coin, quantity)
        .then(() => helpers.getUserData(this.props.username));
    }
    return helpers.getUserData(username);
  }

  addCoin(e) {
    this.handleSubmit(e, this.state.coin, this.state.quantity)
      .then(userData => this.calculateValue(userData))
      .then(() => {
        this.setState({
          showAlert: true,
        });
        setTimeout(() => {
          this.setState({
            showAlert: false,
          });
        }, 5000);
      })
      .then(() => this.setState({
        coin: 'ETH',
        quantity: '',
      }));
  }

  calculateValue(userData) {
    return helpers.getTickerData()
      .then((tickerData) => {
        const value = {};
        let sum = 0;
        tickerData.forEach((coinObj) => {
          value[coinObj.coin] = (userData.position[coinObj.coin] * coinObj.data.price).toFixed(2);
          sum += userData.position[coinObj.coin] * coinObj.data.price;
        });
        sum = sum.toFixed(2);
        return this.setState({
          position: userData.position,
          value,
          sum,
        });
      });
  }

  render() {
    const Alert = (this.state.showAlert)
      ? <div>Coin added to {`${this.props.username}'`}s Wallet!</div>
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
      <div className={this.props.className}>
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
            type="number"
            value={this.state.quantity}
            onChange={e => this.setState({ quantity: e.target.value, showAlert: false })}
            placeholder="Enter Quantity"
          />
          <button onClick={e => this.addCoin(e)}>Add</button>
        </div>
        {Alert}
        <div>{`${this.props.username}'`}s Wallet in USD</div>
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
