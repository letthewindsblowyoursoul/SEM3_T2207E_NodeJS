const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user = new Schema({
  username: { type: String, required: true },
  fullname: { type: String, required: true },
  age: { type: Number, min: [1, 'Age cannot be negative'], required: true },
  address: { type: String, required: true },
});

module.exports = mongoose.model('User', user);
