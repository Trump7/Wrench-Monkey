const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  pass: { type: String, required: true },
  admin: {type: Boolean, default: false},
}, { collection: 'Users' });

module.exports = mongoose.model('User', userSchema);
