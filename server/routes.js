const router = require('express').Router();
const controller = require('./controllers');

// Connect controller methods to their corresponding routes


// app.get('/', () => {
//   // All 3 daily coin data
//   // Trending news in date order
//   // req.body: {username: <string>}
//   // If username exists, only send back watchlist coin data
//   // if watch list is empty, send back all 3.
// });

// app.get('/range', () => {
//   // get time series data which will be passed in
//   // req.body: { coin: <coin id>, dateStart: <milliseconds>, dateEnd: <milliseconds>}
//   // Send back coin data with NO metadata
// });
router.get('/range', controller.range.get);
router.post('/range', controller.range.post);

router.get('/ticker', controller.ticker.get);
router.post('/ticker', controller.ticker.post);


// app.get('/search', () => {
//   // get news for specific coin
//   // req.body: {coin: <coin id>}
//   // Send back news in date order
// });
router.get('/search', controller.search.get);
router.post('/search', controller.search.post);


// app.post('/list', () => {
//   // Add coin to user's watchlist in DB
//   // req.body: {username: <string>, coin: <coin id> }
// });

// app.get('/list', () => {
//   // Retrieve news stories for only coins on user's list
//   // req.body: { username: <string> }
//   // Send back news in date order
// });
router.get('/list', controller.list.get);
router.post('/list', controller.list.post);

router.get('/user', controller.user.get);
router.post('/user', controller.user.post);


module.exports = router;
