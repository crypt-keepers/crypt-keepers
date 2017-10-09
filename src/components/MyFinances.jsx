import React from 'react';
import * as d3 from 'd3';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getUserData, updateUserData } from '../actions/myFinanceActions';
import { changeCoin } from '../actions/appActions';

const propTypes = {
  className: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  getUserData: PropTypes.func.isRequired,
  updateUserData: PropTypes.func.isRequired,
  userData: PropTypes.shape({
    position: PropTypes.object,
    username: PropTypes.string,
    __v: PropTypes.number,
    _id: PropTypes.string,
  }).isRequired,
  tickerData: PropTypes.objectOf(PropTypes.object).isRequired,
};

const defaultProps = {
  className: '',
  handleClick: e => (e),
  getUserData: e => (e),
  updateUserData: e => (e),
  username: '',
  userData: {},
  tickerData: {},
};

const coinName = {
  BTC: 'Bitcoin',
  ETH: 'Ethereum',
  LTC: 'Litecoin',
};

// MyFinance retains state since form and table data is not shared between components
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
    if (nextProps.username.length && nextProps.username !== this.props.username) {
      this.props.getUserData(nextProps.username);
    }
    if (nextProps.userData.position
      && JSON.stringify(nextProps.userData) !== JSON.stringify(this.props.userData)) {
      this.generateTableAndChart(nextProps.userData);
    }
  }

  addCoin() {
    this.props.updateUserData(this.props.username, this.state.coin, this.state.quantity);
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
  }

  generateTableAndChart(userData) {
    const value = {};
    let sum = 0;
    const { tickerData } = this.props;
    return this.setState({
      position: userData.position,
    }, () => {
      Object.keys(tickerData).forEach((coin) => {
        value[coin] = (userData.position[coin] * tickerData[coin].price).toFixed(2);
        sum += userData.position[coin] * tickerData[coin].price;
      });
      sum = sum.toFixed(2);
      return this.setState({
        value,
        sum,
      }, () => {
        if (this.state.sum !== '0.00') {
          this.renderPieChart(this.state.value);
        }
      });
    });
  }

  renderPieChart(valueData) {
    // customizable parameters
    const width = 200;
    const height = 200;
    const radius = 85;
    const labelPadding = 40;
    const animationPadding = 15;

    // process data
    const data = [];
    Object.keys(valueData).forEach((key) => {
      if (valueData[key] !== '0.00') {
        data.push({ coin: coinName[key], value: valueData[key] });
      }
    });

    // pie chart data (sort alphabetically)
    const pie = d3.pie().value(d => d.value)
      .sort((a, b) => a.coin.localeCompare(b.coin));

    // pie chart with no hole
    const path = d3.arc()
      .outerRadius(radius)
      .innerRadius(0);

    // if svg not found in the DOM, create one and append everything
    const svg = d3.select('#pie-chart').selectAll('svg');
    if (!svg.node()) {
      const init = d3.select('#pie-chart')
        .append('svg')
        .attr('width', width)
        .attr('height', height);

      init.append('g')
        .attr('class', 'pie')
        .attr('transform', `translate(${width / 2}, ${height / 2})`);

      d3.select('.pie')
        .data(pie(data))
        .enter()
        .append('g')
        .append('path');

      d3.select('.pie')
        .data(pie(data))
        .enter()
        .append('text');
    }

    d3.select('.pie').selectAll('.slice')
      .data(pie(data))
      .enter()
      .append('g')
      .attr('class', d => `slice ${d.data.coin}`)
      .on('click', d => this.props.handleClick(d.data.coin))
      .on('mouseover', (d) => {
        d3.selectAll(`.slice.${d.data.coin}`)
          .transition()
          .duration(500)
          .attr('transform', () => {
            const midAngle = ((d.endAngle - d.startAngle) / 2) + d.startAngle;
            const x = Math.sin(midAngle) * animationPadding;
            const y = -Math.cos(midAngle) * animationPadding;
            return `translate(${x},${y})`;
          });
      })
      .on('mouseout', (d) => {
        d3.select(`.slice.${d.data.coin}`)
          .transition()
          .duration(500)
          .attr('transform', 'translate(0, 0)');
      })
      .append('path');

    d3.select('.pie')
      .selectAll('path')
      .data(pie(data))
      .transition()
      .duration(750)
      .attr('d', path);

    // text label position
    const label = d3.arc()
      .outerRadius(radius - labelPadding)
      .innerRadius(radius - labelPadding);

    // rotate text along mid angle of the slice
    const rotateLabel = (d) => {
      const midAngle = (180 * (d.startAngle + d.endAngle)) / (2 * Math.PI);
      return (midAngle > 180) ? midAngle + 90 : midAngle - 90;
    };

    d3.select('.pie')
      .selectAll('text')
      .data(pie(data))
      .enter()
      .append('text')
      .attr('class', d => `text ${d.data.coin}`)
      .attr('text-anchor', 'middle')
      .attr('transform', d => `translate(${label.centroid(d)}) rotate(${rotateLabel(d)})`)
      .text(d => d.data.coin);

    d3.select('.pie')
      .selectAll('text')
      .transition()
      .duration(750)
      .attr('transform', d => `translate(${label.centroid(d)}) rotate(${rotateLabel(d)})`);
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
      <div className={`my-finance ${this.props.className}`}>
        <div className="wallet-entry">
          <select
            value={this.state.coin}
            onChange={e => this.setState({ coin: e.target.value })}
          >
            <option value="BTC">Bitcoin</option>
            <option value="ETH">Ethereum</option>
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
            <tr className="table-header">
              <th>Coin</th>
              <th>Quantity</th>
              <th>Value</th>
            </tr>

          </thead>
          <tbody>
            {TableData}
            <tr className="table-header">
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

const mapStateToProps = (state = {}) => (
  {
    userData: state.userData,
    tickerData: state.tickerData,
    username: state.username,
  }
);

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    getUserData,
    updateUserData,
    handleClick: changeCoin,
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(MyFinances);
