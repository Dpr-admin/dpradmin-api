// import express from 'express';
// import dotenv from 'dotenv';
// import mongoose from 'mongoose';
// import cors from 'cors';
// import cookieParser from 'cookie-parser';
// import { MailerRouter } from './routes/mailer.js';
// import { UserRouter } from './routes/user.js';
// import { ProjectRouter } from './routes/projects.js';
// import { BuilderRouter } from './routes/builder.js';

// dotenv.config();

// const app = express();
// const port = process.env.PORT || 5000;

// // CORS configuration
// const corsOptions = {
//   origin: 'https://dpr-projects-routes.vercel.app',
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
//   credentials: true
// };

// // Connect to MongoDB
// mongoose.connect(process.env.MONGODB_URI)
//   .then(() => {
//     console.log('Connected to MongoDB');
//   })
//   .catch((error) => {
//     console.error('Error connecting to MongoDB:', error);
//   });

// // Middleware
// app.use(express.json());
// app.use(cors(corsOptions));
// app.use(cookieParser());

// // Routes
// app.use('/auth', UserRouter);
// app.use('/auth', ProjectRouter);
// app.use('/auth', BuilderRouter);
// app.use('/mailer', MailerRouter); 
// app.options('*', cors(corsOptions)); // Handle preflight requests
// // Serve static files
// app.use('/uploads', express.static('uploads'));
// app.use('/builderslogo', express.static('builderslogo'));

// // Error handling for undefined routes
// app.use((req, res, next) => {
//   const error = new Error('Not Found');
//   error.status = 404;
//   next(error);
// });

// app.use((error, req, res, next) => {
//   res.status(error.status || 500);
//   res.json({ message: error.message });
// });

// // Start server
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { MailerRouter } from './routes/mailer.js';
import { UserRouter } from './routes/user.js';
import { ProjectRouter } from './routes/projects.js';
import { BuilderRouter } from './routes/builder.js';

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

// Middleware
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

// Test route to check if the server is working
app.get('/some', (req, res) => {
  res.send('API is working!');
});

// Routes
app.use('/auth', UserRouter);
app.use('/auth', ProjectRouter);
app.use('/auth', BuilderRouter);
app.use('/mailer', MailerRouter); 
app.options('*', cors(corsOptions)); // Handle preflight requests

// Serve static files

app.use('/uploads', express.static('uploads'));
app.use('/builderslogo', express.static('builderslogo'));

// Error handling for undefined routes
app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({ message: error.message });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
