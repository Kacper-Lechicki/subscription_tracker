import { Router } from 'express';
import { signIn, signOut, signUp } from '../controllers/auth.controller.js';

const authRouter = Router(); // Create a new router instance for authentication-related routes

// Route for user sign-up
authRouter.post('/sign-up', signUp);
// Calls the `signUp` controller function to handle user registration

// Route for user sign-in
authRouter.post('/sign-in', signIn);
// Calls the `signIn` controller function to handle user login

// Route for user sign-out
authRouter.post('/sign-out', signOut);
// Calls the `signOut` controller function to handle user logout

export { authRouter };
