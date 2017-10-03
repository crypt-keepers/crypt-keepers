import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  onSearch: PropTypes.func,
};

const defaultProps = {
  onSearch: e => (e),
};

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownActive: false,
    };

    this.toggleMenu = this.toggleMenu.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  toggleMenu() {
    const newState = !this.state.dropdownActive;
    this.setState({ dropdownActive: newState });
  }

  handleClick(e) {
    this.props.onSearch(e.target.textContent);
  }

  render() {
    return (
      <div>
        <button onClick={this.toggleMenu}>Select Coin</button>
        <div className={this.state.dropdownActive ? 'menu-show' : 'menu-hide'}>
          <ul>
            <li role="menuitem" onClick={this.handleClick}>Bitcoin </li>
            <li role="menuitem" onClick={this.handleClick}>Litecoin </li>
            <li role="menuitem" onClick={this.handleClick}>Etherium </li>
          </ul>
        </div>
      </div>
    );
  }
}

Search.propTypes = propTypes;
Search.defaultProps = defaultProps;

export default Search;
