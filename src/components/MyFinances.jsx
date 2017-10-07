import React from 'react';
import * as d3 from 'd3';
import PropTypes from 'prop-types';
import helpers from '../helpers/api-helpers';

const propTypes = {
  className: PropTypes.string,
  handleClick: PropTypes.func,
  username: PropTypes.string,
};

const defaultProps = {
  className: '',
  handleClick: e => (e),
  username: '',
};

const coinName = {
  BTC: 'Bitcoin',
  ETH: 'Litecoin',
  LTC: 'Etherium',
};

class MyFinances extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coin: 'BTC',
      quantity: '',
      position: {},
      value: {},
      sum: 0,
      showAlert: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.username.length) {
      helpers.getUserData(nextProps.username)
        .then(userData => this.generateTableAndChart(userData));
    }
  }

  addCoin() {
    helpers.postUserData(this.props.username, this.state.coin, this.state.quantity)
      .then(() => helpers.getUserData(this.props.username))
      .then(userData => this.generateTableAndChart(userData))
      .then(() => {
        this.setState({
          coin: 'BTC',
          quantity: '',
          showAlert: true,
        });
        setTimeout(() => {
          this.setState({
            showAlert: false,
          });
        }, 5000);
      });
  }

  generateTableAndChart(userData) {
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
        }, () => this.renderPieChart(this.state.value));
      });
  }

  renderPieChart(valueData) {
    d3.select('#pie-chart').selectAll('svg').remove();

    // customizable parameters
    const width = 240;
    const height = 240;
    const radius = 90;
    const padding = 40;

    // process data
    const data = [];
    Object.keys(valueData).map(key => data.push({ coin: coinName[key], value: valueData[key] }));

    const pie = d3.pie().value(d => d.value);

    // append svg
    const svg = d3.select('#pie-chart')
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    // pie chart with no hole
    const path = d3.arc()
      .outerRadius(radius)
      .innerRadius(0);

    // text label position
    const label = d3.arc()
      .outerRadius(radius - padding)
      .innerRadius(radius - padding);

    // pie chart colors
    const color = d3.scaleOrdinal(['red', 'blue', 'green']);

    // append everything
    const g = svg.append('g').attr('transform', `translate(${width / 2}, ${height / 2})`);

    const arc = g.selectAll('.arc')
      .data(pie(data))
      .enter().append('g')
      .on('click', d => this.props.handleClick(d.data.coin));

    arc.append('path')
      .attr('d', path)
      .attr('fill', d => color(d.data.coin));

    arc.append('text')
      .attr('text-anchor', 'middle')
      .attr('transform', d => `translate(${label.centroid(d)})`)
      .text(d => d.data.coin);
  }

  render() {
    const Alert = (this.state.showAlert)
      ? <div>Coin added to {`${this.props.username}'`}s Wallet!</div>
      : '';
    const TableData = Object.keys(this.state.position).map(key => (
      <tr key={key} onClick={() => this.props.handleClick(coinName[key])}>
        <td>{coinName[key]}</td>
        <td>{this.state.position[key]}</td>
        <td>$ {this.state.value[key]}</td>
      </tr>
    ));
    return (
      <div className={this.props.className}>
        <div>
          <select
            value={this.state.coin}
            onChange={e => this.setState({ coin: e.target.value })}
          >
            <option value="BTC">Bitcoin</option>
            <option value="ETH">Etherium</option>
            <option value="LTC">Litecoin</option>
          </select>
          <input
            type="number"
            value={this.state.quantity}
            onChange={e => this.setState({ quantity: e.target.value })}
            placeholder="Enter Quantity"
          />
          <button onClick={() => this.addCoin()}>Add</button>
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
        <div id="pie-chart" />
      </div>
    );
  }
}

MyFinances.propTypes = propTypes;
MyFinances.defaultProps = defaultProps;

export default MyFinances;
