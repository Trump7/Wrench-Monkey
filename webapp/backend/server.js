const express = require('express');
const config = require('./config');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const toolRoutes = require('./routes/tools');
const userRoutes = require('./routes/users');
const statusRoutes = require('./routes/status');
const historyRoutes = require('./routes/history');
const { addClient, removeClient, broadcastEvent } = require('./sse');
const { setupWebSocketServer } = require('./websocket'); // Import the WebSocket setup function
require('dotenv').config();

const Tool = require('./models/Tool');
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

app.get('/api/stream', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  addClient(res);

  req.on('close', () => {
    removeClient(res);
  });
});

const server = app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));

// Setup WebSocket server
setupWebSocketServer(server);

const initializeStatus = async () => {
  try {
    const status = await Status.findOne();
    if (status) {
      broadcastEvent(status, 'status');
    } else {
      console.log('No initial status found in the database.');
    }
  } catch (error) {
    console.error('Error initializing status:', error);
  }
};

const initializeTools = async () => {
  try {
    const tools = await Tool.find();
    if (tools) {
      broadcastEvent(tools, 'tools');
    } else {
      console.log('No initial tools found in the database.');
    }
  } catch (error) {
    console.error('Error initializing tools:', error);
  }
};

// Call the function to initialize status and tools
initializeStatus();
initializeTools();
