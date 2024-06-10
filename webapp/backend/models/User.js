const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  pass: { type: String, required: true },
}, { collection: 'Users' });

module.exports = mongoose.model('User', userSchema);
