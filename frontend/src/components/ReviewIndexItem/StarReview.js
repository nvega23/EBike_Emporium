import React from 'react';
import regularStarIcon from '../../assets/blackStar.png';
import solidStarIcon from '../../assets/goldStar.png';
import halfStar from '../../assets/halfStar.png';
import halfGold from '../../assets/halfGold.png';
import halfStarWhite from '../../assets/whiteStar.png';
import goldOutline from '../../assets/goldOutline.png';
import './StarReview.css'

const StarReview = ({ rating }) => {
  const renderStars = () => {
    const maxStars = 5;
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    const stars = [];
    for (let i = 0; i < fullStars; i++) {
      stars.push(<img className='starImage' key={i} src={solidStarIcon} alt="Solid Star" />);
    }

    if (hasHalfStar) {
      stars.push(<img className='starImage' key={fullStars} src={halfGold} alt="Half Star" />);
    }

    for (let i = stars.length; i < maxStars; i++) {
      stars.push(<img className='starImage' key={i} src={goldOutline} alt="Empty Star" />);
    }

    return stars;
  };

  return <div className="starReview">{renderStars()}</div>;
};

export default StarReview;
