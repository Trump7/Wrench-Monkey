const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
    toolId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tool', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    checkOut: { type: Date, required: true },
    checkIn: { type: Date }
}, { collection: 'History' });

module.exports = mongoose.model('History', historySchema);