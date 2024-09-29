import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const userType = localStorage.getItem('userType'); // Get user role (customer or service-provider)
  const isAuthenticated = localStorage.getItem('token') ? true : false;
  const userId = localStorage.getItem('userId'); // Get user ID for profile navigation
  const userName = localStorage.getItem('userName') || 'User'; // Optionally, store username

  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    localStorage.removeItem('userName');
    localStorage.removeItem('userId');
    navigate('/login');
  };

  const handleViewProfile = () => {
    // Navigate to the appropriate profile page based on user type
    if (userType === 'customer') {
      navigate(`/customer-profile/${userId}`);
    } else if (userType === 'service-provider') {
      navigate(`/service-provider-profile/${userId}`);
    }
    setShowDropdown(false);
  };

  return (
    <nav className="bg-gray-800 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Branding */}
        <div className="text-xl font-bold">
          <Link to="/">Digital Marketplace</Link>
        </div>

        {/* Navigation Links */}
        <div className="flex space-x-6 text-lg items-center">
          <Link to="/">Home</Link>

          {/* Show "Hire" link only for customers */}
          {userType === 'customer' &&  <Link to="/find-work">Find Work</Link> }

          {/* Show "Find Work" link only for service providers */}
          {userType === 'service-provider' && <Link to="/hire">Hire</Link>}

          {/* Profile and Logout Section (Show if logged in) */}
          {isAuthenticated ? (
            <div className="relative">
              {/* Profile Icon */}
              <div
                className="flex items-center cursor-pointer"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                {/* Placeholder Profile Picture */}
                <img
                  src="https://via.placeholder.com/30"
                  alt="Profile"
                  className="w-8 h-8 rounded-full border border-gray-300"
                />
                <span className="ml-2">{userName}</span>
                <svg
                  className="w-4 h-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>

              {/* Dropdown Menu */}
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 text-gray-700 z-10">
                  <button
                    className="block px-4 py-2 hover:bg-gray-100 text-left w-full"
                    onClick={handleViewProfile}
                  >
                    View Profile
                  </button>
                  <Link
                    to="/settings"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setShowDropdown(false)}
                  >
                    Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block px-4 py-2 text-left w-full hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            // Show Login Link if not authenticated
            <Link to="/login">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
