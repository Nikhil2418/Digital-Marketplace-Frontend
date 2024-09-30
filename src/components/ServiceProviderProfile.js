import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ServiceProviderProfile = () => {
  const [customer, setCustomer] = useState(null); // State to store customer data
  const [reviews, setReviews] = useState([]); // State to store reviews
  const [reviewText, setReviewText] = useState(''); // State to manage new review text
  const [rating, setRating] = useState(1);
  const [provider, setProvider] = useState(null); // State to store provider data
  const navigate = useNavigate();
  const loggedInUserId = localStorage.getItem('userId'); // Retrieve the user ID from localStorage
  const token = localStorage.getItem('token'); // Retrieve token for authentication

  // get id from url 
  const url = window.location.href;
  const userId = url.substring(url.lastIndexOf('/') + 1); 

  useEffect(() => {
    // Fetch service provider profile using user ID
    const fetchProviderProfile = async () => {
      try {
        const response = await fetch(`https://digital-marketplace-backend-production.up.railway.app/api/profile/service-provider/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setProvider(data); // Set the provider data
        } else {
          console.error('Error fetching profile:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProviderProfile();
  }, [loggedInUserId, token]);


  const handleReviewSubmit = async () => {
    try {
      const response = await fetch(`https://digital-marketplace-backend-production.up.railway.app/api/reviews/service-provider/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ reviewText, rating }),
      });
      console.log(response);

      if (response.ok) {
        const newReview = await response.json();
        setReviews([...reviews, newReview]); // Add new review to the existing reviews
        setReviewText(''); // Reset review text
        setRating(1); // Reset rating to 1
        alert('Review submitted successfully!');
      } else {
        alert('Failed to submit review.');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };
  // Display loading state if data is not yet available
  if (!provider) return <p>Loading profile...</p>;

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-4xl mx-auto py-8 px-4">
        {/* Profile Header Section */}
        <div className="flex items-center space-x-6 mb-8">
          <img
            src={provider.profilePicture || 'https://via.placeholder.com/150'}
            alt="Profile"
            className="w-32 h-32 rounded-full border border-gray-300 shadow-lg"
          />
          <div>
            <h1 className="text-3xl font-bold text-gray-800">{provider.name || provider.userId.name}</h1>
            <p className="text-gray-500">{provider.location}</p>
            <p className="text-gray-700 font-medium mt-2">{provider.companyName || 'N/A'}</p>
            {/* Average Rating */}
            <p className="text-yellow-500 mt-2">
              Rating: {provider.averageRating?.toFixed(2) || 'No ratings yet'}
            </p>
          </div>
        </div>

        {/* About Me Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-xl font-bold mb-4">About Me</h2>
          <p className="text-gray-700">{provider.description || 'No description provided'}</p>
        </div>

        {/* Skills Section */}
        {/* <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-xl font-bold mb-4">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {provider.skills?.length > 0 ? (
              provider.skills.map((skill, index) => (
                <span
                  key={index}
                  className="inline-block bg-gray-200 text-gray-700 py-1 px-3 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))
            ) : (
              <p>No skills provided.</p>
            )}
          </div>
        </div> */}

        {/* Languages Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-xl font-bold mb-4">Languages</h2>
          <p>{provider.languages?.join(', ') || 'No languages specified'}</p>
        </div>

        {/* Reviews Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-xl font-bold mb-4">Reviews</h2>
          {provider.reviews?.length > 0 ? (
            provider.reviews.map((review, index) => (
              <div key={index} className="mb-4">
                <p className="font-medium">Rating: {review.rating}/5</p>
                <p className="text-gray-700">{review.reviewText}</p>
                <p className="text-gray-500">Reviewed by: {review.reviewedBy?.name || 'Anonymous'}</p>
              </div>
            ))
          ) : (
            <p>No reviews yet.</p>
          )}
        </div>

        {loggedInUserId != userId && <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-xl font-bold mb-4">Leave a Review</h2>
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
        <button
          onClick={handleReviewSubmit}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
        >
          Submit Review
        </button>
      </div>}

        {/* Edit Profile Button */}
        {loggedInUserId === userId && <div className="flex justify-end">
          <button
            onClick={() => navigate(`/service-provider-profile/edit/${loggedInUserId}`)}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
          >
            Edit Profile
          </button>
        </div>}
      </div>
    </div>
  );
};

export default ServiceProviderProfile;
