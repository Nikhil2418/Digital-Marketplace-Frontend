import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ServiceForm = () => {
  const { id } = useParams(); // Get the service ID from the URL, if available
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [service, setService] = useState({
    title: '',
    description: '',
    skills: '',
    budget: '',
    country: '',
    duration: '',
    timeCommitment: '',
    level: 'Intermediate' // Default level set to "Intermediate"
  });

  useEffect(() => {
    if (id) {
      setLoading(true);
      fetch(`http://localhost:5000/api/services/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setService({
            title: data.title,
            description: data.description,
            skills: data.skills.join(', '),
            budget: data.budget,
            country: data.country,
            duration: data.duration,
            timeCommitment: data.timeCommitment,
            level: data.level || 'Intermediate', // If no level is found, default to "Intermediate"
          });
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error loading service data:', error);
          setLoading(false);
        });
    }
  }, [id, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setService({ ...service, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const requestUrl = id
      ? `http://localhost:5000/api/services/${id}`
      : 'http://localhost:5000/api/services/create';
    const requestMethod = id ? 'PUT' : 'POST';

    try {
      const response = await fetch(requestUrl, {
        method: requestMethod,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...service,
          skills: service.skills.split(',').map((skill) => skill.trim()), // Convert skills string back to array
        }),
      });

      if (response.ok) {
        navigate('/provider-dashboard');
      } else {
        console.error('Failed to save service');
      }
    } catch (error) {
      console.error('Error saving service:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="w-full max-w-2xl p-8 bg-white shadow-lg rounded-lg space-y-6">
        <h2 className="text-3xl font-extrabold text-gray-800 text-center">
          {id ? 'Edit Service' : 'Create New Service'}
        </h2>
        <p className="text-center text-gray-500 mb-6">Provide detailed information about the service you're offering.</p>
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-1">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">Service Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={service.title}
                onChange={handleChange}
                required
                className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="col-span-1">
              <label htmlFor="budget" className="block text-sm font-medium text-gray-700">Budget ($)</label>
              <input
                type="text"
                id="budget"
                name="budget"
                value={service.budget}
                onChange={handleChange}
                required
                className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="col-span-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                id="description"
                name="description"
                value={service.description}
                onChange={handleChange}
                required
                className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows="5"
              ></textarea>
            </div>
            <div className="col-span-1">
              <label htmlFor="skills" className="block text-sm font-medium text-gray-700">Skills Needed</label>
              <input
                type="text"
                id="skills"
                name="skills"
                value={service.skills}
                onChange={handleChange}
                placeholder="Enter skills separated by commas"
                className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="col-span-1">
              <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
              <input
                type="text"
                id="country"
                name="country"
                value={service.country}
                onChange={handleChange}
                required
                className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="col-span-1">
              <label htmlFor="duration" className="block text-sm font-medium text-gray-700">Duration</label>
              <input
                type="text"
                id="duration"
                name="duration"
                value={service.duration}
                onChange={handleChange}
                required
                className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="col-span-1">
              <label htmlFor="timeCommitment" className="block text-sm font-medium text-gray-700">Time Commitment</label>
              <input
                type="text"
                id="timeCommitment"
                name="timeCommitment"
                value={service.timeCommitment}
                onChange={handleChange}
                required
                className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            {/* New Level Field */}
            <div className="col-span-2">
              <label htmlFor="level" className="block text-sm font-medium text-gray-700">Service Level</label>
              <select
                id="level"
                name="level"
                value={service.level}
                onChange={handleChange}
                required
                className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Expert">Expert</option>
              </select>
            </div>
          </div>
        )}
        <div className="flex justify-center">
          <button
            type="submit"
            className="w-full md:w-1/2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50"
          >
            {id ? 'Update Service' : 'Create Service'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ServiceForm;
