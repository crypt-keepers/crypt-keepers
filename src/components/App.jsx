import React from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';
import DataDisplay from './DataDisplay';
import Panel from './Panel';
import News from './News';

const customStyles = {
  content: {
    width: '50%',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
};

const propTypes = {
  activeCoin: PropTypes.string,
  isModalOpen: PropTypes.bool,
  username: PropTypes.string,
  changeCoin: PropTypes.func,
  changeUsername: PropTypes.func,
  modalIsOpen: PropTypes.func,
};

const defaultProps = {
  activeCoin: 'Bitcoin',
  isModalOpen: true,
  username: '',
  changeCoin: e => (e),
  changeUsername: e => (e),
  modalIsOpen: e => (e),
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePanelClick = this.handlePanelClick.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  handleSubmit(e) {
    const node = document.getElementById('username-field');
    const value = node ? node.value : '';
    this.props.changeUsername(value);
    e.preventDefault();
    this.closeModal();
  }

  handlePanelClick(coin) {
    if (this.props.activeCoin !== coin) {
      this.props.changeCoin(coin);
    }
  }

  closeModal() {
    this.props.modalIsOpen(false);
  }

  render() {
    const { isModalOpen, activeCoin, username } = this.props;
    return (
      <div>
        <div className="nav-bar">
          <div className="logo">
            <div>Cryptonium</div>
            <img src="logo.png" alt="" />
          </div>
          <div className="greeting">
            <div>Hi {username}</div>
            <img src="avatar.png" alt="" />
          </div>
        </div>
        <div className="component-container">
          <Modal
            isOpen={isModalOpen}
            onRequestClose={this.closeModal}
            contentLabel="Example Modal"
            style={customStyles}
          >
            <form onSubmit={this.handleSubmit}>
              <label htmlFor="username">
                Enter your username:
                <input
                  type="text"
                  name="username"
                  id="username-field"
                />
              </label>
              <input type="submit" value="Submit" />
            </form>
          </Modal>
          <div className="data-container">
            <DataDisplay activeCoin={activeCoin} />
            <Panel
              handleClick={this.handlePanelClick}
              username={username}
            />
          </div>
          <News activeCoin={activeCoin} />
        </div>
      </div>
    );
  }
}

App.propTypes = propTypes;
App.defaultProps = defaultProps;

const mapStateToProps = (state = {}) => (
  {
    activeCoin: state.coin,
    isModalOpen: state.modalIsOpen,
    username: state.username,
  }
);

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    changeCoin: actions.changeCoin,
    modalIsOpen: actions.modalIsOpen,
    changeUsername: actions.changeUsername,
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(App);
