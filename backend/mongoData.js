const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");

// async function main() {
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    authSource: 'admin',
    auth: {
        username: "root",
        password: "example"
    }
};

const uri = "mongodb://host.docker.internal/projectUJ";

mongoose.connect(uri, options)
  .then(async () => {
    console.log('Connected to MongoDB');

    // Import models
    const Project = require('./models/projectModel');
    const Task = require('./models/taskModel');
    const User = require('./models/userModel');

    // Create collections if they don't exist
    await Project.createCollection();
    await Task.createCollection();
    await User.createCollection();

    // Sample data
    const projectsData = [
      {
        project_id: 1,
        project_name: 'Project 1',
        project_description: 'Description for Project 1',
        creation_date: new Date(),
        deadline: new Date('2023-06-30').toISOString().split('T')[0],
      },
      {
        project_id: 2,
        project_name: 'Project 2',
        project_description: 'Description for Project 2',
        creation_date: new Date(),
        deadline: new Date('2023-07-15'),
      },
    ];

    const tasksData = [
      {
        task_id: 1,
        project_id: 1,
        task_name: 'Task 1',
        task_description: 'Description for Task 1',
        creation_date: new Date(),
        deadline: new Date('2023-06-30'),
        status: 'In Progress',
      },
      {
        task_id: 2,
        project_id: 1,
        task_name: 'Task 2',
        task_description: 'Description for Task 2',
        creation_date: new Date(),
        deadline: new Date('2023-07-15'),
        status: 'Pending',
      },
    ];

    const usersData = [
      {
        user_id: 1,
        first_name: 'John',
        last_name: 'Doe',
        email: 'john.doe@example.com',
        password: await bcrypt.hash('password1', 10),
        role: 'admin',
      },
      {
        user_id: 2,
        first_name: 'Jane',
        last_name: 'Smith',
        email: 'jane.smith@example.com',
        password: await bcrypt.hash('password2', 10),
        role: 'project_leader',
      },
        {
        user_id: 3,
        first_name: 'Anna',
        last_name: 'Smith',
        email: 'anna.smith@example.com',
        password: await bcrypt.hash('password3', 10),
        role: 'user',
      },
    ];

    // Insert sample data into collections
    const insertData = async () => {
      try {
        await Project.insertMany(projectsData);
        await Task.insertMany(tasksData);
        await User.insertMany(usersData);

        console.log('Sample data inserted successfully');

        // Disconnect from the database after inserting data
        mongoose.disconnect();
      } catch (error) {
        console.error(error);
        mongoose.disconnect();
      }
    };

    // Call the data insertion function
    insertData();
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });