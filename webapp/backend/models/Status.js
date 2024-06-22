const mongoose = require('mongoose');

const statusSchema = new mongoose.Schema({
  isConnected: {
    type: Boolean,
    required: true,
    default: false,
  },
  lastChecked: {
    type: Date,
    default: Date.now,
  },
  currentStation: {
    type: String,
    required: true,
  },
  isTraveling: {
    type: Boolean,
    default: false,
  },
  destinationStation: {
    type: String,
    default: null,
  },
  toolsStatus: [
    {
      toolSlot: {
        type: Number,
        required: true,
      },
      toolId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tool', // Reference to the Tool model
        required: true,
      },
      isCheckedOut: {
        type: Boolean,
        default: false,
      },
      checkedOutBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        default: null,
      },
      lastCheckedOut: {
        type: Date,
        default: null,
      },
      isLedLit: {
        type: Boolean,
        default: false,
      },
    },
  ],
}, { collection: 'Status' });

module.exports = mongoose.model('Status', statusSchema);