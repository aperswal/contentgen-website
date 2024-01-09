import React from "react";
import Signup from "./authentication/Signup";
import { Container } from 'react-bootstrap';
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Profile from "./authentication/Profile";
import Login from "./authentication/Login";
import PrivateRoute from "./authentication/PrivateRoute";
import ForgotPassword from "./authentication/ForgotPassword";
import UpdateProfile from "./authentication/UpdateProfile";
import Dashboard from "./drive/Dashboard";

function App() {
  return (
        <Router>
          <AuthProvider>
            <Routes>

            <Route path="/" element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              } />

            <Route path="/folder/:folderId" element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>} />


              <Route path="/user" element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              } />
              <Route path="/update-profile" element = {
                <PrivateRoute>
                  <UpdateProfile />
                </PrivateRoute>
              } />

              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
            </Routes>
          </AuthProvider>
        </Router>
  );
}

export default App;
