const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const toolRoutes = require('./routes/tools');
const userRoutes = require('./routes/users');
const statusRoutes = require('./routes/status');
const historyRoutes = require('./routes/history');
const { addClient, removeClient, broadcastStatus } = require('./sse');
require('dotenv').config();

const Status = require('./models/Status');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: '2024',
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/tools', toolRoutes);
app.use('/api/history', historyRoutes);
app.use('/api/status', statusRoutes);

app.get('/api/status/stream', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders(); // Flush the headers to establish SSE connection

  addClient(res); // Add this client to the clients array

  req.on('close', () => {
    removeClient(res);
  });
});

const server = app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));

// Initial fetch of the status from the database
const initializeStatus = async () => {
  try {
    const status = await Status.findOne();
    if (status) {
      broadcastStatus(status); // Use broadcastStatus from the imported file
    } else {
      console.log('No initial status found in the database.');
    }
  } catch (error) {
    console.error('Error initializing status:', error);
  }
};

// Call the function to initialize status
initializeStatus();
