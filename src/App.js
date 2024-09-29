import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home"; // Default Home component (if needed)
import ServiceDetails from "./pages/ServiceDetails";
import Booking from "./pages/Booking";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRoute from "./components/PrivateRoute";
import ProviderDashboard from "./components/ProviderDashboard";
import CustomerDashboard from "./components/CustomerDashboard"; // Add this import for Customer Dashboard
import ServiceForm from "./components/ServiceForm";
import ServiceList from "./components/ServiceList";
import Header from "./components/Header";
import AvailableCustomers from "./components/AvailableCustomers";
import AvailableServices from "./components/AvailableServices";
import ProtectedRoute from "./components/ProtectedRoute";
import CustomerProfile from "./components/CustomerProfile";
import EditCustomerProfile from "./components/EditCustomerProfile";
import ProviderApplications from "./components/ProviderApplications";
import ManageApplications from "./components/ManageApplications";
import ServiceProviderProfile from "./components/ServiceProviderProfile";

function App() {
  const userType = localStorage.getItem("userType");

  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          {/* Conditionally Render Home Component Based on userType */}
          <Route
            path="/"
            element={
              userType === "service-provider" ? (
                <ProviderDashboard />
              ) : userType === "customer" ? (
                <CustomerDashboard />
              ) : (
                <Home />
              )
            }
          />

          {/* Public Routes */}
          <Route path="/services" element={<ServiceList />} />
          <Route path="/services/:id" element={<ServiceDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Hire and Find Work Routes */}
          <Route
            path="/hire"
            element={
              <ProtectedRoute userType="service-provider">
                <AvailableCustomers />
              </ProtectedRoute>
            }
          />
          <Route
            path="/find-work"
            element={
              <ProtectedRoute userType="customer">
                <AvailableServices />
              </ProtectedRoute>
            }
          />

          {/* Customer Protected Routes */}
          <Route
            path="/booking/:id"
            element={
              <PrivateRoute allowedRoles={["customer"]}>
                <Booking />
              </PrivateRoute>
            }
          />
          <Route
            path="/customer-profile/:id"
            element={
              <PrivateRoute allowedRoles={["customer"]}>
                <CustomerProfile />
              </PrivateRoute>
            }
          />

          <Route
            path="/customer-profile/edit/:id"
            element={
              <PrivateRoute allowedRoles={["customer"]}>
                <EditCustomerProfile />
              </PrivateRoute>
            }
          />

          <Route
            path="/customer/applications"
            element={
              <PrivateRoute allowedRoles={["customer"]}>
                <ManageApplications />
              </PrivateRoute>
            }
          />

          {/* Service Provider Protected Routes */}
          <Route
            path="/provider-dashboard"
            element={
              <PrivateRoute allowedRoles={["service-provider"]}>
                <ProviderDashboard />
              </PrivateRoute>
            }
          />

          {/* Service Creation and Edit Routes for Providers */}
          <Route
            path="/services/create"
            element={
              <PrivateRoute allowedRoles={["service-provider"]}>
                <ServiceForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/services/edit/:id"
            element={
              <PrivateRoute allowedRoles={["service-provider"]}>
                <ServiceForm />
              </PrivateRoute>
            }
          />

          <Route
            path="/provider-applications"
            element={
              <PrivateRoute allowedRoles={["service-provider"]}>
                <ProviderApplications />
              </PrivateRoute>
            }
          />

          <Route
            path="/service-provider-profile/:id"
            element={
              <PrivateRoute allowedRoles={["service-provider"]}>
                <ServiceProviderProfile />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
