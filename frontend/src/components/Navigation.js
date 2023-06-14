import React, {useEffect, useState} from 'react';
import {Navbar, Nav, Container, Image, NavLink} from 'react-bootstrap';
import ProjectsNav from "./ProjectsNav";
import {useDispatch, useSelector} from 'react-redux';
import { setIsLogged } from '../redux/actions';
import {Link} from "react-router-dom";

const Navigation = () => {
    const isLogged = useSelector(state => state.isLogged);
    const dispatch = useDispatch();

    const  handleLogout = () => {
        dispatch(setIsLogged(false));
    }

    return (
        <Navbar sticky="top" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand>
                    <Nav.Link as={Link} to="/"><Image src="logo.png" width="50" rounded/></Nav.Link>
                    ProjectUJ
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbar-dark-example"/>
                <Nav>
                    {isLogged && <ProjectsNav/>}
                    {isLogged && <Nav.Link as={Link} to="/tasks">Tasks</Nav.Link>}
                    {isLogged && <Nav.Link as={Link} to="/users">Users</Nav.Link>}
                    {isLogged && <Nav.Link as={Link} to="/scroll">Continuous Scrolling</Nav.Link>}
                    {isLogged && <Nav.Link as={Link} to="/parallax">Parallax Scrolling</Nav.Link>}
                    {isLogged && <Nav.Link onClick={handleLogout}>Logout</Nav.Link>}
                </Nav>
            </Container>
        </Navbar>
    );
};

export default Navigation;