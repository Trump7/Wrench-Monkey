const express = require('express');
const Status = require('../models/Status');
const Tool = require('../models/Tool');
const User = require('../models/User');
const router = express.Router();
const { broadcastEvent } = require('../sse');
const { sendCommandToRobot } = require('../websocket');


// Helper function to broadcast the updated status
const updateAndBroadcast = async (update) => {
  const status = await Status.findOneAndUpdate({}, update, { new: true, upsert: true });
  broadcastEvent(status, 'status');
  return status;
};

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
      lastChecked: new Date().toISOString(),
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

    // Save the updated status back to the database
    await Status.findByIdAndUpdate(status._id, { lastChecked: combinedStatus.lastChecked });

    res.status(200).json(combinedStatus);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update Connection Status
router.post('/updateConnection', async (req, res) => {
  try {
    const { isConnected } = req.body;
    const status = await updateAndBroadcast({ isConnected });
    res.status(200).json(status);
  } catch (err) {
    console.error('Error updating connection status:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update Current Station and Travel Status for robot
router.post('/updateStation', async (req, res) => {
  try {
    const { currentStation, isTraveling, destinationStation } = req.body;
    const status = await updateAndBroadcast({
      currentStation,
      isTraveling,
      destinationStation
    });

    sendCommandToRobot({type: 'robotTravel', stationID: status.destinationStation });

    res.status(200).json(status);
  } catch (err) {
    console.error('Error updating station:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update robot status after travel
router.post('/updateFinalStation', async (req, res) => {
  try {
    const { currentStation, isTraveling, destinationStation } = req.body;
    const status = await updateAndBroadcast({
      currentStation,
      isTraveling,
      destinationStation
    });
    res.status(200).json(status);
  } catch (err) {
    console.error('Error updating station:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Emergency Stop
router.post('/updateTraveling', async (req, res) => {
  try {
    const status = await updateAndBroadcast({
      isTraveling: false,
      destinationStation: null,
      currentStation: 'Unknown',
    });

    sendCommandToRobot({type: 'stopTravel'});

    res.status(200).json(status);
  } catch (err) {
    console.error('Error updating traveling status:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update Tool Status
router.post('/updateToolStatus', async (req, res) => {
  try {
    const { toolSlot, toolStatus } = req.body;
    const status = await Status.findOne();
    if (!status) {
      return res.status(404).json({ message: 'Status not found' });
    }

    const toolIndex = status.toolsStatus.findIndex(tool => tool.toolSlot === toolSlot);
    if (toolIndex === -1) {
      return res.status(404).json({ message: 'Tool slot not found' });
    }

    status.toolsStatus[toolIndex] = { ...status.toolsStatus[toolIndex], ...toolStatus };
    await status.save();

    broadcastEvent(status, 'status');
    res.status(200).json(status);
  } catch (err) {
    console.error('Error updating tool status:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Check Traveling Status
router.get('/travelingStatus', async (req, res) => {
  try {
    const status = await Status.findOne();
    if (!status) {
      return res.status(404).json({ message: 'Status not found' });
    }

    const travelingStatus = {
      isTraveling: status.isTraveling
    };

    res.status(200).json(travelingStatus);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});


module.exports = router;
