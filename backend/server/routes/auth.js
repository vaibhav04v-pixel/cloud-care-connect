// Import 'express' library to handle website routing
import express from 'express';
// Import all logic functions from the Auth Controller file
import * as authController from '../controllers/authController.js';

// Create a new router object (this manages a group of related URLs)
const router = express.Router();

// Define a POST route for Login: When user submits the login form
// URL: /api/auth/login
router.post('/login', authController.login);

// Define a POST route for Register: When user creates a new account
// URL: /api/auth/register
router.post('/register', authController.register);

// Define a POST route for Logout: When user signs out
// URL: /api/auth/logout
router.post('/logout', authController.logout);

// Export this router so the main server.js can use it
export default router;
