const express = require('express');
const Tool = require('../models/Tool');
const History = require('../models/History');
const { broadcastEvent } = require('../sse');
const { sendCommandToRobot } = require('../websocket');

const router = express.Router();

// Create a new tool
router.post('/', async (req, res) => {
    const { name, status, rfid, slot } = req.body;
    try {
        const newTool = new Tool({ name, status, rfid, slot });
        const savedTool = await newTool.save();
        
        const tools = await Tool.find();
        broadcastEvent(tools, 'tools');

        res.status(201).json(savedTool);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get all tools
router.get('/', async (req, res) => {
    try {
        const tools = await Tool.find();
        res.status(200).json(tools);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a single tool by ID
router.get('/:id', async (req, res) => {
    try {
        const tool = await Tool.findById(req.params.id);
        if (!tool) return res.status(404).json({ message: 'Tool not found' });
        res.status(200).json(tool);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update a tool by ID
router.put('/:id', async (req, res) => {
    const { name, status, rfid, slot } = req.body;
    try {
        const updatedTool = await Tool.findByIdAndUpdate(
            req.params.id,
            { name, status, rfid, slot },
            { new: true }
        );
        if (!updatedTool) return res.status(404).json({ message: 'Tool not found' });
        
        const tools = await Tool.find();
        broadcastEvent(tools, 'tools');

        res.status(200).json(updatedTool);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a tool by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedTool = await Tool.findByIdAndDelete(req.params.id);
        if (!deletedTool) return res.status(404).json({ message: 'Tool not found' });
        
        const tools = await Tool.find();
        broadcastEvent(tools, 'tools');
        
        res.status(200).json({ message: 'Tool deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.post('/checkout', async (req, res) => {
    try {
        const { toolId, userId, timestamp } = req.body;
        const tool = await Tool.findById(toolId);

        if (!tool) {
            return res.status(404).json({ message: 'Tool not found' });
        }

        if (tool.status !== '1') {
            return res.status(400).json({ message: 'Tool is not available for checkout' });
        }

        tool.status = '0';
        await tool.save();

        const history = new History({
            toolId,
            userId,
            checkOut: timestamp
        });
        await history.save();

        const tools = await Tool.find();
        const histories = await History.find().populate('toolId').populate('userId');

        broadcastEvent(tools, 'tools');
        console.log("\n");
        broadcastEvent(histories, 'history');

        //send command to robot
        sendCommandToRobot({type: 'toolRequested', toolNumber: tool.slot });

        res.status(200).json({ message: 'Tool checked out successfully' });
    } catch (error) {
        console.error('Error in checkout route:', error);
        res.status(500).json({ message: 'Error checking out tool' });
    }
});


router.post('/checkin', async (req, res) => {
    try {
        const { toolId, userId, timestamp } = req.body;
        const tool = await Tool.findById(toolId);

        if (!tool) {
            return res.status(404).json({ message: 'Tool not found' });
        }

        tool.status = '1';
        await tool.save();

        const history = await History.findOneAndUpdate(
            { toolId, userId, checkIn: null },
            { checkIn: timestamp },
            { new: true }
        );

        const tools = await Tool.find();
        const histories = await History.find().populate('toolId').populate('userId');

        broadcastEvent(tools, 'tools');
        broadcastEvent(histories, 'history');

        res.status(200).json({ message: 'Tool checked in successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error checking in tool' });
    }
});

module.exports = router;
