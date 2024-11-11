import React from "react";
import Navbar from "./components/dashboard/navbar";
import Intro from "./components/dashboard/intro";
import Lobby from "./components/dashboard/lobby";
import Carousel from "./components/dashboard/carousel";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Admin/login";
import AdminPanel from "./components/Admin/admin-panel";
import LocationDetail from "./components/dashboard/location"


const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Intro />
              <Lobby />
              <Carousel />
            </>
          }
        />
        <Route path="/location/:id" element={<LocationDetail />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminPanel />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
