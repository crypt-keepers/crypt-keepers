import React from 'react';
import PropTypes from 'prop-types';
import helpers from '../helpers/api-helpers';
import OverviewItem from './OverviewItem';
import TableRow from './TableRow';

const propTypes = {
  handleClick: PropTypes.func,
};

const defaultProps = {
  handleClick: e => (e),
};

class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      BTC: {},
      LTC: {},
      ETH: {},
    };
  }

  componentDidMount() {
    helpers.getTickerData()
      .then((tickerData) => {
        tickerData.forEach((coinObj) => {
          this.setState({ [coinObj.coin]: coinObj.data });
        });
      });
  }

  render() {
    return (
      <div className="table-container">Click a coin to see data<br />
        <table>
          <tbody>
            <tr>
              <th />
              <th>Price</th>
              <th>Bid</th>
              <th>Ask</th>
            </tr>
            <TableRow
              coin={this.state.BTC}
              name="BTC"
              onClick={() => { this.props.handleClick('bitcoin'); }}
            />
            <TableRow
              coin={this.state.LTC}
              name="LTC"
              onClick={() => { this.props.handleClick('litecoin'); }}
            />
            <TableRow
              coin={this.state.ETH}
              name="ETH"
              onClick={() => { this.props.handleClick('etherium'); }}
            />
          </tbody>
        </table>

        {/* <div
          className="coin-item"
          onClick={() => { this.props.handleClick('bitcoin'); }}
          role="menuitem"
          tabIndex="0"
        >
          Bitcoin
          <OverviewItem coin={this.state.BTC} />
        </div>
        <div
          className="coin-item"
          onClick={() => { this.props.handleClick('litecoin'); }}
          role="menuitem"
          tabIndex="0"
        >
          Litecoin
          <OverviewItem coin={this.state.LTC} />
        </div>
        <div
          className="coin-item"
          onClick={() => { this.props.handleClick('etherium'); }}
          role="menuitem"
          tabIndex="0"
        >
          Etherium
          <OverviewItem coin={this.state.ETH} />
        </div> */}
      </div>
    );
  }
}

Overview.propTypes = propTypes;
Overview.defaultProps = defaultProps;

export default Overview;
