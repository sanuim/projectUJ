const express = require('express');
const router = express.Router();
const { authenticateToken, checkPermission } = require('../controllers/authController');
const taskController = require('../controllers/taskController');


// Get all tasks (requires authentication)
router.get('/', authenticateToken, taskController.getAllTasks);

// Get task by ID (requires authentication)
router.get('/:id', authenticateToken, taskController.getTask);

// Create new task (requires authentication and project leader role)
router.post('/', authenticateToken, checkPermission('project_leader'), taskController.createTask);

// Update task (requires authentication and project leader role)
router.put('/:id', authenticateToken, checkPermission('project_leader'), taskController.updateTask);

// Delete task (requires authentication and project leader role)
router.delete('/:id', authenticateToken, checkPermission('project_leader'), taskController.deleteTask);


module.exports = router;
