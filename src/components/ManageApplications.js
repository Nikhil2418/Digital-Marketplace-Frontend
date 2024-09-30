import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ManageApplications = () => {
  const [applications, setApplications] = useState([]); // State to store applications
  const [showReviewModal, setShowReviewModal] = useState(false); // State to show/hide the review modal
  const [selectedApplicationId, setSelectedApplicationId] = useState(''); // State for the currently selected application
  const [reviewText, setReviewText] = useState(''); // State for review text
  const [rating, setRating] = useState(1); // Default rating
  const navigate = useNavigate();
  const token = localStorage.getItem('token'); // Get token for authentication
  const userId = localStorage.getItem('userId'); // Get logged-in user's ID

  useEffect(() => {
    // Fetch the logged-in user's applications
    const fetchApplications = async () => {
      try {
        const response = await fetch(`https://digital-marketplace-backend-production.up.railway.app/api/applications/user/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // Include token for authentication
          },
        });

        if (response.ok) {
          const data = await response.json();
          setApplications(data); // Store applications in state
        } else {
          console.error('Failed to fetch applications:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching applications:', error);
      }
    };

    fetchApplications(); // Fetch applications on component load
  }, [token, userId]);

  // Handle delete button click
  const handleDelete = async (applicationId) => {
    try {
      const response = await fetch(`https://digital-marketplace-backend-production.up.railway.app/api/applications/${applicationId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Include token for authentication
        },
      });

      if (response.ok) {
        alert('Application deleted successfully!');
        setApplications(applications.filter((app) => app._id !== applicationId)); // Remove deleted application from state
      } else {
        const errorData = await response.json();
        console.error('Failed to delete application:', errorData.message);
        alert(`Failed to delete application: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error deleting application:', error);
      alert('An error occurred while deleting the application. Please try again.');
    }
  };

  // Handle status update button click
  const handleStatusUpdate = async (applicationId, newStatus) => {
    try {
      const response = await fetch(`https://digital-marketplace-backend-production.up.railway.app/api/applications/${applicationId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        alert('Application status updated successfully!');
        setApplications(
          applications.map((app) =>
            app._id === applicationId ? { ...app, status: newStatus } : app
          )
        );
      } else {
        const errorData = await response.json();
        console.error('Failed to update application status:', errorData.message);
        alert(`Failed to update application status: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error updating application status:', error);
      alert('An error occurred while updating the application status. Please try again.');
    }
  };

  // Handle review submission
  const handleReviewSubmit = async () => {
    try {
      const response = await fetch(`https://digital-marketplace-backend-production.up.railway.app/api/applications/${selectedApplicationId}/review`, {
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
      <h1 className="text-3xl font-bold text-center mb-6">Manage Your Applications</h1>
      {applications.length === 0 ? (
        <p className="text-center text-gray-600">You haven't applied for any services yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full bg-white shadow-md rounded-lg border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">Service Title</th>
                <th className="px-4 py-2 text-left">Service Provider</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Payment Status</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((application) => (
                <tr key={application._id} className="border-b">
                  <td className="px-4 py-2">{application.serviceId?.title}</td>
                  <td className="px-4 py-2">{application.serviceProviderId?.name}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`font-bold ${
                        application.status === 'Completed' || application.status === 'Payment Received'
                          ? 'text-green-600'
                          : 'text-gray-600'
                      }`}
                    >
                      {application.status}
                    </span>
                  </td>
                  {/* Display Payment Status */}
                  <td className="px-4 py-2">
                    <span
                      className={`font-bold ${
                        application.status === 'Payment Received' ? 'text-green-600' : 'text-gray-600'
                      }`}
                    >
                      {application.status === 'Payment Received' ? 'Paid' : 'Unpaid'}
                    </span>
                  </td>
                  <td className="px-4 py-2 flex items-center gap-4">
                    {/* Delete Button */}
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white py-1 px-3 rounded-lg"
                      onClick={() => handleDelete(application._id)}
                      disabled={application.status === 'Payment Received'}
                    >
                      Delete
                    </button>

                    {/* Leave Review Button for Completed Applications */}
                    {/* {(application.status === 'Completed' || application.status === 'Payment Received') && (
                      <button
                        className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-3 rounded-lg"
                        onClick={() => {
                          setSelectedApplicationId(application._id);
                          setShowReviewModal(true);
                        }}
                      >
                        Leave Review
                      </button>
                    )} */}

                    {/* Status Dropdown - Disable if Status is Completed or Payment Received */}
                    <select
                      value={application.status}
                      onChange={(e) => handleStatusUpdate(application._id, e.target.value)}
                      className="py-1 px-3 border rounded-lg"
                      disabled={
                        application.status === 'Completed' || application.status === 'Payment Received'
                      }
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                      <option value="Payment Received">Payment Received</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
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
            <h2 className="text-2xl font-bold mb-4">Leave a Review</h2>
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

export default ManageApplications;
