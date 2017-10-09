# Cryptonium

Track Bitcoin, Litecoin, and Etherium performance and news.

## Team

  - Cecily Smith
  - Clara Cho
  - Claire Johnson
  - Nanda Saboo

## Table of Contents

1. [Usage](#Usage)
2. [Requirements](#requirements)
3. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    2. [Tasks](#tasks)
4. [Roadmap](#roadmap)
5. [Contributing](#contributing)

## Usage

  - Server Routes:
    - get /range: Retrieve time series candlestick data in response to query. Query parameters are coin ['BTC', 'LTC', 'ETH'], dateStart (in milliseconds), dateEnd(in milliseconds), granularity (in milliseconds).
    - get /ticker: Retrieve ticker data in response to query. Query parameter is coin ['BTC', 'LTC', 'ETH'].
    - get /search: Retrieve new for a coin in response to query. Query parameter is currency.
    - get /user: Retrieve user portfolio in response to query. Query parameter is username. If username is not found, one will be created and returned.
    - post /user: Update a user's position. Request body is username, coin, position.

  - Database:

  - D3: Data-Driven Documents (D3.js) library is implemented inside DataDisplay component and Panel-MyFinances component to graphically visualize cryptocurrency data as well as to provide graphical interface to the user. Inside DataDisplay component, D3 is used to dynamically render time series plot of the selected cryptocurrency (default is Bitcoin). User can interact with the time series plot by changing the time range of the data and re-rendering the plot as well as moving the mouse around to see the detailed cryptocurrency data at a particular time. User can also select a different cryptocurrency in the side panel to render that cryptocurrency's time series plot. Inside Panel-MyFinances subpanel, D3 is used to dynamically visualize user's current cryptocurrency holdings using a pie chart. Pie chart is dynamically updated when user adds positions to their wallet as well as when the total value of their wallet changes due to market changes.  User can interact with the pie chart by moving the mouse over to the pie chart, resulting in the transition animation of the interacting pie slice. When the user clicks on the pie slice of the cryptocurrency they are interested in, the time series plot inside DataDisplay component is dynamically changed to reflect the selection.

  - APIs:
    - Cryptopanic: https://cryptopanic.com/about/api/
      - Trending and coin news
    - GDAX: https://docs.gdax.com/
      - Market data

  - Redux: Most of the React components in this app are connected to Redux. Any Redux state or reducers can be accessed via a components props, assuming those state/functions have been included in the component's mapStateToProps and mapDispatchToProps functions. Certain components still have local state on them if that local state is unique to the component (i.e. graph data for Data Display).

  - Major Components:
    - App: Renders overall App (see Redux)
    - DataDisplay: Renders data graph(see D3)
    - Panel - Overview: Renders ticker data. Clicking on ticker data will render that coin data to the data display and to coin news.
    - Panel - MyFinances: Renders personal wallet (see D3)
    - News: Displays general cryptocurrency trending news and specific coin news. Coin news renders whenever a new coin is selected from the panel.

## Requirements

- Babel
- Chai ^4.1.2
- D3 ^4.11.0
- Express ^4.15.5
- Jest ^21.2.1
- Node 6.4.x
- MongoDB x.x.x
- Mongoose ^4.11.13
- React 16.0.x
- React Redux ^5.0.6
- Webpack 3.6.x
- Request-Promise x.x.x

Copy example.config.js in ./server folder and rename it to config.js. Include your Crytopanic API key here.

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install
```

### Roadmap

View the project roadmap [ROADMAP.md](ROADMAP.md)


## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
