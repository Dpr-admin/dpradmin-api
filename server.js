import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { UserRouter } from './routes/user.js';
import { ProjectRouter } from './routes/projects.js';
import { BuilderRouter } from './routes/builder.js';

import cors from 'cors';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// CORS configuration
const corsOptions = {
  origin: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use('/auth', UserRouter);
app.use('/auth', ProjectRouter);
app.use('/auth', BuilderRouter);

app.use('/uploads', express.static('uploads'));
app.use('/builderslogo', express.static('builderslogo'));


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
