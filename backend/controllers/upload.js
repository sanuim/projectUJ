const multer = require('multer');
const fs = require("fs");

// Multer configuration
const storage = multer.diskStorage({

  destination: (req, file, cb) => {
    const projectId = req.params.id;
    const path ='uploads/'+projectId;
    fs.mkdirSync(path, { recursive: true })
    cb(null, path); // Specify the destination folder for uploaded files
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname;
    cb(null, fileName);
  },
});

const upload = multer({ storage });

module.exports = upload;
