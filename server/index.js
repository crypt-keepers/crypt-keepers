const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

app.use(morgan('dev'));
app.use(express.static(__dirname + '/../public'));
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;

const server = app.listen(port, function() {
  console.log(`App listening at ${port}`);
});
