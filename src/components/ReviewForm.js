import React, { useState } from 'react';

const ReviewForm = ({ profileType, profileId }) => {
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(1);
  const token = localStorage.getItem('token');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`https://digital-marketplace-backend-production.up.railway.app/api/reviews/${profileType}/${profileId}`, {
        method: 'POST',
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
      } else {
        const errorData = await response.json();
        alert(`Failed to submit review: ${errorData.message}`);
      }
    } catch (error) {
      alert('An error occurred while submitting the review. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-1/2 mx-auto">
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
      <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg">
        Submit Review
      </button>
    </form>
  );
};

export default ReviewForm;
