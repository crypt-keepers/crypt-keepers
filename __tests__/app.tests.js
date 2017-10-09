import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { expect } from 'chai';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import App from '../src/components/App';
import News from '../src/components/News';
import NewsItem from '../src/components/NewsItem';
import Overview from '../src/components/Overview';
import DataDisplay from '../src/components/DataDisplay';
import * as appActions from '../src/actions/appActions';
import * as myFinanceActions from '../src/actions/myFinanceActions';
import * as newsActions from '../src/actions/newsActions';
import * as overviewActions from '../src/actions/overviewActions';
import changePanelSelection from '../src/actions/panelActions';
import * as reducers from '../src/reducers/reducer';


const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

configure({ adapter: new Adapter() });

describe('App actions', () => {
  it('should create an action to change username', () => {
    const username = 'Inigo Montoya'
    const expectedAction = {
      type: 'CHANGE_USERNAME',
      payload: {
        username,
      },
    };
    expect(appActions.changeUsername(username)).to.deep.equal(expectedAction);
  });

  it('should create an action to change coin', () => {
    const coin = 'Bitcoin'
    const expectedAction = {
      type: 'CHANGE_COIN',
      payload: {
        coin,
      },
    };
    expect(appActions.changeCoin(coin)).to.deep.equal(expectedAction);
  });
});

describe('News actions', () => {
  it('should create an action to change selected news', () => {
    const selection = 'Bitcoin'
    const expectedAction = {
      type: 'CHANGE_NEWS_SELECTION',
      payload: { selection },
    };
    expect(newsActions.changeNewsSelection(selection)).to.deep.equal(expectedAction);
  });
});

describe('Panel actions', () => {
  it('should create an action to change selected panel', () => {
    const selection = 'overview'
    const expectedAction = {
      type: 'CHANGE_PANEL_SELECTION',
      payload: { selection },
    };
    expect(changePanelSelection(selection)).to.deep.equal(expectedAction);
  });
});

describe('Reducer', () => {
  it('should return the initial state', () => {
    expect(reducers.coin(undefined, {})).to.equal('Bitcoin');
    expect(reducers.username(undefined, {})).to.equal('');
    expect(reducers.newsTrending(undefined, {})).to.deep.equal([]);
    expect(reducers.newsSelect(undefined, {})).to.equal('trending');
    expect(reducers.newsCoin(undefined, {})).to.deep.equal({});
    expect(reducers.panelSelect(undefined, {})).to.equal('overview');
    expect(reducers.tickerData(undefined, {})).to.deep.equal({});
    expect(reducers.userData(undefined, {})).to.deep.equal({});
  });

  it('should handle CHANGE_COIN', () => {
    expect(reducers.coin('', {
      type: 'CHANGE_COIN',
      payload: { coin: 'Litecoin' },
    })).to.equal('Litecoin');
  });

  it('should handle CHANGE_USERNAME', () => {
    expect(reducers.username('', {
      type: 'CHANGE_USERNAME',
      payload: { username: 'Spiderman' },
    })).to.equal('Spiderman');
  });

  it('should handle NEWS_TRENDING_FETCH_DATA_SUCCESS', () => {
    expect(reducers.newsTrending([], {
      type: 'NEWS_TRENDING_FETCH_DATA_SUCCESS',
      news: [{title: 'testtitle', url:'www.hi.com'}],
    })).to.deep.equal([{ title: 'testtitle', url: 'www.hi.com' }]);
  });

  it('should handle CHANGE_NEWS_SELECTION', () => {
    expect(reducers.newsSelect('trending', {
      type: 'CHANGE_NEWS_SELECTION',
      payload: { selection: 'Bitcoin' },
    })).to.equal('Bitcoin');
  });

  it('should handle NEWS_COIN_FETCH_DATA_SUCCESS', () => {
    expect(reducers.newsCoin({}, {
      type: 'NEWS_COIN_FETCH_DATA_SUCCESS',
      payload: { coin: 'Bitcoin', news: [{ title: 'bitcoin news' }] },
    })).to.deep.equal({ Bitcoin: [{ title: 'bitcoin news' }] });

    expect(reducers.newsCoin({ Bitcoin: [{ title: 'bitcoin news' }] }, {
      type: 'NEWS_COIN_FETCH_DATA_SUCCESS',
      payload: { coin: 'Litecoin', news: [{ title: 'litecoin news' }] },
    })).to.deep.equal({ Bitcoin: [{ title: 'bitcoin news' }], Litecoin: [{ title: 'litecoin news' }] });
  });

  it('should handle CHANGE_PANEL_SELECTION', () => {
    expect(reducers.panelSelect('overview', {
      type: 'CHANGE_PANEL_SELECTION',
      payload: { selection: 'finances' },
    })).to.equal('finances');
  });

  it('should handle TICKER_FETCH_DATA_SUCCESS', () => {
    expect(reducers.tickerData({}, {
      type: 'TICKER_FETCH_DATA_SUCCESS',
      tickerData: [{ coin: 'LTC', data: { price: 1 } }],
    })).to.deep.equal({ LTC: { price: 1 } });

    expect(reducers.tickerData({ LTC: { price: 1 } }, {
      type: 'TICKER_FETCH_DATA_SUCCESS',
      tickerData: [{ coin: 'BTC', data: { price: 5 } }],
    })).to.deep.equal({ LTC: { price: 1 }, BTC: { price: 5 } });
  });

  it('should handle USER_DB_GET_SUCCESS', () => {
    expect(reducers.userData({}, {
      type: 'USER_DB_GET_SUCCESS',
      userData: { username: 'bob', position: {} },
    })).to.deep.equal({ username: 'bob', position: {} });
  });
});



