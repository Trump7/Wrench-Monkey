const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Register Route
router.post('/register', async (req, res) => {
    try {
      const { name, email, pass } = req.body;

      // Check if email already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
          return res.status(400).send('Email already in use');
      }

      const hashedPassword = await bcrypt.hash(pass, 10);
      const newUser = new User({ name, email, pass: hashedPassword });
      await newUser.save();
      res.status(201).send('User registered');
    } catch (err) {
      res.status(500).send('Error registering user');
    }
  });
  

// Login Route
router.post('/login', async (req, res) => {
  try {
    const { email, pass } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send('User not found');

    const isMatch = await bcrypt.compare(pass, user.pass);
    if (!isMatch) return res.status(400).send('Invalid credentials');

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, userId: user._id });
  } catch (err) {
    res.status(500).send('Error logging in user');
  }
});

module.exports = router;
