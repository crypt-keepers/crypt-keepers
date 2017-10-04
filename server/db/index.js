const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/cryptonium';

mongoose.connect(MONGODB_URI);
const Schema = mongoose.Schema;

// Schema def, just a placeholder for now
const userSchema = new Schema({
  username: String,
});
const User = mongoose.model('User', userSchema);

module.exports = User;
