import React, { useEffect, useState } from 'react';
import api from '../api';
import ServiceCard from '../components/ServiceCard';

const Home = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await api.get('/services');
        setServices(response.data);
      } catch (error) {
        console.error("Error fetching services", error);
      }
    };
    fetchServices();
  }, []);

  return (
    <div className="container">
      <h1>Available Services</h1>
      <div className="service-list">
        {services.map(service => (
          <ServiceCard key={service._id} service={service} />
        ))}
      </div>
    </div>
  );
};

export default Home;
