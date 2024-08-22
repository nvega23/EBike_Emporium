import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import regularStarIcon from '../../assets/blackStar.png';
import solidStarIcon from '../../assets/goldStar.png';
import goldOutline from '../../assets/goldOutline.png';
import './StarReview.css';

const StarReview = ({ rating, setRating }) => {
  const [hoverRating, setHoverRating] = useState(0);
  const location = useLocation(); 

  const isEditable = location.pathname.includes('/review/update') || location.pathname.includes('/review/new');

  const handleMouseEnter = (index) => {
    if (isEditable) setHoverRating(index + 1);
  };

  const handleMouseLeave = () => {
    if (isEditable) setHoverRating(0);
  };

  const handleClick = (index) => {
    if (isEditable) setRating(index + 1);
  };

  const renderStars = () => {
    const maxStars = 5;
    const stars = [];

    for (let i = 0; i < maxStars; i++) {
      const starIcon = i < (hoverRating || rating) ? solidStarIcon : goldOutline;
      stars.push(
        <img
          className='starImage'
          key={i}
          src={starIcon}
          alt="Star"
          onMouseEnter={() => handleMouseEnter(i)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick(i)}
          style={{ cursor: isEditable ? 'pointer' : 'default' }}
        />
      );
    }

    return stars;
  };

  return <div className="starReview">{renderStars()}</div>;
};

export default StarReview;
