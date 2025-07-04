import {  Routes, Route, Navigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import Kanban from "../pages/Kanban";
import Login from "../pages/Login";
import Register from "../pages/Register";

const Router = () => {
  const { user } = useAuth();

  return (
      <Routes>
        <Route path="/login" element={!user ? <Login/> : <Navigate to="/board" />} />
        <Route path="/register" element={<Register/>}/>
        <Route path="/board" element={user ? <Kanban/> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to={user ? "/board" : "/login"} />} />
      </Routes>
  );
};

export default Router;
