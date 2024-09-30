import React, { useState } from 'react';

const ServiceProviderPayment = ({ serviceId, currentStatus }) => {
  const [status, setStatus] = useState(currentStatus);

  const handleMarkAsPaid = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/services/mark-paid', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ serviceId }),
      });

      if (response.ok) {
        setStatus('Paid');
        alert('Service marked as paid');
      }
    } catch (error) {
      console.error('Error marking service as paid:', error);
    }
  };

  return (
    <div>
      <h2>Current Status: {status}</h2>
      {status === 'Completed' && (
        <button
          onClick={handleMarkAsPaid}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg"
        >
          Mark as Paid
        </button>
      )}
    </div>
  );
};

export default ServiceProviderPayment;
