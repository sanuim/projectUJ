import React from 'react';
import {Route, Routes} from "react-router-dom";
import ProjectsPage from "./ProjectsPage";
import TasksPage from "./TasksPage";
import UsersPage from "./UsersPage";
import LoginModal from "./LoginModal";
import ContinuousScrolling from "./ContinuousScrolling";
import ParallaxScrolling from "./ParallaxScrolling";

const LoggedRouter = () => {

  return (
    <Routes>
        <Route path="/" element={<ProjectsPage/>} />
        <Route path="/projects" element={<ProjectsPage/>} />
        <Route path="/tasks" element={<TasksPage/>} />
        <Route path="/users" element={<UsersPage/>} />
        <Route path="/login" element={<LoginModal/>} />
        <Route path="/scroll" element={<ContinuousScrolling/>} />
        <Route path="/parallax" element={<ParallaxScrolling/>} />
    </Routes>
  );
};

export default LoggedRouter;
