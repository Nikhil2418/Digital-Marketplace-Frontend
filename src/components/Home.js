import React, { useEffect, useState } from 'react';
import api from '../api';

const Home = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      const response = await api.get('/services');
      setServices(response.data);
    };
    
    fetchServices();
  }, []);

  return (
    <div>
      <h1>Available Services</h1>
      <ul>
        {services.map(service => (
          <li key={service._id}>
            {service.title} - ${service.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
