import { config } from 'dotenv'; // Importing dotenv package to load environment variables

// Load the appropriate `.env` file based on the NODE_ENV value, defaulting to 'development'
config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

// Export environment variables for use throughout the application
export const { PORT, NODE_ENV, DB_URI, JWT_SECRET, JWT_EXPIRES_IN } =
  process.env; // Destructure and export specific environment variables
