const mongoose = require('mongoose');

const toolSchema = new mongoose.Schema({
    name: { type: String, required: true },
    status: { type: String, default: 0 },
    rfid: { type: String, default: 0 },
    slot: { type: String, required: true }
}, { collection: 'Tools' });

module.exports = mongoose.model('Tool', toolSchema);