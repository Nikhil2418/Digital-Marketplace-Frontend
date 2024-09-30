import React, { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa'; // Importing FontAwesome icons for stars
import { Link } from 'react-router-dom';

const AvailableCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const token = localStorage.getItem('token'); // Retrieve token for authentication

  // Fetch all customer profiles when the component loads
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/customer-profiles', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setCustomers(data);
        } else {
          console.error('Failed to fetch customers:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    };

    fetchCustomers();
  }, [token]);

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Available Customers for Hire</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {customers.map((customer) => (
          <div
            key={customer._id}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
          >
            <h2 className="text-2xl font-bold mb-2">{customer.userId.name}</h2>
            <p className="text-gray-700 mb-2">
              <strong>About:</strong> {customer.summary || 'No summary provided.'}
            </p>

            {/* Skill Set */}
            <div className="mb-4">
              <h3 className="font-bold text-lg">Skills:</h3>
              <div className="flex flex-wrap gap-2">
                {customer.skills.length > 0 ? (
                  customer.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="inline-block bg-gray-200 text-gray-700 py-1 px-3 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))
                ) : (
                  <p>No skills listed</p>
                )}
              </div>
            </div>

            {/* Education Section */}
            <div className="mb-4">
              <h3 className="font-bold text-lg">Education:</h3>
              {customer.education.length > 0 ? (
                customer.education.map((edu, index) => (
                  <div key={index}>
                    <p className="font-medium">{edu.institution}</p>
                    <p className="text-sm text-gray-600">{edu.degree}</p>
                    <p className="text-sm text-gray-500">
                      {edu.startYear} - {edu.endYear}
                    </p>
                  </div>
                ))
              ) : (
                <p>No education details provided</p>
              )}
            </div>

            {/* Reviews Section */}
            <div className="mb-4">
              <h3 className="font-bold text-lg">Latest Reviews:</h3>
              {customer.reviews.length > 0 ? (
                customer.reviews.slice(0, 5).map((review, index) => (
                  <div key={index} className="mb-2">
                    <p className="text-sm text-gray-600">
                      <strong>{review.reviewedBy?.name || 'Anonymous'}:</strong> {review.reviewText}
                    </p>
                  </div>
                ))
              ) : (
                <p>No reviews available</p>
              )}
            </div>

            {/* Average Rating */}
            <div className="flex items-center mb-4">
              <span className="font-bold mr-2">Rating:</span>
              {[...Array(5)].map((star, i) => (
                <FaStar
                  key={i}
                  size={20}
                  color={i < Math.round(customer.averageRating) ? '#ffc107' : '#e4e5e9'}
                />
              ))}
              <span className="ml-2">({customer.averageRating?.toFixed(1) || '0.0'})</span>
            </div>

            <Link
              to={`/customer-profile/${customer.userId._id}`}
              className="block mt-4 bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700"
            >
              View Profile
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvailableCustomers;
