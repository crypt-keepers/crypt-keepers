import React from 'react';
import PropTypes from 'prop-types';
import Overview from './Overview';
import MyFinances from './MyFinances';

const propTypes = {
  handleClick: PropTypes.func,
};

const defaultProps = {
  handleClick: () => {},
};

class Panel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'trending',
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
          <button onClick={() => this.changePanel('trending')}>
            Coin Overview
          </button>
          <button onClick={() => this.changePanel('myList')}>
            Panel - My List
          </button>
        </div>
        <div className="main">
          {this.state.view === 'trending'
            ? <Overview handleClick={this.props.handleClick} />
            : <MyFinances />}
        </div>
      </div>
    );
  }
}

Panel.propTypes = propTypes;
Panel.defaultProps = defaultProps;

export default Panel;
