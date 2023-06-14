import React, {useEffect, useState} from 'react';
import {NavDropdown} from "react-bootstrap";
import axios from "axios";
import moment from "moment/moment";
import ProjectModal from "./ProjectModal";
import {Link} from "react-router-dom";
const accessToken = localStorage.getItem('accessToken') || '';

const ProjectsNav = () => {
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

    const handleOpenModal = (project) => {
        setSelectedProject(project);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <NavDropdown
            id="nav-dropdown-dark-example"
            title="My Projects"
            menuVariant="dark"
        >
            {projects.map((project, index) => (
                <NavDropdown.Item key={index} onClick={() => handleOpenModal(project)}>{project.project_name}</NavDropdown.Item>
            ))}
            <NavDropdown.Divider/>
            <NavDropdown.Item key='projects' as={Link} to="/projects">Projects</NavDropdown.Item>
            {selectedProject && (
                <ProjectModal project={selectedProject} show={showModal} handleClose={handleCloseModal}/>
            )}
        </NavDropdown>
    );
};

export default ProjectsNav;