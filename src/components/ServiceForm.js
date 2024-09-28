import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ServiceForm = () => {
  const { id } = useParams(); // For editing
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      // Fetch existing service for editing
      fetch(`/api/services/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setTitle(data.title);
          setDescription(data.description);
          setCategory(data.category);
          setPrice(data.price);
        })
        .catch((err) => setError('Failed to load service data'));
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serviceData = { title, description, category, price };

    try {
      const response = await fetch(id ? `/api/services/${id}` : '/api/services', {
        method: id ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(serviceData),
      });

      const data = await response.json();
      if (response.ok) {
        navigate('/services'); // Redirect to service list
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('Failed to save service');
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold mb-4">{id ? 'Edit' : 'Create'} Service</h2>

      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Service Title"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Service Description"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700">Category</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Service Category"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700">Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Service Price"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold"
        >
          {id ? 'Update' : 'Create'} Service
        </button>
      </form>
    </div>
  );
};

export default ServiceForm;
