import React from 'react';

const BookingList = () => {
  const bookings = [
    { id: 1, customerName: 'John Doe', service: 'Plumbing', date: '2024-10-05', status: 'Pending' },
    { id: 2, customerName: 'Jane Smith', service: 'Electrical Work', date: '2024-10-07', status: 'Completed' },
    // Add more bookings here
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Your Bookings</h3>
      <table className="w-full text-left">
        <thead>
          <tr>
            <th className="pb-2">Customer</th>
            <th className="pb-2">Service</th>
            <th className="pb-2">Date</th>
            <th className="pb-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id}>
              <td className="pb-2">{booking.customerName}</td>
              <td className="pb-2">{booking.service}</td>
              <td className="pb-2">{booking.date}</td>
              <td className="pb-2">{booking.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingList;
