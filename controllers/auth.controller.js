import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { User } from '../models/user.model.js'; // Importing Mongoose for database operations

// Controller function for user sign-up
export const signUp = async (req, res, next) => {
  // Start a Mongoose session for managing transactions
  const session = await mongoose.startSession();
  session.startTransaction(); // Begin a database transaction

  try {
    // Destructure the name, email, and password values from the request body
    const { name, email, password } = req.body;

    // Check if a user with the given email already exists in the database
    const existingUser = await User.findOne({ email }, {}, {});

    if (existingUser) {
      // If the user exists, create an error object with appropriate message and status code
      const error = new Error('User already exists');
      error.statusCode = 409; // 409 Conflict
      throw error; // Throw the error to be handled by error-handling middleware
    }

    // Generate a salt for hashing the password
    const salt = await bcrypt.genSalt(10);

    // Hash the user's password using bcrypt and the generated salt
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user in the database with the provided details and hashed password
    const newUsers = await User.create(
      [
        {
          name,
          email,
          password: hashedPassword,
        },
      ],
      { aggregateErrors: true },
    );

    // Generate a JSON Web Token (JWT) with the user's ID for authentication
    const token = jwt.sign(
      { userId: newUsers[0]._id }, // Payload containing the user ID
      process.env.JWT_SECRET, // Secret key for signing the token
      { expiresIn: process.env.JWT_EXPIRES_IN }, // Token expiration time
    );

    // Commit the database transaction to persist all changes made during the session
    await session.commitTransaction();
    // End the database session to clean up resources
    await session.endSession();

    // Send a successful response to the client with appropriate status code
    res.status(201).json({
      success: true, // Indicate that the operation was successful
      message: 'User created successfully', // Informative message for the client
      data: {
        token, // Include the generated JWT token for authentication
        user: newUsers[0], // Include the details of the created user (assuming newUsers is an array)
      },
    });
  } catch (error) {
    // Abort the ongoing database transaction in case of an error
    await session.abortTransaction();
    // End the database session to clean up resources
    await session.endSession();
    // Pass the error to the next middleware or error handler for further processing
    next(error);
  }
};

// // Controller function for user sign-in
// export const signIn = async (req, res, next) => {
//   // Logic for user authentication will be implemented here
// };
//
// // Controller function for user sign-out
// export const signOut = async (req, res, next) => {
//   // Logic for logging out the user will be implemented here
// };
