import React, {useState} from 'react';
import {Row, Col, Form, Button, Modal, Alert} from 'react-bootstrap';
import axios from 'axios';
import {useDispatch} from "react-redux";
import {setIsLogged} from "../redux/actions";

const LoginModal = ({show, handleClose}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showAlert, setShowAlert] = useState('');

    const dispatch = useDispatch();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/auth/login', {
                email,
                password,
            });
            if (response.status === 200) {
                setShowAlert('');
                const data = await response.data;
                const accessToken = data.token;
                localStorage.setItem('accessToken', accessToken);
                dispatch(setIsLogged(true));
                handleClose();
            }
        } catch (error) {
            setShowAlert('Invalid credentials');
        }
    };

    return (
        <Modal centered show={show}>
            <Modal.Header closeButton>
                <Modal.Title>Login</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row center="xs">
                    <Col>
                        {showAlert &&
                            <Alert key='danger' variant='danger'>
                                {showAlert}
                            </Alert>}
                        <Form onSubmit={handleLogin}>
                            <Form.Group controlId="email">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </Form.Group>
                            <Button variant="primary" type="submit" className="w-100 mt-3">
                                Submit
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Modal.Body>
        </Modal>
    );
};


export default LoginModal;