// describe('todos reducer', () => {
//
//   it('should handle ADD_TODO', () => {
//     expect(
//       reducer([], {
//         type: types.ADD_TODO,
//         text: 'Run the tests'
//       })
//     ).toEqual([
//       {
//         text: 'Run the tests',
//         completed: false,
//         id: 0
//       }
//     ])
//
//     expect(
//       reducer(
//         [
//           {
//             text: 'Use Redux',
//             completed: false,
//             id: 0
//           }
//         ],
//         {
//           type: types.ADD_TODO,
//           text: 'Run the tests'
//         }
//       )
//     ).toEqual([
//       {
//         text: 'Run the tests',
//         completed: false,
//         id: 1
//       },
//       {
//         text: 'Use Redux',
//         completed: false,
//         id: 0
//       }
//     ])
//   })
// })




// describe('<App/>', () => {
//   it('should have a modal on popup', () => {
//     const wrapper = shallow(<App />);
//     expect(wrapper.find('Modal')).to.have.length(1);
//   });
// });
//
// describe('<News/>', () => {
//   it('should have a News buttons', () => {
//     const wrapper = shallow(<News />);
//     expect(wrapper.find('button')).to.have.length(2);
//   });
//
//   it('should render the right number of trending NewsItems', () => {
//     const wrapper = shallow(<News />);
//     const state = wrapper.state();
//     const data = state.trending;
//     expect(wrapper.find('NewsItem')).to.have.length(data.length);
//   });
// });
//
// describe('<NewsItem/>', () => {
//   it('should have a link to article', () => {
//     const wrapper = shallow(<NewsItem />);
//     expect(wrapper.find('a')).to.have.length(1);
//   });
// });
//
// describe('<Overview/>', () => {
//   it('should render a table', () => {
//     const wrapper = shallow(<Overview />);
//     expect(wrapper.find('table')).to.have.length(1);
//   });
//   it('should render data from all three coins', () => {
//     const wrapper = shallow(<Overview />);
//     expect(wrapper.find('TableRow')).to.have.length(3);
//   });
// });
