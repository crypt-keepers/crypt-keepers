import React from 'react';
import Search from './Search';
import DataDisplay from './DataDisplay';
import Panel from './Panel';
import News from './News';
// import Model from '../model-view';
import dummyData from '../data.json';
// import helpers from '../helpers/api-helpers';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: dummyData,
      curCoin: '',
      list: [],
    };
  }

  render() {
    return (
      <div>
        <Search />
        <DataDisplay data={this.state.data} />
        <Panel />
        <News coin={this.state.curCoin} list={this.state.list} />
      </div>
    );
  }
}
