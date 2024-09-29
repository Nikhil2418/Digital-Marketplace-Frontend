import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  // Retrieve user from localStorage or Context (for authentication state)
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${user.token}`,
        },
      });

      if (response.ok) {
        // Clear user info from localStorage
        localStorage.removeItem('user');
        // Redirect to login page
        navigate('/login');
      } else {
        console.error('Failed to logout');
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center">
      <Link to="/" className="text-white text-xl font-bold">AppName</Link>
      
      <div className="flex items-center space-x-4">
        {user ? (
          <>
            {/* Show Profile Icon if logged in */}
            <div className="flex items-center space-x-2">
              <span className="text-white">Hello, {user.email}</span>
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded-lg"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Show Login/Register buttons if not logged in */}
            <Link to="/login" className="text-white hover:text-blue-400">Login</Link>
            <Link to="/register" className="text-white hover:text-blue-400">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
