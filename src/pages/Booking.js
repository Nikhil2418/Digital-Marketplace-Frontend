import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';

const Booking = () => {
  const { id } = useParams();
  const [bookingDate, setBookingDate] = useState('');
  const [message, setMessage] = useState('');

  const handleBooking = async () => {
    try {
      const response = await api.post(`/bookings`, {
        serviceId: id,
        bookingDate,
      });
      setMessage('Booking successful!');
    } catch (error) {
      console.error("Error creating booking", error);
      setMessage('Failed to book the service.');
    }
  };

  return (
    <div className="container">
      <h1>Book Service</h1>
      <input
        type="date"
        value={bookingDate}
        onChange={(e) => setBookingDate(e.target.value)}
      />
      <button onClick={handleBooking}>Confirm Booking</button>
      <p>{message}</p>
    </div>
  );
};

export default Booking;
