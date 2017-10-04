const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
<<<<<<< HEAD
const router = require('./routes');
const path = require('path');
const compression = require('compression');
=======
// const router = require('./routes');
const path = require('path');
const gdax = require('../helpers/gdax.js')
>>>>>>> (feat) Get time series by range

const app = express();
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '/../public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
<<<<<<< HEAD

app.use(compression());
app.use('/', router);
=======
// app.use('/', router);
>>>>>>> (feat) Get time series by range


app.get('/range', (req, res) => {
  let coin = req.body.coin;
  let dateStart = req.body.dateStart;
  let dateEnd = req.body.dateEnd;
  gdax.getTimeSeriesByRange(coin, dateStart, dateEnd)
    .then(series => res.json(series));
  res.sendStatus(200);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {});

module.exports = app;
