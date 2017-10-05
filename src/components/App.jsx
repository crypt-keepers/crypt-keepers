import React from 'react';
import Modal from 'react-modal';
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

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: true,
      username: '',
      activeCoin: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePanelClick = this.handlePanelClick.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  handleChange(e) {
    this.setState({ username: e.target.value });
  }

  handleSubmit(e, coin, amount) {
    e.preventDefault();
    this.closeModal();
    
    // TODO: Make API call with username to either create new username
    // or get existing username's list.
    console.log('handleSubmit', e, coin, amount);
  }

  handlePanelClick(coin) {
    // TODO: Pass coin down to data display so new graph can be rendered
    if (this.state.activeCoin !== coin) {
      this.setState({ activeCoin: coin });
    }
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  render() {
    return (
      <div className="component-container">
        <Modal
          isOpen={this.state.modalIsOpen}
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
                value={this.state.username}
                onChange={this.handleChange}
              />
            </label>
            <input type="submit" value="Submit" />
          </form>
        </Modal>
        <div className="data-container">
          <DataDisplay activeCoin={this.state.activeCoin} />
          <Panel handleClick={this.handlePanelClick} handleSubmit={this.handleSubmit} />
        </div>
        <News activeCoin={this.state.activeCoin} />
      </div>
    );
  }
}
