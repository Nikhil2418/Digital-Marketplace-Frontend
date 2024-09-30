import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProviderApplications = () => {
  const [applications, setApplications] = useState([]);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedApplicationId, setSelectedApplicationId] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(1);
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    // Fetch provider's applications from the backend API
    const fetchApplications = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/applications/provider', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setApplications(data);
        } else {
          console.error('Failed to fetch applications:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching applications:', error);
      }
    };

    fetchApplications();
  }, [token]);

  // Handle Payment for Completed Applications
  const handlePayment = async (applicationId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/applications/${applicationId}/payment-status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ paymentStatus: 'Paid', status: 'Paid' }),
      });

      if (response.ok) {
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

  // Handle Review Submission
  const handleReviewSubmit = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/applications/${selectedApplicationId}/review`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ reviewText, rating }),
      });

      if (response.ok) {
        alert('Review submitted successfully!');
        setReviewText('');
        setRating(1);
        setShowReviewModal(false);
        // Reload reviews for the application
        setReviews([...reviews, { reviewText, rating }]);
      } else {
        const errorData = await response.json();
        console.error('Failed to submit review:', errorData.message);
        alert(`Failed to submit review: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('An error occurred while submitting the review. Please try again.');
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
                {/* <th className="px-4 py-2 text-left">Rating</th> */}
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
                    <span className={`font-bold ${application.status === 'Completed' ? 'text-green-600' : 'text-gray-600'}`}>
                      {application.status === 'Payment Received' ? 'Paid' : application.status}
                    </span>
                  </td>
                  {/* <td className="px-4 py-2">{application.applicantId.averageRating || 'No Ratings'}</td> */}
                  <td className="px-4 py-2 flex items-center gap-4">
                    {/* Show Pay Now Button Only If Status is Completed and Payment Status is Unpaid */}
                    {application.status === 'Completed' && application.paymentStatus !== 'Paid' ? (
                      <button
                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-3 rounded-lg"
                        onClick={() => handlePayment(application._id)}
                      >
                        Pay Now
                      </button>
                    ) : application.paymentStatus === 'Paid' && (
                        <span className="text-gray-500">No Actions Available</span>
                      )}
                    
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
            <h2 className="text-2xl font-bold mb-4">Leave a Review for the Customer</h2>
            <textarea
              className="w-full border rounded-lg p-3 mb-4"
              placeholder="Write your review here..."
              rows="4"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
            ></textarea>
            <div className="mb-4">
              <label className="block mb-2 font-medium">Rating:</label>
              <select
                value={rating}
                onChange={(e) => setRating(parseInt(e.target.value))}
                className="border rounded-lg p-2"
              >
                {[1, 2, 3, 4, 5].map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-end space-x-4">
              <button
                className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg"
                onClick={() => setShowReviewModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
                onClick={handleReviewSubmit}
              >
                Submit Review
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProviderApplications;
