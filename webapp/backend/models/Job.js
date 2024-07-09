const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  name: { type: String, required: true },
  tools: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tool', required: true }]
}, { collection: 'Jobs' });

module.exports = mongoose.model('Job', jobSchema);