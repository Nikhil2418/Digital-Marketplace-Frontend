import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ServicesList = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch services for the provider from the backend API
    const fetchServices = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/services/provider', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`, // Include JWT token if required
          },
        });
        if (response.ok) {
          const data = await response.json();
          setServices(data);
        } else {
          setError('Failed to fetch services.');
        }
      } catch (err) {
        setError('An error occurred while fetching services.');
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/services/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Include JWT token if required
        },
      });

      console.log(response);
      if (response.ok) {
        setServices(services.filter((service) => service._id !== id));
      } else {
        alert('Failed to delete service.');
      }
    } catch (err) {
      alert('An error occurred while deleting the service.');
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h3 className="text-2xl font-semibold mb-6 text-center">Your Services</h3>
      {loading ? (
        <p>Loading services...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : services.length === 0 ? (
        <p className="text-gray-500">No services found. <Link to="/services/create" className="text-blue-600 hover:underline">Add a new service</Link></p>
      ) : (
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b">
              <th className="pb-4 pt-2">Service Name</th>
              <th className="pb-4 pt-2">Price</th>
              <th className="pb-4 pt-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service._id} className="border-b hover:bg-gray-100">
                <td className="py-3">{service.title}</td>
                <td className="py-3">{service.budget ? `₹${service.budget}` : 'N/A'}</td>
                <td className="py-3">
                  <Link to={`/services/edit/${service._id}`} className="text-blue-600 hover:underline">Edit</Link> |{' '}
                  <button
                    onClick={() => handleDelete(service._id)}
                    className="text-red-600 hover:underline focus:outline-none"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="mt-6 text-center">
        <Link
          to="/services/create"
          className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
        >
          Add New Service
        </Link>
      </div>
    </div>
  );
};

export default ServicesList;
