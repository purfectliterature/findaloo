import React from 'react';
import { Star, StarHalf, StarBorderOutlined } from '@material-ui/icons';
import { MAX_RATINGS } from '../../strings';
import './styles.css'

const Stars = ({ ratings }) => {
  let numFullStars = Math.floor(ratings);
  let numEmptyStars = MAX_RATINGS - numFullStars;
  let numHalfStars = 0; 

  const remainingRating = ratings - numFullStars;
  if (remainingRating >= 0.25 && remainingRating < 0.75) {
    numHalfStars++;
    numEmptyStars--;
  } else if (remainingRating >= 0.75) {
    numFullStars++; 
    numEmptyStars--;
  }

  let stars = [];
  for (let i = 0; i < numFullStars; i++) {
    stars.push(<Star/>);
  }
  for (let i = 0; i < numHalfStars; i++) {
    stars.push(<StarHalf/>);
  }
  for (let i = 0; i < numEmptyStars; i++) {
    stars.push(<StarBorderOutlined/>);
  }

  return (
    <div className="stars-section">
      {stars.map((star, index) => (
        <span className='secondary-skin' key={index}>{star}</span>
      ))}
    </div>
  )
}

const BasicInfoComponent = ({ name, address, ratings, numberOfReviews }) => {
  return (
    <div className="padding">
      <h2>{name}</h2>

      <div className="description-skin">
        <p>{address}</p>
        <div className="display-flex flex-direction-row align-content-center">
          <p className="ratings-text">{ratings}</p>
          <Stars ratings={ratings} />
          <p className="ratings-text">({numberOfReviews})</p>
        </div>
      </div>
    </div>
  );
};

export default BasicInfoComponent;