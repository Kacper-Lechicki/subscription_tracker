const errorMiddleware = (err, req, res, next) => {
  try {
    // Create a copy of the error object and copy the message for use
    let error = { ...err };
    error.message = err.message;

    // Log the error details for debugging purposes
    console.error(error);

    // Handle specific error cases based on their type or properties

    // Handle invalid MongoDB ObjectId errors (e.g., CastError)
    if (err.name === 'CastError') {
      const message = 'Resource not found';
      error = new Error(message);
      error.statusCode = 404; // Set HTTP status code to 404 (Not Found)
    }

    // Handle duplicate field errors in MongoDB (e.g., unique constraint violations)
    if (err.code === 11000) {
      const message = 'Duplicate field value entered';
      error = new Error(message);
      error.statusCode = 400; // Set HTTP status code to 400 (Bad Request)
    }

    // Handle validation errors from Mongoose
    if (err.name === 'ValidationError') {
      // Combine all validation error messages into a single string
      const message = Object.values(err.errors).map(val => val.message);
      error = new Error(message.join(', '));
      error.statusCode = 400; // Set HTTP status code to 400 (Bad Request)
    }

    // Send the error response to the client with appropriate status code and message
    res
      .status(err.statusCode || 500) // Default to 500 (Internal Server Error) if no statusCode is set
      .json({ success: false, error: error.message || 'Server Error' });
  } catch (error) {
    // Pass any errors that occur within the middleware to the next error handler
    next(error);
  }
};

export { errorMiddleware };
