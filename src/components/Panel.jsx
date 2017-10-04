import React from 'react';
import PropTypes from 'prop-types';
import Trending from './Trending';
import MyList from './MyList';

const propTypes = {
  coin: PropTypes.string,
  list: PropTypes.arrayOf(PropTypes.string),
};

const defaultProps = {
  coin: '',
  list: [],
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
            Panel - Trending
          </button>
          <button onClick={() => this.changePanel('myList')}>
            Panel - My List
          </button>
        </div>
        <div className="main">
          {this.state.view === 'trending'
            ? <Trending />
            : <MyList list={this.props.list} handleClick={this.props.handleClick}/>}
        </div>
      </div>
    );
  }
}

Panel.propTypes = propTypes;
Panel.defaultProps = defaultProps;

export default Panel;
