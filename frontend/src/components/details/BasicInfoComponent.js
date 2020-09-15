import React from 'react';
import { Star, StarHalf, StarBorderOutlined } from '@material-ui/icons';
import { MAX_RATINGS } from '../../strings';

const BasicInfoComponent = ({ name, address, ratings, numberOfReviews }) => {
  return (
    <div className="section">
      <h2 className="title-skin">{name}</h2>

      <div className="description-skin">
        <p className="p-margin">{address}</p>
        <div className="flex-row flex-align-center">
          <p className="p-margin ratings-text">{ratings}</p>
          <Stars ratings={ratings} />
          <p className="p-margin ratings-text">({numberOfReviews})</p>
        </div>
      </div>
    </div>
  );
};

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
        <span className='star-skin' key={index}>{star}</span>
      ))}
    </div>
  )
}

export default BasicInfoComponent;