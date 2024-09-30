import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AvailableServices = () => {
  const [services, setServices] = useState([]); // State to store the list of services
  const navigate = useNavigate();
  const token = localStorage.getItem('token'); // Get token for authentication
  const userId = localStorage.getItem('userId'); // Get logged-in user ID for reference

  useEffect(() => {
    // Fetch all services from the API when the component loads
    const fetchServices = async () => {
      try {
        const response = await fetch('https://digital-marketplace-backend-production.up.railway.app/api/services/provider', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Include token if API requires authentication
          },
        });

        if (response.ok) {
          const data = await response.json();
          setServices(data); // Set the fetched services into state
        } else {
          console.error('Failed to fetch services:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchServices(); // Call the function to fetch services
  }, [token]);

  // Handle the Apply Now button click
  const handleApply = async (serviceId) => {
    try {
      const response = await fetch('https://digital-marketplace-backend-production.up.railway.app/api/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Include token for authentication
        },
        body: JSON.stringify({ serviceId, applicantId: userId }), // Send the service ID and applicant ID
      });

      if (response.ok) {
        alert('Successfully applied for the service! The service provider has been notified.');
      } else {
        const errorData = await response.json();
        console.error('Failed to apply for service:', errorData.message);
        alert(`Failed to apply: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error applying for service:', error);
      alert('An error occurred while applying. Please try again later.');
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-center mb-6">Available Services</h1>
      {services.length === 0 ? (
        <p className="text-center text-gray-600">No services are currently available.</p>
      ) : (
        <div className="space-y-6">
          {services.map((service) => (
            <div
              key={service._id}
              className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300 ease-in-out"
            >
              {/* Title and Budget */}
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-2xl font-bold">{service.title}</h2>
                <span className="text-green-600 font-semibold">Budget: ${service.price}</span>
              </div>

              {/* Description */}
              <p className="text-gray-700 mb-4">{service.description}</p>

              {/* Additional Service Details */}
              <div className="flex items-center space-x-4 mb-4 text-gray-600">
                <span className="flex items-center">
                  <strong>Level:</strong> {service.level || 'Intermediate'}
                </span>
                <span className="flex items-center">
                  <strong>Duration:</strong> {service.duration || 'N/A'}
                </span>
                <span className="flex items-center">
                  <strong>Country:</strong> {service.country || 'Remote'}
                </span>
              </div>

              {/* Skills (if available) */}
              {service.skills && service.skills.length > 0 && (
                <div className="mb-4">
                  <h3 className="font-semibold">Skills Required:</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {service.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="bg-gray-200 text-gray-700 py-1 px-3 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Footer Actions */}
              <div className="flex justify-between items-center">
                <button
                  onClick={() => navigate(`/services/${service._id}`)}
                  className="text-blue-600 font-semibold hover:underline"
                >
                  View Details
                </button>

                <a
                  href={`/service-provider-profile/${service.provider.id}`} // Replace with the correct route
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 font-semibold hover:underline"
                >
                  View Profile
                </a>
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
                  onClick={() => handleApply(service._id)} // Call handleApply with service ID
                >
                  Apply Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AvailableServices;
