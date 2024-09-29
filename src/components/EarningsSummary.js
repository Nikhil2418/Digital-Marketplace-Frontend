import React from 'react';

const EarningsSummary = () => {
  const earnings = {
    currentMonth: 25000,
    lastMonth: 23000,
    pendingPayments: 5000,
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Earnings Summary</h3>
      <ul>
        <li>Total Earnings This Month: ₹{earnings.currentMonth}</li>
        <li>Total Earnings Last Month: ₹{earnings.lastMonth}</li>
        <li>Pending Payments: ₹{earnings.pendingPayments}</li>
      </ul>
    </div>
  );
};

export default EarningsSummary;
