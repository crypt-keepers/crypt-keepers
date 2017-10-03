import React from 'react';
import PropTypes from 'prop-types';
import newsData from '../news-data';
import NewsItem from './NewsItem';

const propTypes = {
  coin: PropTypes.string,
  list: PropTypes.array,
};

const defaultProps = {
  coin: '',
  list: [],
};

class News extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trendingSelected: true,
      curData: [],
    };

    this.setData = this.setData.bind(this);
  }

  componentDidMount() {
    this.setData();
  }

  setData() {
    if (this.props.coin.length) {
      this.setState({ curData: newsData[this.props.coin] });
    } else {
      this.setState({ curData: newsData.trending, test: true });
    }
  }

  handleClick() {
    console.log('clicked', this);
  }

  render() {
    return (
      <div>
        <div className="topButtonBar">
          <button onClick={() => { this.handleClick(true); }} >Trending</button>
          <button onClick={() => { this.handleClick(false); }} >My News</button>
        </div>
        <div className="news">
          {this.state.curData.map(article => (
            <NewsItem key={article.id} article={article} />
          ))}
        </div>
      </div>
    );
  }
}

News.propTypes = propTypes;
News.defaultProps = defaultProps;

export default News;
