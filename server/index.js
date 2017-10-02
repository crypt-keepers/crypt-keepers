const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

app.use(morgan('dev'));
app.use(express.static(__dirname + '/../public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', () => {
  // All 3 daily coin data
  // Trending news in date order
  // req.body: {username: <string>}
  // If username exists, only send back watchlist coin data
  // if watch list is empty, send back all 3.
});

app.get('/range', () => {
  // get time series data which will be passed in
  // req.body: { coin: <coin id>, dateStart: <milliseconds>, dateEnd: <milliseconds>}
  // Send back coin data with NO metadata
});

app.get('/search', () => {
  // get news for specific coin
  // req.body: {coin: <coin id>}
  // Send back news in date order
});

app.post('/list', () => {
  // Add coin to user's watchlist in DB
  // req.body: {username: <string>, coin: <coin id> }
});

app.get('/list', () => {
  // Retrieve news stories for only coins on user's list
  // req.body: { username: <string> }
  // Send back news in date order
});




const port = process.env.PORT || 3000;

const server = app.listen(port, function() {
  console.log(`App listening at ${port}`);
});
