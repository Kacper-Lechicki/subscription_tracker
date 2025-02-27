import express from 'express';
import cookieParser from 'cookie-parser';
import { PORT } from './config/env.js';
import { userRouter } from './routes/user.routes.js';
import { subscriptionRouter } from './routes/subscription.routes.js';
import { authRouter } from './routes/auth.routes.js';
import { connectToDatabase } from './database/mongodb.js';
import { errorMiddleware } from './middleware/error.middleware.js';

const app = express(); // Create an instance of the Express application

// Middleware to parse incoming JSON payloads
app.use(express.json());

// Middleware to parse URL-encoded data with querystring library options
app.use(express.urlencoded({ extended: false }));

// Middleware to parse cookies in incoming requests
app.use(cookieParser());

// Routes for authentication functionality
app.use('/api/v1/auth', authRouter);

// Routes for user-related operations
app.use('/api/v1/users', userRouter);

// Routes for subscription-related operations
app.use('/api/v1/subscriptions', subscriptionRouter);

// Middleware to handle errors globally across the application
app.use(errorMiddleware);

// Root route, sends a welcome message when accessed
app.get('/', (req, res) => {
  res.send('Welcome to the Subscription Tracker API!');
});

// Start the server and connect to the database
app.listen(PORT, async () => {
  console.log(`Subscription Tracker API listening on http://localhost:${PORT}`);
  await connectToDatabase(); // Establish a connection to the database before starting the server
});

export default app;
