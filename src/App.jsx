// src/App.jsx (update)
import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import SignupPage from "./SignupPage";
import LoginPage from "./LoginPage";
import AdminDashboard from "./AdminDashboard";
import EmployeeDashboard from "./EmployeeDashboard";

function App() {
  return (
    <Router>
      <nav>
        <Link to="/signup">Signup</Link> | <Link to="/login">Login</Link>
      </nav>
      <Routes>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
