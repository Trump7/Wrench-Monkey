const express = require('express');
const History = require('../models/History');
const { broadcastEvent } = require('../sse');

const router = express.Router();

// Create a new history entry
router.post('/', async (req, res) => {
    const { toolId, userId, checkOut, checkIn } = req.body;
    try {
        const newHistory = new History({ toolId, userId, checkOut, checkIn });
        const savedHistory = await newHistory.save();

        const histories = await History.find();
        broadcastEvent(histories, 'history');

        res.status(201).json(savedHistory);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get all history entries
router.get('/', async (req, res) => {
    try {
        const history = await History.find().populate('toolId userId');
        res.status(200).json(history);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a single history entry by ID
router.get('/:id', async (req, res) => {
    try {
        const history = await History.findById(req.params.id).populate('toolId userId');
        if (!history) return res.status(404).json({ message: 'History entry not found' });
        res.status(200).json(history);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update a history entry by ID
router.put('/:id', async (req, res) => {
    const { toolId, userId, checkOut, checkIn } = req.body;
    try {
        const updatedHistory = await History.findByIdAndUpdate(
            req.params.id,
            { toolId, userId, checkOut, checkIn },
            { new: true }
        );
        if (!updatedHistory) return res.status(404).json({ message: 'History entry not found' });
        
        const histories = await History.find();
        broadcastEvent(histories, 'history');

        res.status(200).json(updatedHistory);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a history entry by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedHistory = await History.findByIdAndDelete(req.params.id);
        if (!deletedHistory) return res.status(404).json({ message: 'History entry not found' });
        
        const histories = await History.find();
        broadcastEvent(histories, 'history');
        
        res.status(200).json({ message: 'History entry deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
