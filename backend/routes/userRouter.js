const express = require('express');
const router = express.Router();
const { authenticateToken, checkPermission } = require('../controllers/authController');
const userController = require('../controllers/userController');


// Get all users (requires authentication and admin role)
router.get('/', authenticateToken, checkPermission('admin'), userController.getAllUsers);

// Get user by ID (requires authentication)
router.get('/:id', authenticateToken, userController.getUser);

// Create new user (requires authentication and admin role)
router.post('/', authenticateToken, checkPermission('admin'), userController.createUser);

// Update user (requires authentication)
router.put('/:id', authenticateToken, userController.updateUser);

// Delete user (requires authentication and admin role)
router.delete('/:id', authenticateToken, checkPermission('admin'), userController.deleteUser);


module.exports = router;
