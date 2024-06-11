const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const toolRoutes = require('./routes/tools');
const historyRoutes = require('./routes/history');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: '2024',
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.use('/api/auth', authRoutes);
app.use('/api/tools', toolRoutes);
app.use('/api/history', historyRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));