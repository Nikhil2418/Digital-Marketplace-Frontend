import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditServiceProviderProfile = () => {
  const [profile, setProfile] = useState({
    companyName: '',
    description: '',
    skills: [],
    location: '',
    languages: [],
    timeZone: '',
  });
  const { userId } = useParams(); // Retrieve userId from the route parameter
  const navigate = useNavigate();
  const token = localStorage.getItem('token'); // Retrieve token for authentication

  useEffect(() => {
    // Fetch the current profile data to populate the form fields
    const fetchProfile = async () => {
      try {
        const response = await fetch(`https://digital-marketplace-backend-production.up.railway.app/api/profile/service-provider/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setProfile({
            companyName: data.companyName || '',
            description: data.description || '',
            skills: data.skills || [],
            location: data.location || '',
            languages: data.languages || [],
            timeZone: data.timeZone || '',
          });
        } else {
          console.error('Error fetching profile:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, [userId, token]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  // Handle skills and languages input separately as arrays
  const handleArrayChange = (e, field) => {
    setProfile({ ...profile, [field]: e.target.value.split(',').map(item => item.trim()) });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://digital-marketplace-backend-production.up.railway.app/api/profile/service-provider/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(profile),
      });

      if (response.ok) {
        alert('Profile updated successfully!');
        navigate(`/service-provider-profile/${userId}`);
      } else {
        console.error('Error updating profile:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="w-full max-w-2xl bg-white p-8 shadow-lg rounded-lg space-y-6">
        <h2 className="text-3xl font-bold text-gray-800 text-center">Edit Service Provider Profile</h2>

        {/* Company Name */}
        <div>
          <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
            Company Name
          </label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            value={profile.companyName}
            onChange={handleChange}
            className="w-full mt-2 p-3 border border-gray-300 rounded-lg"
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={profile.description}
            onChange={handleChange}
            className="w-full mt-2 p-3 border border-gray-300 rounded-lg"
            rows="5"
          ></textarea>
        </div>

        {/* Skills */}
        {/* <div>
          <label htmlFor="skills" className="block text-sm font-medium text-gray-700">
            Skills (comma separated)
          </label>
          <input
            type="text"
            id="skills"
            name="skills"
            value={profile.skills.join(', ')}
            onChange={(e) => handleArrayChange(e, 'skills')}
            placeholder="Enter skills separated by commas"
            className="w-full mt-2 p-3 border border-gray-300 rounded-lg"
          />
        </div> */}

        {/* Languages */}
        <div>
          <label htmlFor="languages" className="block text-sm font-medium text-gray-700">
            Languages (comma separated)
          </label>
          <input
            type="text"
            id="languages"
            name="languages"
            value={profile.languages.join(', ')}
            onChange={(e) => handleArrayChange(e, 'languages')}
            placeholder="Enter languages separated by commas"
            className="w-full mt-2 p-3 border border-gray-300 rounded-lg"
          />
        </div>

        {/* Location */}
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={profile.location}
            onChange={handleChange}
            className="w-full mt-2 p-3 border border-gray-300 rounded-lg"
          />
        </div>

        {/* Time Zone */}
        <div>
          <label htmlFor="timeZone" className="block text-sm font-medium text-gray-700">
            Time Zone
          </label>
          <input
            type="text"
            id="timeZone"
            name="timeZone"
            value={profile.timeZone}
            onChange={handleChange}
            className="w-full mt-2 p-3 border border-gray-300 rounded-lg"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="w-full md:w-1/2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditServiceProviderProfile;
