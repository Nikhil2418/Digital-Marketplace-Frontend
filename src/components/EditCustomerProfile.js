import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditCustomerProfile = () => {
  const { id } = useParams(); // Get user ID from URL params
  const navigate = useNavigate();
  const token = localStorage.getItem('token'); // Get the token from local storage
  const [profile, setProfile] = useState({
    name: '',
    location: '',
    summary: '',
    hourlyRate: '',
    availability: '',
    languages: '',
    skills: [], // Array for skills
    education: {
      institution: '',
      degree: '',
      fieldOfStudy: '',
      startYear: '',
      endYear: '',
    },
    linkedAccounts: [], // Array for linked accounts
  });

  useEffect(() => {
    // Fetch the existing profile data
    const fetchProfile = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/customer-profiles/${id}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        });
        const data = await response.json();
        if (response.ok) {
          setProfile(data); // Preload the data into the form
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
    fetchProfile();
  }, [id, token]);

  // Handle simple input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  // Handle array-based fields like skills
  const handleArrayChange = (index, event, arrayName) => {
    const newArray = [...profile[arrayName]];
    newArray[index] = event.target.value;
    setProfile({ ...profile, [arrayName]: newArray });
  };

  // Handle addition of a new skill
  const handleAddSkill = () => {
    setProfile({ ...profile, skills: [...profile.skills, ''] });
  };

  // Handle linked accounts change
  const handleLinkedAccountsChange = (index, event, field) => {
    const newLinkedAccounts = [...profile.linkedAccounts];
    newLinkedAccounts[index] = { ...newLinkedAccounts[index], [field]: event.target.value };
    setProfile({ ...profile, linkedAccounts: newLinkedAccounts });
  };

  // Handle addition of a new linked account
  const handleAddLinkedAccount = () => {
    setProfile({ ...profile, linkedAccounts: [...profile.linkedAccounts, { name: '', url: '' }] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/customer-profiles/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(profile),
      });
      if (response.ok) {
        alert('Profile updated successfully!');
        navigate(`/customer-profile/${id}`); // Navigate back to the profile view page
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-3xl font-bold mb-6">Edit Customer Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-lg">
        <div>
          <label className="block text-gray-700">Name:</label>
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Location:</label>
          <input
            type="text"
            name="location"
            value={profile.location}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          />
        </div>
        <div>
          <label className="block text-gray-700">Summary:</label>
          <textarea
            name="summary"
            value={profile.summary}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          />
        </div>
        <div>
          <label className="block text-gray-700">Hourly Rate ($/hr):</label>
          <input
            type="number"
            name="hourlyRate"
            value={profile.hourlyRate}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Availability:</label>
          <input
            type="text"
            name="availability"
            value={profile.availability}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            required
          />
        </div>

        {/* Skills Section */}
        <div>
          <label className="block text-gray-700">Skills:</label>
          {profile.skills.map((skill, index) => (
            <div key={index} className="flex items-center space-x-2 mb-2">
              <input
                type="text"
                value={skill}
                onChange={(e) => handleArrayChange(index, e, 'skills')}
                className="w-full p-2 border rounded-lg"
              />
            </div>
          ))}
          <button type="button" onClick={handleAddSkill} className="bg-blue-500 text-white py-2 px-4 rounded-lg">
            Add Skill
          </button>
        </div>

        {/* Education Section */}
        <div>
          <h3 className="text-xl font-bold mt-4">Education (Highest Degree Only):</h3>
          <label className="block text-gray-700">Institution:</label>
          <input
            type="text"
            name="institution"
            value={profile.education.institution}
            onChange={(e) => setProfile({ ...profile, education: { ...profile.education, institution: e.target.value } })}
            className="w-full p-2 border rounded-lg"
          />
          <label className="block text-gray-700 mt-2">Degree:</label>
          <input
            type="text"
            name="degree"
            value={profile.education.degree}
            onChange={(e) => setProfile({ ...profile, education: { ...profile.education, degree: e.target.value } })}
            className="w-full p-2 border rounded-lg"
          />
        </div>

        {/* Linked Accounts Section */}
        <div>
          <h3 className="text-xl font-bold mt-4">Linked Accounts:</h3>
          {profile.linkedAccounts.map((account, index) => (
            <div key={index} className="space-y-2 mb-4">
              <label>Platform Name:</label>
              <input
                type="text"
                value={account.name}
                onChange={(e) => handleLinkedAccountsChange(index, e, 'name')}
                className="w-full p-2 border rounded-lg"
              />
              <label>URL:</label>
              <input
                type="text"
                value={account.url}
                onChange={(e) => handleLinkedAccountsChange(index, e, 'url')}
                className="w-full p-2 border rounded-lg"
              />
            </div>
          ))}
          <button type="button" onClick={handleAddLinkedAccount} className="bg-blue-500 text-white py-2 px-4 rounded-lg">
            Add Linked Account
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-bold"
        >
          Save Profile
        </button>
      </form>
    </div>
  );
};

export default EditCustomerProfile;
