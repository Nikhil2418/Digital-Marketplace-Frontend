import React from 'react';

const Review = ({ review }) => {
  return (
    <div className="review">
      <h4>{review.user.name}</h4>
      <p>Rating: {review.rating}/5</p>
      <p>{review.comment}</p>
    </div>
  );
};

export default Review;
