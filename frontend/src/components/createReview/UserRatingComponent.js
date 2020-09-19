import React, { useState, useEffect } from 'react';
import { Button } from 'framework7-react';
import { Star, StarBorderOutlined } from '@material-ui/icons';
import { MAX_RATINGS } from '../../strings';

const UserRatingComponent = ({ ratings, handleOnReviewClick }) => {
  const [stars, setStars] = useState([]);
  
  useEffect(() => {
    const numEmptyStars = MAX_RATINGS - ratings;
    let tempStars = [];

    for (let i = 0; i < ratings; i++) {
      tempStars.push(<Star />);
    }
    for (let i = 0; i < numEmptyStars; i++) {
      tempStars.push(<StarBorderOutlined />);
    }

    setStars(tempStars);
  }, [ratings])

  return (
    <div className="margin padding display-flex flex-direction-row justify-content-space-around">
      {stars.map((star, index) => (
        <Button
          key={index}
          onClick={() => handleOnReviewClick(index + 1)}
          className="create-review-btn secondary-skin"
        >
          {star}
        </Button>
      ))}
    </div>
  );
};

export default UserRatingComponent;
