import React from 'react';
import {Modal, Button} from 'react-bootstrap';

// Modal for single project record
const ProjectModal = ({project, show, handleClose}) => {
    return (
        <Modal centered show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Project Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Id: {project.project_id}</p>
                <p>Name: {project.project_name}</p>
                <p>Description: {project.project_description}</p>
                <p>Creation Date: {project.creation_date}</p>
                <p>Deadline: {project.deadline}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ProjectModal;