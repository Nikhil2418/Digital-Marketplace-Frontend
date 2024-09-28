import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ServiceList = () => {
  const [services, setServices] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch("/api/services");
        const data = await response.json();
        if (response.ok) {
          setServices(data);
        } else {
          setError(data.message);
        }
      } catch (error) {
        setError("Failed to fetch services");
      }
    };

    fetchServices();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      try {
        const response = await fetch(`/api/services/${id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          setServices(services.filter((service) => service._id !== id));
        } else {
          const data = await response.json();
          setError(data.message);
        }
      } catch (error) {
        setError("Failed to delete service");
      }
    }
  };

  const handlePublish = async (id) => {
    try {
      const response = await fetch(`/api/services/${id}/publish`, {
        method: "PUT",
      });
      if (response.ok) {
        const updatedService = await response.json();
        setServices(
          services.map((service) =>
            service._id === id ? updatedService.service : service
          )
        );
      } else {
        const data = await response.json();
        setError(data.message);
      }
    } catch (error) {
      setError("Failed to publish service");
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold mb-4">Your Services</h2>

      {error && <p className="text-red-500">{error}</p>}

      <Link
        to="/services/create"
        className="inline-block mb-4 py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded"
      >
        Create New Service
      </Link>

      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 border-b text-left">Title</th>
            <th className="py-2 border-b text-left">Category</th>
            <th className="py-2 border-b text-left">Price</th>
            <th className="py-2 border-b text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service) => (
            <tr key={service._id}>
              <td className="py-2 border-b">{service.title}</td>
              <td className="py-2 border-b">{service.category}</td>
              <td className="py-2 border-b">₹{service.price}</td>
              <td className="py-2 border-b">
                <Link
                  to={`/services/edit/${service._id}`}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(service._id)}
                  className="ml-4 text-red-600 hover:underline"
                >
                  Delete
                </button>
              </td>

              <td className="py-2 border-b">
                <Link
                  to={`/services/edit/${service._id}`}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(service._id)}
                  className="ml-4 text-red-600 hover:underline"
                >
                  Delete
                </button>
                {!service.isPublished && (
                  <button
                    onClick={() => handlePublish(service._id)}
                    className="ml-4 text-green-600 hover:underline"
                  >
                    Publish
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ServiceList;
