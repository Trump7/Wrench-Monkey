const mongoose = require('mongoose');

const toolSchema = new mongoose.Schema({
    name: { type: String, required: true },
    status: { type: String, required: true },
    rfid: { type: String, required: true, unique: true },
    slot: { type: String, required: true }
}, { collection: 'Tools' });

module.exports = mongoose.model('Tool', toolSchema);