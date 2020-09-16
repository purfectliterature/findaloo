import React from 'react';
import * as moment from 'moment';
import { Button } from 'framework7-react';
import { Star, StarBorderOutlined } from '@material-ui/icons';
import { MAX_RATINGS } from '../../strings';

const CreateReview = ({ currentUser, handleOnReviewClick }) => {
  return (
    <div className="section grey-bottom-border create-review-section">
      <div className="user-profile-image-section">
        <img
          className="image user-profile-image"
          src={currentUser.profileImage}
          alt={`${currentUser.name} profile picture`}
        />
      </div>

      <div className="separator">
        <h2>Hey, {currentUser.name}!</h2>
        <p className="p-margin description-skin">
          Rate your toilet experience and earn points
        </p>
      </div>

      <div className="create-review-btns-section">
        {[...Array(MAX_RATINGS)].map((value, index) => (
          <Button
            key={index}
            onClick={() => handleOnReviewClick(index + 1)}
            className="create-review-btn-skin"
          >
            <StarBorderOutlined />
          </Button>
        ))}
      </div>
    </div>
  );
};

const Reviews = ({ reviews }) => {
  return (
    <div className="section">
      {reviews.map((review, index) => (
        <div key={index} className="separator grey-bottom-border">
          <div className="flex-row">
            <div className="review-user-profile-image-section">
              <img
                src={review.user.profileImage}
                alt={`${review.user.name} profile image`}
                className="image user-profile-image"
              />
            </div>
            <div>
              <h4 className="review-user-name">{review.user.name}</h4>
              <div className="display-flex flex-direction justify-content-space-between">
                <ReviewStars reviewCount={review.cleanliness_rating} />
                <span className="grey-text margin-left">{moment.unix(review.created_at).calendar()}</span>
              </div>
            </div>
          </div>

          <div>
            <p className="p-margin">{review.description}</p>
          </div>

          <div></div>
        </div>
      ))}
    </div>
  );
};

const ReviewStars = ({ reviewCount }) => {
  const numEmptyStars = MAX_RATINGS - reviewCount;
  let stars = [];
  for (let i = 0; i < reviewCount; i++) {
    stars.push(<Star />);
  }
  for (let i = 0; i < numEmptyStars; i++) {
    stars.push(<StarBorderOutlined />);
  }

  return (
    <div className="review-stars-section">
      {stars.map((star, index) => (
        <span className="review-stars star-skin" key={index}>
          {star}
        </span>
      ))}
    </div>
  );
};

const ReviewsComponent = ({ reviews, handleOnReviewClick }) => {
  return (
    <div className="tabInfo">
      <CreateReview
        currentUser={{
          name: 'Yuen Jian',
          profileImage: 'https://www.comp.nus.edu.sg/stfphotos/sooyj_2.jpg',
        }}
        handleOnReviewClick={handleOnReviewClick}
      />
      <Reviews reviews={reviews} />
    </div>
  );
};

export default ReviewsComponent;
