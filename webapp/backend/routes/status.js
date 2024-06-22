const express = require('express');
const Status = require('../models/Status');
const Tool = require('../models/Tool');
const User = require('../models/User');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const status = await Status.findOne();
    if (!status) {
      return res.status(404).json({ message: 'Status not found' });
    }

    const toolIds = status.toolsStatus.map(tool => tool.toolId);
    const [tools, users] = await Promise.all([
      Tool.find({ _id: { $in: toolIds } }),
      User.find({ _id: { $in: toolIds } })
    ]);

    const toolsMap = tools.reduce((map, tool) => {
      map[tool._id] = tool;
      return map;
    }, {});

    const usersMap = users.reduce((map, user) => {
      map[user._id] = user;
      return map;
    }, {});

    const combinedStatus = {
      _id: status._id,
      isConnected: status.isConnected,
      lastChecked: status.lastChecked,
      currentStation: status.currentStation,
      isTraveling: status.isTraveling,
      destinationStation: status.destinationStation,
      toolsStatus: status.toolsStatus.map(toolStatus => ({
        toolSlot: toolStatus.toolSlot,
        toolId: toolStatus.toolId,
        isCheckedOut: toolStatus.isCheckedOut,
        checkedOutBy: toolStatus.checkedOutBy,
        lastCheckedOut: toolStatus.lastCheckedOut,
        isLedLit: toolStatus.isLedLit,
        toolDetails: toolsMap[toolStatus.toolId],
        userDetails: toolStatus.checkedOutBy ? usersMap[toolStatus.checkedOutBy] : null
      }))
    };

    res.status(200).json(combinedStatus);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
