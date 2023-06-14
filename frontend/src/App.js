import React from 'react';
import Navigation from './components/Navigation';
import LoggedRouter from "./components/LoggedRouter";
import UnLoggedRouter from "./components/UnLoggedRouter";
import axios from 'axios';
import {useSelector} from "react-redux";
import {ParallaxProvider} from "react-scroll-parallax";

// Setting baseURL
axios.defaults.baseURL = 'http://localhost:8080';

const App = () => {
    const isLogged = useSelector(state => state.isLogged);
    return (
        <>
            <ParallaxProvider>
                <Navigation/>
                {isLogged && <LoggedRouter/>}
                {!isLogged && <UnLoggedRouter/>}
            </ParallaxProvider>
        </>
    );
};

export default App;
