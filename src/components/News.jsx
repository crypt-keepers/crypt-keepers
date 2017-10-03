import React from 'react';
import PropTypes from 'prop-types';
import newsData from '../news-data';
import NewsItem from './NewsItem';

const propTypes = {
  coin: PropTypes.string,
  list: PropTypes.arrayOf(PropTypes.string),
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
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.setData(this.props.coin);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.coin !== nextProps.coin) {
      this.setData(nextProps.coin);
    }
  }

  setData(coin) {
    if (coin.length) {
      this.setState({ curData: newsData[coin] });
    } else {
      this.setState({ curData: newsData.trending });
    }
  }

  handleClick(isTrending) {
    if (isTrending && !this.state.trendingSelected) {
      this.setState({ curData: newsData.trending, trendingSelected: true });
    }
    if (!isTrending && this.state.trendingSelected) {
      let arr = [];
      this.props.list.forEach((coin) => {
        arr = arr.concat(newsData[coin]);
      });
      this.setState({ curData: arr, trendingSelected: false });
    }
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
