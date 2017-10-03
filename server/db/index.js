const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/cryptonium');
const Schema = mongoose.Schema;

// Schema def, just a placeholder for now
const userSchema = new Schema({
  username: String,
});
const User = mongoose.model('User', userSchema);

module.exports = User;
