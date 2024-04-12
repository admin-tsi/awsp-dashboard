import React from "react";

interface StarRatingProps {
  value: number;
}

const StarRating: React.FC<StarRatingProps> = ({ value }) => {
  const totalStars = 5;
  let ratingOutOfFive = value / 20;

  const fullStars = Math.floor(ratingOutOfFive);
  const halfStars = Math.ceil(ratingOutOfFive - fullStars);
  const emptyStars = totalStars - fullStars - halfStars;

  return (
    <div className="flex">
      {Array.from({ length: fullStars }, (_, i) => (
        <span
          key={`full-${i}`}
          role="img"
          aria-label="full star"
          className="text-primary"
        >
          &#9733;
        </span>
      ))}
      {Array.from({ length: halfStars }, (_, i) => (
        <span
          key={`half-${i}`}
          role="img"
          aria-label="half star"
          className="text-primary"
        >
          &#x272E;
        </span>
      ))}
      {Array.from({ length: emptyStars }, (_, i) => (
        <span key={`empty-${i}`} role="img" aria-label="empty star">
          &#9734;
        </span>
      ))}
    </div>
  );
};

export default StarRating;
