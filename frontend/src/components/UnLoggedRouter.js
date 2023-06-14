import React, {useState} from 'react';
import {Route, Routes} from "react-router-dom";
import LoginModal from "./LoginModal";

const UnLoggedRouter = () => {
    const [showModal, setShowModal] = useState(true);

    const handleCloseModal = () => {
        setShowModal(false);
    };


    return (
        <>
            <Routes>
                <Route exact path="/" element={<LoginModal/>}/>
                <Route path="/login" modal={<LoginModal/>}/>
            </Routes>
            <LoginModal show={showModal} handleClose={handleCloseModal}/>
        </>
    );
};

export default UnLoggedRouter;
