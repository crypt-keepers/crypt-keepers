import React from 'react';
import PropTypes from 'prop-types';
import Overview from './Overview';
import MyFinances from './MyFinances';

const propTypes = {
  handleClick: PropTypes.func,
  handleSubmit: PropTypes.func,
};

const defaultProps = {
  handleClick: () => {},
  handleSubmit: () => {},
};

class Panel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'overview',
    };
  }

  changePanel(view) {
    this.setState({
      view,
    });
  }

  render() {
    return (
      <div>
        <div>Side Panel</div>
        <div className="nav">
          <button onClick={() => this.changePanel('overview')}>
            Coin Overview
          </button>
          <button onClick={() => this.changePanel('finances')}>
            Panel - My Finances
          </button>
        </div>
        <div className="main">
          {this.state.view === 'overview'
            ? <Overview handleClick={this.props.handleClick} />
            : <MyFinances handleSubmit={this.props.handleSubmit} />}
        </div>
      </div>
    );
  }
}

Panel.propTypes = propTypes;
Panel.defaultProps = defaultProps;

export default Panel;
