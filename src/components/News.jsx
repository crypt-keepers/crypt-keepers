import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { newsFetchTrending, changeNewsSelection } from '../actions/actions';
import NewsItem from './NewsItem';
import helpers from '../helpers/api-helpers';

const propTypes = {
  activeCoin: PropTypes.string.isRequired,
  fetchTrending: PropTypes.func.isRequired,
};

const defaultProps = {
  activeCoin: 'Bitcoin',
  fetchTrending: e => (e),
};

const parseData = arr => (
  arr.sort((a, b) => {
    const dateA = new Date(a.created_at);
    const dateB = new Date(b.created_at);
    if (dateA - dateB > 0) {
      return -1;
    }
    if (dateA - dateB < 0) {
      return 1;
    }
    return 0;
  })
);


class News extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Bitcoin: [],
      Litecoin: [],
      Ethereum: [],
    };

    this.setTrendingData = this.setTrendingData.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.refreshNews = this.refreshNews.bind(this);

    setInterval(() => {
      this.refreshNews();
    }, (60000 * 3));
  }

  componentDidMount() {
    this.setTrendingData('Bitcoin', true);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.activeCoin !== nextProps.activeCoin) {
      this.setTrendingData(nextProps.activeCoin, false);
    }
  }

  setTrendingData(newCoin, fetchTrending) {
    if (fetchTrending) {
      this.props.fetchTrending();
    }
    if (!this.state[newCoin].length) {
      helpers.getCoinData(newCoin)
        .then((data) => {
          this.setState({ [newCoin]: parseData(data.results) });
        })
        .catch(err => (err));
    }

    if (this.props.curSelection !== 'trending') {
      this.props.changeSelection(newCoin);
    }
  }

  refreshNews() {
    //FIXME
    const newsArr = ['trending', 'Bitcoin', 'Litecoin', 'Ethereum'];
    newsArr.forEach((el) => {
      if (this.state[el].length) {
        if (el === 'trending') {
          this.props.fetchTrending();
        } else {
          helpers.getCoinData(el)
            .then((data) => {
              this.setState({ [el]: parseData(data.results) });
            })
            .catch(err => (err));
        }
      }
    });
  }

  handleClick(isTrending) {
    if (isTrending && !this.props.curSelection !== 'trending') {
      this.props.changeSelection('trending');
    }
    if (!isTrending && this.props.curSelection === 'trending') {
      const newCoin = this.props.activeCoin ? this.props.activeCoin : 'Bitcoin';
      this.props.changeSelection(newCoin);
    }
  }

  render() {
    // const curArr = this.state[this.state.curSelection];
    const curArr = this.props.trending;
    const trendClass = this.props.curSelection === 'trending' ? 'select' : 'unselect';
    const newsClass = this.props.curSelection === 'trending' ? 'unselect' : 'select';
    console.log('cur selected', this.props.curSelection);

    return (
      <div className="news-panel">
        <div className="top-button-bar">
          <button className={trendClass} onClick={() => { this.handleClick(true); }} >
            <img src="trending.png" alt="Trending" />
          </button>
          <button className={newsClass} onClick={() => { this.handleClick(false); }} >
            <img src="newspaper.ico" alt="News for Coin" />
          </button>
        </div>
        <div className="news-container">
          {curArr.map(article => (
            <NewsItem key={article.id} article={article} />
          ))}
        </div>
      </div>
    );
  }
}

News.propTypes = propTypes;
News.defaultProps = defaultProps;

const mapStateToProps = (state = {}) => (
  {
    trending: state.newsTrending,
    curSelection: state.newsSelect,
  }
);

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    fetchTrending: newsFetchTrending,
    changeSelection: changeNewsSelection,
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(News);
