import React, {useEffect, useState} from 'react';
import { Table, Form, Container, Button } from 'react-bootstrap';
import axios from 'axios';
const accessToken = localStorage.getItem('accessToken');

const UsersPage = () => {
  const [filters, setFilters] = useState({user_id: '', name: '', email: '', role: '' });
  const [sortBy, setSortBy] = useState('user_id');
  const [users, setUsers] = useState([]);

  // Fetch users from the API on component load
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/users', {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    });

      if (response.status === 200) {
        const data = await response.data;
        setUsers(data);
      } else {
        console.error('Error fetching projects:', response.status);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const filteredUsers = users.filter((user) =>
      user.user_id.toString().includes(filters.user_id.toLowerCase()) &&
      user.first_name.toLowerCase().includes(filters.name.toLowerCase()) &&
      user.last_name.toLowerCase().includes(filters.name.toLowerCase()) &&
      user.email.toLowerCase().includes(filters.email.toLowerCase()) &&
      user.role.toLowerCase().includes(filters.role.toLowerCase())
  );

  const sortedUsers = filteredUsers.sort((a, b) => {
    if (sortBy === 'name') {
      return a.first_name.localeCompare(b.first_name);
    } else if (sortBy === 'user_id') {
      return a.user_id.toString().localeCompare(b.user_id);
    } else if (sortBy === 'email') {
      return a.email.localeCompare(b.email);
    } else if (sortBy === 'role') {
      return a.role.localeCompare(b.role);
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
      <h2>Users</h2>
      <div className="d-flex justify-content-between mb-3">
        <Form.Group controlId="sortBy" className="mr-2">
          <Form.Control
            as="select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="user_id">Id</option>
            <option value="name">Name</option>
            <option value="email">Email</option>
            <option value="role">Role</option>
          </Form.Control>
        </Form.Group>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <thead>
          <tr>
            <th>
              <Form.Control
                type="text"
                placeholder="Filter by Id"
                value={filters.user_id}
                onChange={(e) => handleFilterChange(e, 'user_id')}
              />
            </th>
            <th>
              <Form.Control
                type="text"
                placeholder="Filter by Name"
                value={filters.name}
                onChange={(e) => handleFilterChange(e, 'name')}
              />
            </th>
            <th>
              <Form.Control
                type="text"
                placeholder="Filter by Email"
                value={filters.email}
                onChange={(e) => handleFilterChange(e, 'email')}
              />
            </th>
            <th>
              <Form.Control
                type="text"
                placeholder="Filter by Role"
                value={filters.role}
                onChange={(e) => handleFilterChange(e, 'role')}
              />
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedUsers.map((user,index) => (
            <tr key={index}>
              <td>{user.user_id}</td>
              <td>{user.first_name} {user.last_name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default UsersPage;
