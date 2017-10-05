const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/cryptonium';

mongoose.connect(MONGODB_URI);
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  position: {
    BTC: { type: Number, default: 0 },
    ETH: { type: Number, default: 0 },
    LTC: { type: Number, default: 0 },
  },
});
const User = mongoose.model('User', userSchema);


// add coin to watchlist
const updatePosition = (user, coin, quantity) => {
  let p = `position.${user}`;
  return User.collection.findOneAndUpdate(
    { username: user },
    { $inc: { p: quantity } },
    { upsert: true, returnNewDocument: true }
  );
};

const findUser = (user) => {
  // wants position
}

module.exports.User = User;
module.exports.updateWatchList = updatePosition;
