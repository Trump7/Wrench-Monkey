const express = require('express');
const router = express.Router();
const Job = require('../models/Job');
const Tool = require('../models/Tool');

// Get all jobs
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find().populate('tools');
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new job
router.post('/', async (req, res) => {
  const job = new Job({
    name: req.body.name,
    tools: req.body.tools
  });

  try {
    const newJob = await job.save();
    res.status(201).json(newJob);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Remove a job
router.delete('/:id', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });

    await job.remove();
    res.json({ message: 'Job removed' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Edit a job
router.put('/:id', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });

    job.name = req.body.name || job.name;
    job.tools = req.body.tools || job.tools;
    const updatedJob = await job.save();
    res.json(updatedJob);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Checkout a job
router.post('/checkout', async (req, res) => {
  try {
    const job = await Job.findById(req.body.jobId).populate('tools');
    if (!job) return res.status(404).json({ message: 'Job not found' });

    const toolsToCheckout = job.tools;
    for (const tool of toolsToCheckout) {
      if (tool.status !== '0') {
        return res.status(400).json({ message: 'One or more tools are not available for checkout' });
      }
    }

    res.json(job);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
