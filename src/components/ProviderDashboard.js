import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ServiceProviderPayment from './ServiceProviderPayment';

const ProviderDashboard = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch services from API
  const fetchServices = async () => {
    try {
      const response = await fetch('https://digital-marketplace-backend-production.up.railway.app/api/services/provider', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setServices(data);
      } else {
        console.error('Error fetching services:', data.message);
      }
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  };

  // Delete service function
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this service?');
    if (!confirmDelete) return;

    try {
      const response = await fetch(`https://digital-marketplace-backend-production.up.railway.app/api/services/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (response.ok) {
        // Remove deleted service from the list
        setServices(services.filter((service) => service._id !== id));
      } else {
        console.error('Failed to delete service');
      }
    } catch (error) {
      console.error('Error deleting service:', error);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">My Dashboard</h1>
        <div className="space-y-4">
          <Link
            to="/provider-applications"
            className="block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
          >
            View Service Applications
          </Link>
        </div>
      </div>
      <div className="flex justify-end mb-6">
        <button
          onClick={() => navigate('/services/create')}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg"
        >
          Create New Service
        </button>
      </div>
      {loading ? (
        <p className="text-center text-gray-600">Loading services...</p>
      ) : services.length === 0 ? (
        <p className="text-center text-gray-600">You haven't created any services yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service) => (
            <div
              key={service._id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
            >
              {/* Service Title */}
              <h2 className="text-2xl font-bold text-gray-800">{service.title}</h2>
              {/* Budget and Level */}
              <p className="text-gray-600 mt-1">Budget: ₹{service.budget} • {service.level || 'Intermediate'}</p>
              {/* Short Description */}
              <p className="mt-4 text-gray-700">{service.description}</p>
              {/* Skills */}
              <div className="flex flex-wrap gap-2 mt-4">
                {service.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-gray-200 text-gray-800 text-sm font-medium py-1 px-3 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              {/* Additional Information */}
              <div className="flex items-center justify-between mt-6">
                <div className="text-gray-500 text-sm flex items-center gap-2">
                  <span className="inline-block text-green-600">●</span> {service.country || 'Location not specified'}
                </div>
                <div className="flex gap-4">
                  <Link
                    to={`/services/edit/${service._id}`}
                    className="text-blue-500 hover:underline font-medium"
                  >
                    Edit
                  </Link>
                  <button
                    className="text-red-500 hover:underline font-medium focus:outline-none"
                    onClick={() => handleDelete(service._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
              {/* Service Status */}
              <div className="mt-4">
                <p className={`font-bold ${service.status === 'Completed' ? 'text-green-600' : 'text-gray-600'}`}>
                  Status: {service.status}
                </p>
                {/* Show "Pay Now" button if the status is Completed */}
                {service.status === 'Completed' && (
                  <div className="mt-4">
                    <ServiceProviderPayment serviceId={service._id} currentStatus={service.status} />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProviderDashboard;
