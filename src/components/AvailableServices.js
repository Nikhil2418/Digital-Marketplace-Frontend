import React, { useEffect, useState } from 'react';

const AvailableServices = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      const response = await fetch('http://localhost:5000/api/services');
      const data = await response.json();
      setServices(data);
    };

    fetchServices();
  }, []);

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Available Services</h1>
      <ul className="space-y-4">
        {services.map((service) => (
          <li key={service.id} className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-bold">{service.title}</h2>
            <p>Description: {service.description}</p>
            <p>Price: ₹{service.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AvailableServices;
