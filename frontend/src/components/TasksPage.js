import React, {useEffect, useState} from 'react';
import {Table, Container, Button, Form} from 'react-bootstrap';
import axios from 'axios';
import moment from 'moment';
const accessToken = localStorage.getItem('accessToken');

const TasksPage = () => {
  const [filters, setFilters] = useState({task_id: '', project_id: '', task_name: '', task_description: '',creation_date: '',deadline: '', status: '' });
  const [sortBy, setSortBy] = useState('task_id');
  const [tasks, setTasks] = useState([]);

  // Fetch tasks from the API on component load
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('/api/tasks', {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    });

      if (response.status === 200) {
        const data = await response.data;

        data.forEach(data => {
          data.creation_date = moment(data.creation_date).format('YYYY-MM-DD');
          data.deadline = moment(data.deadline).format('YYYY-MM-DD');
        });

        setTasks(data);
      } else {
        console.error('Error fetching projects:', response.status);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const filteredTasks = tasks.filter((task) =>
      task.task_id.toString().includes(filters.task_id.toLowerCase()) &&
    task.project_id.toString().includes(filters.project_id.toLowerCase()) &&
    task.task_name.toLowerCase().includes(filters.task_name.toLowerCase()) &&
    task.task_description.toLowerCase().includes(filters.task_description.toLowerCase()) &&
    task.creation_date.toLowerCase().includes(filters.creation_date.toLowerCase()) &&
    task.deadline.toLowerCase().includes(filters.deadline.toLowerCase()) &&
    task.status.toLowerCase().includes(filters.status.toLowerCase())
  );

  const sortedTasks = filteredTasks.sort((a, b) => {
    if (sortBy === 'task_name') {
      return a.task_name.localeCompare(b.task_name);
    } else if (sortBy === 'task_id') {
      return a.task_id.toString().localeCompare(b.task_id);
    } else if (sortBy === 'project_id') {
      return a.project_id.toString().localeCompare(b.project_id);
    } else if (sortBy === 'task_description') {
      return a.task_description.localeCompare(b.task_description);
    } else if (sortBy === 'creation_date') {
      return a.creation_date.localeCompare(b.creation_date);
    } else if (sortBy === 'deadline') {
      return a.deadline.localeCompare(b.deadline);
    } else if (sortBy === 'status') {
      return a.status.localeCompare(b.status);
    }
    return 0;
  });


  const handleFilterChange = (e, key) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: e.target.value,
    }));
  };

  return (
    <Container className="text-center mt-4">
      <h2>Tasks</h2>
      <div className="d-flex justify-content-between mb-3">
        <Form.Group controlId="sortBy" className="mr-2">
          <Form.Control
            as="select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="task_id">Id</option>
            <option value="project_id">Project Id</option>
            <option value="task_name">Name</option>
            <option value="task_description">Description</option>
            <option value="creation_date">Creation date</option>
            <option value="deadline">Deadline</option>
            <option value="status">Status</option>
          </Form.Control>
        </Form.Group>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Id</th>
            <th>Project Id</th>
            <th>Name</th>
            <th>Description</th>
            <th>Creation date</th>
            <th>Deadline</th>
            <th>Status</th>
          </tr>
        </thead>
        <thead>
          <tr>
            <th>
              <Form.Control
                type="text"
                placeholder="Filter by Id"
                value={filters.task_id}
                onChange={(e) => handleFilterChange(e, 'task_id')}
              />
            </th>
            <th>
              <Form.Control
                type="text"
                placeholder="Filter by Project Id"
                value={filters.project_id}
                onChange={(e) => handleFilterChange(e, 'project_id')}
              />
            </th>
            <th>
              <Form.Control
                type="text"
                placeholder="Filter by Name"
                value={filters.task_name}
                onChange={(e) => handleFilterChange(e, 'task_name')}
              />
            </th>
            <th>
              <Form.Control
                type="text"
                placeholder="Filter by Description"
                value={filters.task_description}
                onChange={(e) => handleFilterChange(e, 'task_description')}
              />
            </th>
            <th>
              <Form.Control
                type="text"
                placeholder="Filter by Creation date"
                value={filters.creation_date}
                onChange={(e) => handleFilterChange(e, 'creation_date')}
              />
            </th>
            <th>
              <Form.Control
                type="text"
                placeholder="Filter by Deadline"
                value={filters.deadline}
                onChange={(e) => handleFilterChange(e, 'deadline')}
              />
            </th>
            <th>
              <Form.Control
                type="text"
                placeholder="Filter by Status"
                value={filters.status}
                onChange={(e) => handleFilterChange(e, 'status')}
              />
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedTasks.map((task,index) => (
            <tr key={index}>
              <td>{task.task_id}</td>
              <td>{task.project_id}</td>
              <td>{task.task_name}</td>
              <td>{task.task_description}</td>
              <td>{task.creation_date}</td>
              <td>{task.deadline}</td>
              <td>{task.status}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default TasksPage;
