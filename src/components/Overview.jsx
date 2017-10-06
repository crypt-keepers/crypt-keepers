import React from 'react';
import PropTypes from 'prop-types';
import helpers from '../helpers/api-helpers';
import OverviewItem from './OverviewItem';

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
      <div>Click a coin to see data<br />
        <div
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
        </div>
      </div>
    );
  }
}

Overview.propTypes = propTypes;
Overview.defaultProps = defaultProps;

export default Overview;
