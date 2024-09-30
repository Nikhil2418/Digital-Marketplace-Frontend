import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditService = () => {
  const { id } = useParams(); // Get the service ID from the URL
  const [service, setService] = useState({
    title: '',
    description: '',
    skills: [],
    budget: '',
    country: '',
    duration: '',
    timeCommitment: ''
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the service details from the backend
  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/services/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const data = await response.json();
        if (response.ok) {
          // Populate the form fields with the fetched service data
          setService({
            title: data.title,
            description: data.description,
            skills: data.skills.join(', '),
            budget: data.budget,
            country: data.country,
            duration: data.duration,
            timeCommitment: data.timeCommitment,
          });
        } else {
          setError('Failed to load service details');
        }
      } catch (err) {
        setError('An error occurred while fetching the service');
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [id]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setService({ ...service, [name]: value });
  };

  // Handle form submission to update the service
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/services/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          ...service,
          skills: service.skills.split(',').map(skill => skill.trim()), // Convert skills back to an array
        }),
      });
      if (response.ok) {
        navigate('/provider-dashboard'); // Redirect to dashboard after successful update
      } else {
        alert('Failed to update service');
      }
    } catch (error) {
      console.error('Error updating service:', error);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Edit Service</h2>
      {loading ? (
        <p>Loading service details...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block">Service Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={service.title}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label htmlFor="description" className="block">Description</label>
            <textarea
              id="description"
              name="description"
              value={service.description}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
              rows="4"
            />
          </div>
          <div>
            <label htmlFor="skills" className="block">Skills Needed</label>
            <input
              type="text"
              id="skills"
              name="skills"
              value={service.skills}
              onChange={handleChange}
              placeholder="Enter skills separated by commas"
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label htmlFor="budget" className="block">Budget ($)</label>
            <input
              type="text"
              id="budget"
              name="budget"
              value={service.budget}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label htmlFor="country" className="block">Country</label>
            <input
              type="text"
              id="country"
              name="country"
              value={service.country}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label htmlFor="duration" className="block">Duration</label>
            <input
              type="text"
              id="duration"
              name="duration"
              value={service.duration}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label htmlFor="timeCommitment" className="block">Time Commitment</label>
            <input
              type="text"
              id="timeCommitment"
              name="timeCommitment"
              value={service.timeCommitment}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Update Service
          </button>
        </form>
      )}
    </div>
  );
};

export default EditService;
