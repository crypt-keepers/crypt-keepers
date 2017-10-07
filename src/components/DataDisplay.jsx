import React from 'react';
import * as d3 from 'd3';
import PropTypes from 'prop-types';
import helpers from '../helpers/api-helpers';

const propTypes = {
  activeCoin: PropTypes.string,
};

const defaultProps = {
  activeCoin: 'Bitcoin',
};

const coinColor = {
  Bitcoin: '#81F7E5',
  Etherium: '#7DDF64',
  Litecoin: '#F7567C',
};

const renderTimeSeriesData = (coin, coinData) => {
  // clear svg before every render
  d3.select('#data-display').selectAll('svg').remove();

  // svg / line graph settings, hardcoded, customizable
  const width = 600;
  const height = 400;
  const padding = 40;
  const xTicks = 6;
  const yTicks = 4;

  // extract time and close info from data
  const data = [];
  coinData.map(row => data.push({ time: new Date(row[0] * 1000), close: row[4] }));

  const svg = d3.select('#data-display')
    .append('svg')
    .attr('width', width)
    .attr('height', height);

  // x range is set this way because data given reverse-chronologically
  const x = d3.scaleTime()
    .range([padding, (width - padding)]);

  const y = d3.scaleLinear()
    .range([(height - padding), padding]);

  // set x and y axis, use extend to calculate domain
  const xAxis = d3
    .axisBottom(x.domain(d3.extent(data, d => d.time)))
    .ticks(xTicks);
  const yAxis = d3
    .axisLeft(y.domain(d3.extent(data, d => d.close)))
    .ticks(yTicks);

  // generate line
  const line = d3.line()
    .x(d => x(d.time))
    .y(d => y(d.close));

  // append everything
  svg.append('g')
    .attr('transform', `translate(0, ${height - padding})`)
    .call(xAxis);

  svg.append('g')
    .attr('transform', `translate(${padding}, 0)`)
    .call(yAxis);

  svg.append('path')
    .data([data])
    .attr('fill', 'none')
    .attr('stroke', coinColor[coin])
    .attr('d', line);
};

class DataDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coinData: [],
      range: '1D',
      isLoading: false,
    };

    this.getRangeData = this.getRangeData.bind(this);
  }

  componentDidMount() {
    this.getRangeData(this.props.activeCoin, '1D');
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.activeCoin !== nextProps.activeCoin) {
      this.getRangeData(nextProps.activeCoin, this.state.range);
    }
  }

  getRangeData(coin, range) {
    this.spinner(true);
    helpers.getRangeData(coin, range)
      .then((coinData) => {
        this.setState({ coinData, range }, () => renderTimeSeriesData(coin, this.state.coinData));
        this.spinner(false);
      });
  }

  spinner(isSpinning) {
    this.setState({ isLoading: isSpinning });
  }

  render() {
    return (
      <div className="data-display-container">
        <div className="data-title">
          <div>
            Value of {this.props.activeCoin} in USD plotted over {this.state.range} range
          </div>
          <div className="data-button-bar">
            Change range:
            <button onClick={() => this.getRangeData(this.props.activeCoin, '1D')}>1D</button>
            <button onClick={() => this.getRangeData(this.props.activeCoin, '1W')}>1W</button>
            <button onClick={() => this.getRangeData(this.props.activeCoin, '1M')}>1M</button>
            <button onClick={() => this.getRangeData(this.props.activeCoin, '1Y')}>1Y</button>
          </div>
        </div>
        <div id="data-display" />
        <div className={this.state.isLoading ? 'data-overlay' : ''} />
        <div className={this.state.isLoading ? 'loader' : ''} />
      </div>
    );
  }
}

DataDisplay.propTypes = propTypes;
DataDisplay.defaultProps = defaultProps;

export default DataDisplay;
