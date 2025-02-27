import { Router } from 'express';

const userRouter = Router(); // Create a router instance for user-related routes

// Route to GET all users
userRouter.get('/', (req, res) => res.send({ title: 'GET all users' }));

// Route to GET details of a specific user by ID
userRouter.get('/:id', (req, res) => res.send({ title: 'GET user details' }));

// Route to CREATE a new user
userRouter.post('/', (req, res) => res.send({ title: 'CREATE new user' }));

// Route to UPDATE an existing user by ID
userRouter.put('/:id', (req, res) => res.send({ title: 'UPDATE user' }));

// Route to DELETE a specific user by ID
userRouter.delete('/:id', (req, res) => res.send({ title: 'DELETE user' }));

export { userRouter };
