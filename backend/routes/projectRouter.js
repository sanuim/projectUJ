const express = require('express');
const router = express.Router();
const { authenticateToken, checkPermission } = require('../controllers/authController');
const projectController = require('../controllers/projectController');
const upload = require('../controllers/upload');
const path = require("path");
const fs = require("fs");


// Get all projects (requires authentication)
router.get('/', authenticateToken, projectController.getAllProjects);

// Get project by ID (requires authentication)
router.get('/:id', authenticateToken, projectController.getProject);

// Create new project (requires authentication and project leader role)
router.post('/', authenticateToken, checkPermission('project_leader'), projectController.createProject);

// Update project (requires authentication and project leader role)
router.put('/:id', authenticateToken, checkPermission('project_leader'), projectController.updateProject);

// Delete project (requires authentication and project leader role)
router.delete('/:id', authenticateToken, checkPermission('project_leader'), projectController.deleteProject);

// Handle the upload request for a single file
router.post('/:id/upload',authenticateToken, checkPermission('project_leader'), upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  return res.status(200).json({ message: 'File uploaded successfully' });
});

// Endpoint for fetching the list of files for a project
router.get('/:id/files', authenticateToken, checkPermission('project_leader'), (req, res) => {
  const projectId = req.params.id;

  // Read the contents of the 'uploads' folder for the specified project
  const directoryPath = path.join(__dirname, '..', 'uploads', projectId);
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.error('Error reading directory:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }

    // Return the list of files to the client
    return res.status(200).json({ files });
  });
});


module.exports = router;
