import React from 'react';
import { useNavigate } from 'react-router-dom';

const CustomerDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Welcome to Your Dashboard!</h1>
      <p className="text-lg text-center mb-8">Manage your applications, find services, and update your profile.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Manage Applications Card */}
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
          <h2 className="text-2xl font-bold mb-2">Manage Applications</h2>
          <p className="text-gray-700 mb-4">View and manage all the services you have applied for.</p>
          <button
            onClick={() => navigate('/customer/applications')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
          >
            Go to Applications
          </button>
        </div>

        {/* Find Services Card */}
        {/* <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
          <h2 className="text-2xl font-bold mb-2">Find Services</h2>
          <p className="text-gray-700 mb-4">Browse and find services that match your needs and requirements.</p>
          <button
            onClick={() => navigate('/available-services')}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg"
          >
            Browse Services
          </button>
        </div> */}

        {/* Profile Settings Card */}
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
          <h2 className="text-2xl font-bold mb-2">Profile Settings</h2>
          <p className="text-gray-700 mb-4">View or update your profile information and manage your account settings.</p>
          <button
            onClick={() => navigate(`/customer-profile/edit/${localStorage.getItem('userId')}`)}
            className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-lg"
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
