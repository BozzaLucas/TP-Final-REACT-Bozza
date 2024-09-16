import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PublicLayout from './layouts/PublicLayout';
import PrivateLayout from './layouts/PrivateLayout';
import Login from './pages/Login';
import Home from './pages/Home';
import Empleados from './pages/Empleados';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './context/AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route element={<PublicLayout />}>
            <Route path="/login" element={<Login />} />
          </Route>
          <Route element={<PrivateRoute element={<PrivateLayout />} />}>
            <Route path="/" element={<Home />} />
            <Route path="/empleados" element={<Empleados />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
