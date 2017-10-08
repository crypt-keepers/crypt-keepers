import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import changePanelSelection from '../actions/panelActions';
import Overview from './Overview';
import MyFinances from './MyFinances';

const propTypes = {
  handleClick: PropTypes.func,
  username: PropTypes.string.isRequired,
  view: PropTypes.string.isRequired,
  changeView: PropTypes.func.isRequired,
};

const defaultProps = {
  handleClick: () => {},
  username: '',
  view: 'overview',
  changeView: e => (e),
};

class Panel extends React.Component {
  changePanel(view) {
    this.props.changeView(view);
  }

  render() {
    const overviewClass = this.props.view === 'overview' ? 'panel-show' : 'panel-hide';
    const myFinancesClass = this.props.view === 'overview' ? 'panel-hide' : 'panel-show';
    const overviewButton = this.props.view === 'overview' ? 'select' : 'unselect';
    const financeButton = this.props.view === 'overview' ? 'unselect' : 'select';
    return (
      <div className="panel-container">
        <div className="panel-nav">
          <button className={overviewButton} onClick={() => this.changePanel('overview')}>
            Coin Overview
          </button>
          <button className={financeButton} onClick={() => this.changePanel('finances')}>
            My Finances
          </button>
        </div>
        <div className="main">
          {/* <Overview className={overviewClass} handleClick={this.props.handleClick} /> */}
          <Overview className={overviewClass} />
          <MyFinances
            className={myFinancesClass}
            username={this.props.username}
            handleClick={this.props.handleClick}
          />
        </div>
      </div>
    );
  }
}

Panel.propTypes = propTypes;
Panel.defaultProps = defaultProps;

const mapStateToProps = (state = {}) => (
  {
    view: state.panelSelect,
  }
);

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    changeView: changePanelSelection,
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Panel);
