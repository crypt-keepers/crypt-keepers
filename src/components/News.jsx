import React from 'react';
import uniqBy from 'lodash/uniqBy';
import PropTypes from 'prop-types';
import newsData from '../news-data';
import NewsItem from './NewsItem';
import helpers from '../helpers/api-helpers';

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
      trending: [],
      bitcoin: [],
      litecoin: [],
      etherium: [],
    };

    this.setTrendingData = this.setTrendingData.bind(this);
    this.setMyData = this.setMyData.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.refreshNews = this.refreshNews.bind(this);

    setInterval(() => {
      this.refreshNews();
    }, (60000 * 3));
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
      const promiseArr = [];
      coinArr.forEach((coin) => {
        if (this.state[coin].length) {
          dataArr = dataArr.concat(this.state[coin]);
        } else {
          const promise = helpers.getCoinData(coin)
            .then((data) => {
              this.setState({ [coin]: data.results });
              dataArr = dataArr.concat(data.results);
            });
          promiseArr.push(promise);
        }
      });
      if (promiseArr.length) {
        Promise.all(promiseArr)
          .then(() => {
            dataArr = parseData(dataArr);
            this.setState({ curData: dataArr });
          });
      } else {
        dataArr = parseData(dataArr);
        this.setState({ curData: dataArr });
      }
    } else {
      helpers.getTrendingNews()
        .then((data) => {
          this.setState({ trending: data.results, curData: data.results });
        });
    }
  }

  setMyData(coinArr) {
    let arr = [];
    coinArr.forEach((coin) => {
      arr = arr.concat(this.state[coin]);
    });
    arr = parseData(arr);
    this.setState({ curData: arr, trendingSelected: false });
  }

  refreshNews() {
    const newsArr = ['trending', 'bitcoin', 'litecoin', 'etherium'];
    const promiseArr = [];
    newsArr.forEach((el) => {
      if (this.state[el].length) {
        if (el === 'trending') {
          const promise = helpers.getTrendingNews()
            .then((data) => {
              this.setState({ trending: data.results });
            });
          promiseArr.push(promise);
        } else {
          const promise = helpers.getCoinData(el)
            .then((data) => {
              this.setState({ [el]: data.results });
            });
          promiseArr.push(promise);
        }
      }
    });

    Promise.all(promiseArr)
      .then(() => {
        if (this.state.trendingSelected) {
          this.setState({ curData: this.state.trending });
        } else {
          this.setMyData(this.props.list);
        }
      });
  }

  handleClick(isTrending) {
    if (isTrending && !this.state.trendingSelected) {
      this.setState({ curData: this.state.trending, trendingSelected: true });
    }
    if (!isTrending && this.state.trendingSelected) {
      this.setMyData(this.props.list);
    }
  }

  render() {
    return (
      <div>
        <div className="top-button-bar">
          <button onClick={() => { this.handleClick(true); }} >Trending</button>
          <button onClick={() => { this.handleClick(false); }} >My News</button>
        </div>
        <div className="news-container">
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
