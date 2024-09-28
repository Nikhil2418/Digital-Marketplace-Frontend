import React from 'react';
import { Link } from 'react-router-dom';

const ServiceCard = ({ service }) => {
  return (
    <div className="service-card">
      <h3>{service.title}</h3>
      <p>Price: ${service.price}</p>
      <Link to={`/services/${service._id}`}>View Details</Link>
    </div>
  );
};

export default ServiceCard;
