import express from 'express';
import mongoose from 'mongoose';
import apiRoute from './routes/api.js';
import { DB_CONNECT } from './utils/constant.js';

const app = express();

const connectDB = async () => {
  try {
    await mongoose.connect(DB_CONNECT, {
      bufferCommands: false,
    });
    console.log('✅ MongoDB Connected');
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error);
    process.exit(1); // Stop the server if the DB connection fails
  }
};

connectDB();

// routes
const PORT = 8000;

//middlewares
app.use(express.json());

app.use('/api/', apiRoute);

app.listen(PORT, () => console.log('server is running'));
