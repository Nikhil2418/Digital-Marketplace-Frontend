import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('customer');
  const [userId, setUserId] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, userType }),
      });

      const data = await response.json();
      console.log(data);
      if (response.ok) {
        // Save the token and user type in localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('userType', userType); // Store user type for role-based routing
        localStorage.setItem('userId', data.user.id); // Save the user ID for profile access
        localStorage.setItem('userName', data.user.name); // Save the user name for display
        setUserId(data.user.id);

        // Check if the profile is complete
        if (userType === 'customer') {
          // checkCustomerProfileCompletion(userId);
          navigate('/customer-dashboard'); // Customers navigate to their dashboard
        } else {
          navigate('/provider-dashboard'); // Service providers navigate to their dashboard
        }
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('Something went wrong. Please try again.');
    }
  };

  // Check if the customer profile is complete
  const checkCustomerProfileCompletion = async (userId) => {
    console.log('Checking profile completion...',userId);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/customer-profiles/${localStorage.getItem('userId')}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      });

      if (response.ok) {
        const profile = await response.json();

        // Check if mandatory fields are filled
        if (!profile.name || !profile.hourlyRate || !profile.availability) {
          navigate(`/customer-profile/edit/${userId}`);
        } else {
          navigate('/hire'); // Redirect to a customer-specific page if profile is complete
        }
      }
    } catch (error) {
      console.error('Error checking profile completion:', error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-6">Login to Your Account</h2>

        {/* Error Message */}
        {error && <div className="text-red-600 text-center mb-4">{error}</div>}

        <form onSubmit={handleLogin} className="space-y-6">
          {/* Email Input */}
          <div>
            <label className="block text-gray-700 font-semibold">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-gray-700 font-semibold">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* User Type Radio Buttons */}
          <div>
            <label className="block text-gray-700 font-semibold">User Type</label>
            <div className="flex items-center mt-2 space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="userType"
                  value="customer"
                  checked={userType === 'customer'}
                  onChange={(e) => setUserType(e.target.value)}
                  className="form-radio h-4 w-4 text-blue-600"
                />
                <span className="ml-2">Customer</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="userType"
                  value="service-provider"
                  checked={userType === 'service-provider'}
                  onChange={(e) => setUserType(e.target.value)}
                  className="form-radio h-4 w-4 text-blue-600"
                />
                <span className="ml-2">Service Provider</span>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-bold transition duration-300"
          >
            Login
          </button>
        </form>

        {/* Registration Link */}
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <Link to="/register" className="text-blue-600 hover:underline">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
