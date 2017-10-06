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



const updatePosition = (user, coin, quantity) => {
  if (coin === 'BTC') {
    return User.collection.findOneAndUpdate(
      { username: user },
      { $inc: { 'position.BTC': quantity } },
      { upsert: true, new: true }
    );
  } else if (coin === 'ETH') {
    return User.collection.findOneAndUpdate(
      { username: user },
      { $inc: { 'position.ETH': quantity } },
      { upsert: true, new: true }
    );
  } else if (coin === 'LTC') {
    return User.collection.findOneAndUpdate(
      { username: user },
      { $inc: { 'position.LTC': quantity } },
      { upsert: true, new: true }
    );
  }
};

const findUser = (user) => {
  return User.findOne({ username: user });
};


module.exports.User = User;
module.exports.updatePosition = updatePosition;
module.exports.findUser = findUser;
