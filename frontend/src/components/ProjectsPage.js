import React, {useState, useEffect} from 'react';
import { Table, Form, Container, Button } from 'react-bootstrap';
import ProjectModal from "./ProjectModal";
import axios from 'axios';
import moment from 'moment';
const accessToken = localStorage.getItem('accessToken') || '';

const ProjectsPage = () => {
  const [filters, setFilters] = useState({project_id: '', project_name: '', project_description: '', creation_date: '' , deadline: ''});
  const [sortBy, setSortBy] = useState('project_id');
  const [showModal, setShowModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [projects, setProjects] = useState([]);

  // Fetch projects from the API on component load
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get('/api/projects', {
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

        setProjects(data);
      } else {
        console.error('Error fetching projects:', response.status);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };


  const filteredProjects = projects.filter((project) =>
      project.project_id.toString().includes(filters.project_id.toLowerCase()) &&
    project.project_name.toLowerCase().includes(filters.project_name.toLowerCase()) &&
    project.project_description.toLowerCase().includes(filters.project_description.toLowerCase()) &&
    project.creation_date.toLowerCase().includes(filters.creation_date.toLowerCase()) &&
    project.deadline.toLowerCase().includes(filters.deadline.toLowerCase())
  );

  const sortedProjects = filteredProjects.sort((a, b) => {
    if (sortBy === 'project_name') {
      return a.project_name.localeCompare(b.project_name);
    } else if (sortBy === 'project_id') {
      return a.project_id.toString().localeCompare(b.project_id);
    } else if (sortBy === 'email') {
      return a.project_description.localeCompare(b.project_description);
    } else if (sortBy === 'creation_date') {
      return a.creation_date.localeCompare(b.creation_date);
    } else if (sortBy === 'deadline') {
      return a.deadline.localeCompare(b.deadline);
    }
    return 0;
  });

  const handleFilterChange = (e, key) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: e.target.value,
    }));
  };

  const handleOpenModal = (project) => {
    setSelectedProject(project);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <Container className="text-center mt-4">
      <h2>Projects</h2>
      <div className="d-flex justify-content-between mb-3">
        <Form.Group controlId="sortBy" className="mr-2">
          <Form.Control
            as="select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="project_id">Id</option>
            <option value="project_name">Name</option>
            <option value="project_description">Description</option>
            <option value="creation_date">Creation Date</option>
            <option value="deadline">Deadline</option>
          </Form.Control>
        </Form.Group>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Description</th>
            <th>Creation Date</th>
            <th>Deadline</th>
          </tr>
        </thead>
        <thead>
          <tr>
            <th>
              <Form.Control
                type="text"
                placeholder="Filter by Id"
                value={filters.project_id}
                onChange={(e) => handleFilterChange(e, 'project_id')}
              />
            </th>
            <th>
              <Form.Control
                type="text"
                placeholder="Filter by Name"
                value={filters.project_name}
                onChange={(e) => handleFilterChange(e, 'project_name')}
              />
            </th>
            <th>
              <Form.Control
                type="text"
                placeholder="Filter by Description"
                value={filters.project_description}
                onChange={(e) => handleFilterChange(e, 'project_description')}
              />
            </th>
            <th>
              <Form.Control
                type="text"
                placeholder="Filter by Creation Date"
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
            <th></th>
          </tr>
        </thead>
        <tbody>
          {sortedProjects.map((project, index) => (
            <tr key={index}>
              <td>{project.project_id}</td>
              <td>{project.project_name}</td>
              <td>{project.project_description}</td>
              <td>{project.creation_date}</td>
              <td>{project.deadline}</td>
              <td>
                <Button variant="primary" onClick={() => handleOpenModal(project)}>
                  Open
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {selectedProject && (
        <ProjectModal project={selectedProject} show={showModal} handleClose={handleCloseModal} />
      )}
    </Container>
  );
};

export default ProjectsPage;
