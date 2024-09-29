import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const CustomerProfile = () => {
  const [customer, setCustomer] = useState(null); // State to store customer data
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId'); // Retrieve the user ID from localStorage
  const token = localStorage.getItem('token'); // Retrieve token for authentication

  useEffect(() => {
    // Fetch customer profile using user ID
    const fetchCustomerProfile = async () => {
      try {
        const response = await fetch(`https://digital-marketplace-backend-production.up.railway.app/api/customer-profiles/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setCustomer(data); // Set the customer data
        } else {
          console.error('Error fetching profile:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchCustomerProfile();
  }, [userId, token]);

  // Display loading state if data is not yet available
  if (!customer) return <p>Loading profile...</p>;

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Profile Header Section */}
      <div className="flex items-center space-x-6 mb-8">
        <img
          src={customer.profilePicture || "https://via.placeholder.com/150"}
          alt="Profile"
          className="w-32 h-32 rounded-full border border-gray-300 shadow-lg"
        />
        <div>
          <h1 className="text-3xl font-bold text-gray-800">{customer.name}</h1>
          <p className="text-gray-500">{customer.location}</p>
          <p className="text-gray-700 font-medium mt-2">{customer.title}</p>
          <p className="text-green-600 mt-2">{customer.hourlyRate ? `$${customer.hourlyRate}/hr` : 'N/A'}</p>
        </div>
      </div>

      {/* Profile Details and Summary */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-xl font-bold mb-4">About Me</h2>
        <p className="text-gray-700">{customer.summary || 'No summary provided'}</p>
      </div>

      {/* Availability and Languages */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-xl font-bold mb-4">Availability & Languages</h2>
        <p><strong>Availability:</strong> {customer.availability || 'N/A'}</p>
        <p><strong>Languages:</strong> {customer.languages?.join(', ') || 'N/A'}</p>
      </div>

      {/* Skills Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-xl font-bold mb-4">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {customer.skills?.length > 0 ? (
            customer.skills.map((skill, index) => (
              <span
                key={index}
                className="inline-block bg-gray-200 text-gray-700 py-1 px-3 rounded-full text-sm"
              >
                {skill}
              </span>
            ))
          ) : (
            <p>No skills provided.</p>
          )}
        </div>
      </div>

      {/* Education Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-xl font-bold mb-4">Education</h2>
        {customer.education?.length > 0 ? (
          customer.education.map((edu, index) => (
            <div key={index} className="mb-4">
              <p className="text-lg font-medium">{edu.institution}</p>
              <p>{edu.degree}</p>
              <p className="text-gray-500">{edu.startYear} - {edu.endYear}</p>
            </div>
          ))
        ) : (
          <p>No education details provided.</p>
        )}
      </div>

      {/* Linked Accounts */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-xl font-bold mb-4">Linked Accounts</h2>
        <div className="flex space-x-4">
          {customer.linkedAccounts?.length > 0 ? (
            customer.linkedAccounts.map((account, index) => (
              <Link
                key={index}
                to={account.url}
                className="flex items-center space-x-2 bg-gray-100 py-2 px-4 rounded-lg hover:bg-gray-200"
              >
                <span>{account.icon || '🔗'}</span>
                <span>{account.name}</span>
              </Link>
            ))
          ) : (
            <p>No linked accounts provided.</p>
          )}
        </div>
      </div>

      {/* Edit Profile Button */}
      <div className="flex justify-end">
        <button
          onClick={() => navigate(`/customer-profile/edit/${userId}`)}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default CustomerProfile;
