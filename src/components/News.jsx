import React from 'react';
import uniqBy from 'lodash/uniqBy';
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

const parseData = (arr) => {
  const result = uniqBy(arr, 'id');
  return result.sort((a, b) => {
    const dateA = new Date(a.created_at);
    const dateB = new Date(b.created_at);
    if (dateA - dateB > 0) {
      return -1;
    }
    if (dateA - dateB < 0) {
      return 1;
    }
    return 0;
  });
};


const checkListEquality = (arr1, arr2) => {
  if (JSON.stringify(arr1) === JSON.stringify(arr2)) {
    return true;
  }
  return false;
};

class News extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trendingSelected: true,
      curData: [],
    };

    this.setTrendingData = this.setTrendingData.bind(this);
    this.setMyData = this.setMyData.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.setTrendingData(this.props.coin);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.coin !== nextProps.coin && this.state.trendingSelected) {
      this.setTrendingData(nextProps.coin);
    }
    if (!checkListEquality(this.props.list, nextProps.list)) {
      this.setMyData(nextProps.list);
    }
  }

  setTrendingData(newCoin) {
    if (newCoin.length) {
      const coinArr = newCoin.split(' ');
      let dataArr = [];
      coinArr.forEach((coin) => {
        if (coin) {
          dataArr = dataArr.concat(newsData[coin]);
        }
      });
      dataArr = parseData(dataArr);
      this.setState({ curData: dataArr });
    } else {
      this.setState({ curData: newsData.trending });
    }
  }

  setMyData(coinArr) {
    let arr = [];
    coinArr.forEach((coin) => {
      arr = arr.concat(newsData[coin]);
    });
    arr = parseData(arr);
    this.setState({ curData: arr, trendingSelected: false });
  }

  handleClick(isTrending) {
    if (isTrending && !this.state.trendingSelected) {
      this.setState({ curData: newsData.trending, trendingSelected: true });
    }
    if (!isTrending && this.state.trendingSelected) {
      this.setMyData(this.props.list);
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
