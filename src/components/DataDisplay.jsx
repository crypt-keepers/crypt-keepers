import React from 'react';
import * as d3 from 'd3';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import helpers from '../helpers/api-helpers';

const propTypes = {
  activeCoin: PropTypes.string.isRequired,
};

const defaultProps = {
  activeCoin: 'Bitcoin',
};

// DataDisplay maintains its own state since graph data is not shared between components
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
        this.setState({ coinData, range }, () => this.renderTimeSeriesData());
        this.spinner(false);
      });
  }

  spinner(isSpinning) {
    this.setState({ isLoading: isSpinning });
  }

  renderTimeSeriesData() {
    // svg / line graph settings, hardcoded, customizable
    const width = 640;
    const height = 400;
    const padding = 60;
    const xTicks = 7;
    const yTicks = 5;

    // if svg not found in the DOM, create one and append everything
    const svg = d3.select('#data-display').selectAll('svg');
    if (!svg.node()) {
      const init = d3.select('#data-display')
        .append('svg')
        .attr('width', width)
        .attr('height', height);

      init.append('g')
        .attr('class', 'xaxis')
        .attr('transform', `translate(0, ${height - padding})`);

      init.append('text')
        .attr('class', 'xlabel')
        .attr('text-anchor', 'middle')
        .attr('transform', `translate(${width / 2},${height - (padding / 4)})`)
        .text('Time');

      init.append('g')
        .attr('class', 'xgrid')
        .attr('transform', `translate(0, ${height - padding})`);

      init.append('g')
        .attr('class', 'yaxis')
        .attr('transform', `translate(${padding}, 0)`);

      init.append('text')
        .attr('class', 'ylabel')
        .attr('text-anchor', 'middle')
        .attr('transform', `translate(${padding / 4},${height / 2}) rotate(-90)`)
        .text('Price ($)');

      init.append('g')
        .attr('class', 'ygrid')
        .attr('transform', `translate(${padding}, 0)`);

      init.append('path')
        .attr('class', `plot ${this.props.activeCoin}`);

      init.append('g')
        .attr('class', 'pointer')
        .style('display', 'none');

      d3.select('.pointer').append('circle');

      d3.select('#data-display').append('div')
        .attr('class', 'tooltip')
        .style('display', 'none');

      init.append('rect')
        .attr('class', 'mouse-overlay')
        .attr('width', width)
        .attr('height', height)
        .on('mouseover', () => d3.selectAll('.pointer, .tooltip').style('display', null))
        .on('mouseout', () => d3.selectAll('.pointer, .tooltip').style('display', 'none'));
    }

    // extract time and close info from data
    // reverse data which is given reverse-chronologically
    const data = [];
    this.state.coinData.reverse().forEach((row) => {
      data.push({
        time: new Date(row[0] * 1000),
        low: row[1],
        high: row[2],
        open: row[3],
        close: row[4],
        vol: row[5].toFixed(1),
      });
    });

    // set x and y scale
    const x = d3.scaleTime()
      .range([padding, (width - padding)]);
    const y = d3.scaleLinear()
      .range([(height - padding), padding]);

    // set x and y domain
    const xDom = d3.extent(data, d => d.time);
    const yDom = d3.extent(data, d => d.close);

    // set x and y axis, use extend to calculate domain
    const xAxis = d3
      .axisBottom(x.domain(xDom))
      .ticks(xTicks);
    const yAxis = d3
      .axisLeft(y.domain(yDom))
      .ticks(yTicks);

    // generate data line
    const dataLine = d3.line()
      .x(d => x(d.time))
      .y(d => y(d.close));

    // select and update all elements, add transition
    d3.select('.xaxis')
      .attr('opacity', 0)
      .call(xAxis)
      .transition()
      .duration(1000)
      .attr('opacity', 1);

    d3.select('.xgrid')
      .attr('opacity', 0)
      .call(xAxis.tickSize((2 * padding) - height).tickFormat(''))
      .transition()
      .duration(1000)
      .attr('opacity', 1);

    d3.select('.yaxis')
      .attr('opacity', 0)
      .call(yAxis)
      .transition()
      .duration(1000)
      .attr('opacity', 1);

    d3.select('.ygrid')
      .attr('opacity', 0)
      .call(yAxis.tickSize((2 * padding) - width).tickFormat(''))
      .transition()
      .duration(1000)
      .attr('opacity', 1);

    d3.selectAll('.xlabel,.ylabel')
      .attr('opacity', 0)
      .transition()
      .duration(1000)
      .attr('opacity', 1);

    d3.selectAll('.plot')
      .data([data])
      .transition()
      .duration(1000)
      .attr('d', dataLine)
      .attr('class', `plot ${this.props.activeCoin}`);

    d3.select('.mouse-overlay')
      .on('mousemove', () => {
        // get x y position of where the mouse is
        const pos = d3.mouse(d3.select('.mouse-overlay').node());
        // invert x position to get corresponding time data
        const xTime = x.invert(pos[0]);
        // convert it to data index, limit it to the size of data array
        const i = d3.bisector(d => d.time).left(data, xTime, 0, data.length - 1);
        // move the pointer to the corresponding spot in the data line
        d3.select('.pointer')
          .attr('transform', `translate(${x(data[i].time)}, ${y(data[i].close)})`);
        // display data
        d3.select('.tooltip')
          .html(`low: $${data[i].low}<br>high: $${data[i].high}<br>open: $${data[i].open}<br>close: $${data[i].close}<br>vol: ${data[i].vol}`)
          // .attr('transform', `translate(${x(data[i].time)}, ${y(data[i].close)})`);
          .style('left', `${x(data[i].time) + 15}px`)
          .style('top', `${y(data[i].close) - 15}px`);
      });
  }

  render() {
    const dClass = this.state.range === '1D' ? 'select' : 'unselect';
    const wClass = this.state.range === '1W' ? 'select' : 'unselect';
    const mClass = this.state.range === '1M' ? 'select' : 'unselect';
    const yClass = this.state.range === '1Y' ? 'select' : 'unselect';
    return (
      <div className="data-display-container">
        <div className="data-title">
          <div>
            Value of {this.props.activeCoin} in USD over
          </div>
          <div className="data-button-bar">
            <button
              onClick={() => this.getRangeData(this.props.activeCoin, '1D')}
              className={dClass}
            >
              1D
            </button>
            <button
              onClick={() => this.getRangeData(this.props.activeCoin, '1W')}
              className={wClass}
            >
              1W
            </button>
            <button
              onClick={() => this.getRangeData(this.props.activeCoin, '1M')}
              className={mClass}
            >
              1M
            </button>
            <button
              onClick={() => this.getRangeData(this.props.activeCoin, '1Y')}
              className={yClass}
            >
              1Y
            </button>
          </div>
        </div>
        <div id="data-display">
          <div className={this.state.isLoading ? 'data-overlay' : ''} />
          <div className={this.state.isLoading ? 'loader' : ''} />
        </div>
      </div>
    );
  }
}

DataDisplay.propTypes = propTypes;
DataDisplay.defaultProps = defaultProps;

const mapStateToProps = (state = {}) => (
  {
    activeCoin: state.coin,
  }
);

export default connect(mapStateToProps)(DataDisplay);
