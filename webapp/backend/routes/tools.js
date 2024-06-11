const express = require('express');
const Tool = require('../models/Tool');

const router = express.Router();

// Create a new tool
router.post('/', async (req, res) => {
    const { name, status, rfid, slot } = req.body;
    try {
        const newTool = new Tool({ name, status, rfid, slot });
        const savedTool = await newTool.save();
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
        res.status(200).json({ message: 'Tool deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
