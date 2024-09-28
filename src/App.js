import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import ServiceDetails from './pages/ServiceDetails';
import Booking from './pages/Booking';
import Login from './pages/Login';
import Register from './pages/Register';
import PrivateRoute from './components/PrivateRoute';
import ProviderDashboard from './components/ProviderDashboard';
import ServiceForm from './components/ServiceForm';
import ServiceList from './components/ServiceList';
import Header from './components/Header';
// import './styles.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header/>
        <Routes>
         <Route path="/services" element={<ServiceList />} />
         <Route path="/services/create" element={<ServiceForm />} />
         <Route path="/services/edit/:id" element={<ServiceForm />} />
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/services/:id" element={<ServiceDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Customer Protected Routes */}
          <Route path="/booking/:id" element={
            <PrivateRoute allowedRoles={['customer']}>
              <Booking />
            </PrivateRoute>
          } />

          {/* Service Provider Protected Routes */}
          <Route path="/provider-dashboard" element={
            <PrivateRoute allowedRoles={['service-provider']}>
              <ProviderDashboard />
            </PrivateRoute>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
