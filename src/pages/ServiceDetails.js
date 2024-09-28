import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';

const ServiceDetails = () => {
  const { id } = useParams();
  const [service, setService] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServiceDetails = async () => {
      try {
        const response = await api.get(`/services/${id}`);
        setService(response.data);
      } catch (error) {
        console.error("Error fetching service details", error);
      }
    };
    fetchServiceDetails();
  }, [id]);

  const handleBookNow = () => {
    navigate(`/booking/${id}`);
  };

  return (
    <div className="container">
      <h1>{service.title}</h1>
      <p>{service.description}</p>
      <p>Price: ${service.price}</p>
      <button onClick={handleBookNow}>Book Now</button>
    </div>
  );
};

export default ServiceDetails;
