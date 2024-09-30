import React, { useState } from 'react';

const CustomerServiceStatus = ({ serviceId, currentStatus }) => {
  const [status, setStatus] = useState(currentStatus);

  const handleMarkCompleted = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/services/status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ serviceId, status: 'Completed' }),
      });

      if (response.ok) {
        setStatus('Completed');
        alert('Service marked as completed');
      }
    } catch (error) {
      console.error('Error updating service status:', error);
    }
  };

  return (
    <div>
      <h2>Current Status: {status}</h2>
      {status === 'In Progress' && (
        <button
          onClick={handleMarkCompleted}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
        >
          Mark as Completed
        </button>
      )}
    </div>
  );
};

export default CustomerServiceStatus;
