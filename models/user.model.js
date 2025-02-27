import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String, // Name of the user
      required: [true, 'Name is required'], // Field is mandatory with an error message on validation failure
      trim: true, // Automatically remove any leading or trailing whitespace
      minLength: 2, // Minimum length validation for the name
      maxLength: 50, // Maximum length validation for the name
    },
    email: {
      type: String, // Email address of the user
      required: [true, 'Email is required'], // Field is mandatory with an error message
      unique: true, // Ensures the email is unique in the database
      trim: true, // Automatically remove whitespace from around the email
      lowercase: true, // Ensure email is stored in lowercase
      math: [/\s+@\s+\.\s+/, 'Please enter a valid email address'], // Custom validation for email format
      minLength: 5, // Minimum length validation for the email
      maxLength: 255, // Maximum length validation for the email
    },
    password: {
      type: String, // User's password
      required: [true, 'Password is required'], // Field is mandatory with an error message
      minLength: 8, // Minimum length allowed for the password
    },
  },
  { timestamps: true }, // Automatically adds `createdAt` and `updatedAt` fields
);

const User = mongoose.model('User', userSchema);

export { User };
