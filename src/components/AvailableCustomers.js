import React, { useEffect, useState } from 'react';

const AvailableCustomers = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      const response = await fetch('http://localhost:5000/api/customers');
      const data = await response.json();
      setCustomers(data);
    };

    fetchCustomers();
  }, []);

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Available Customers</h1>
      <ul className="space-y-4">
        {customers.map((customer) => (
          <li key={customer.id} className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-bold">{customer.name}</h2>
            <p>Email: {customer.email}</p>
            <p>Location: {customer.location}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AvailableCustomers;
