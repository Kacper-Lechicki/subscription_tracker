import { DB_URI, NODE_ENV } from '../config/env.js'; // Importing database URI and environment mode from environment config
import mongoose from 'mongoose'; // Importing Mongoose for MongoDB interaction

// Ensure the DB_URI environment variable is defined; throw an error if not
if (!DB_URI) {
  throw new Error(
    `Please define the DB_URI environment variable inside .env.<development/production>.local`,
  );
}

// Function to establish a connection to the MongoDB database
const connectToDatabase = async () => {
  try {
    // Attempt to connect to MongoDB using the provided URI
    await mongoose.connect(DB_URI, {});
    console.log(`Connected to database in ${NODE_ENV} mode`); // Log successful connection with the current environment mode
  } catch (error) {
    // Log connection error and terminate the application with a failure status
    console.error(`Error connecting to database: ${error}`);
    process.exit(1);
  }
};

export { connectToDatabase }; // Export the function for use in other parts of the application
