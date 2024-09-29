import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProviderApplications = () => {
  const [applications, setApplications] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('token'); // Retrieve token for authentication

  useEffect(() => {
    // Fetch provider's applications from the backend API
    const fetchApplications = async () => {
      try {
        const response = await fetch('https://digital-marketplace-backend-production.up.railway.app/api/applications/provider', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setApplications(data); // Store the fetched applications in state
        } else {
          console.error('Failed to fetch applications:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching applications:', error);
      }
    };

    fetchApplications(); // Fetch applications on component load
  }, [token]);

  // Handle Payment for Completed Applications
  const handlePayment = async (applicationId) => {
    try {
      const response = await fetch(`https://digital-marketplace-backend-production.up.railway.app/api/applications/${applicationId}/payment-status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ paymentStatus: 'Paid', status: 'Paid' }), // Update both status and paymentStatus to Paid
      });

      if (response.ok) {
        // Update the state to reflect the new payment status
        setApplications(
          applications.map((app) =>
            app._id === applicationId ? { ...app, paymentStatus: 'Paid', status: 'Paid' } : app
          )
        );
        alert('Payment successful!');
      } else {
        const errorData = await response.json();
        console.error('Failed to update payment status:', errorData.message);
        alert(`Failed to update payment status: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error updating payment status:', error);
      alert('An error occurred while processing the payment. Please try again.');
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-center mb-6">Your Service Applications</h1>
      {applications.length === 0 ? (
        <p className="text-center text-gray-600">No applications available for your services.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full bg-white shadow-md rounded-lg border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">Service Title</th>
                <th className="px-4 py-2 text-left">Applicant Name</th>
                <th className="px-4 py-2 text-left">Applicant Email</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((application) => (
                <tr key={application._id} className="border-b">
                  <td className="px-4 py-2">{application.serviceId.title}</td>
                  <td className="px-4 py-2">{application.applicantId.name}</td>
                  <td className="px-4 py-2">{application.applicantId.email}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`font-bold ${application.status === 'Completed' ? 'text-green-600' : 'text-gray-600'}`}
                    >
                      {application.status}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    {/* Show Pay Now Button Only If Status is Completed and Payment Status is Unpaid */}
                    {application.status === 'Completed' && application.paymentStatus !== 'Paid' ? (
                      <button
                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-3 rounded-lg"
                        onClick={() => handlePayment(application._id)}
                      >
                        Pay Now
                      </button>
                    ) : (
                      <span className="text-gray-500">No Actions Available</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProviderApplications;
