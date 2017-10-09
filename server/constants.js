// eslint-disable-line global-require

let AUTH_TOKEN;
try {
  AUTH_TOKEN = require('./config');
} catch (ex) {
  AUTH_TOKEN = process.env.AUTH_TOKEN;
}

const CRYPTOPANIC_URI = 'https://cryptopanic.com/api/posts';

module.exports = {
  AUTH_TOKEN,
  CRYPTOPANIC_URI,
};
