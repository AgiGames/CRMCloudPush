import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import LoginPage from "./loginFrontend"
import AdminDashboard from './adminFrontend';
import UserDashboard from './userFrontend';
import { RegNumberProvider } from './regNumberContext';
function App() {
  return (
    <RegNumberProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/user" element={<UserDashboard />} />
        </Routes>
      </Router>
    </RegNumberProvider>
  );
}

export default App;