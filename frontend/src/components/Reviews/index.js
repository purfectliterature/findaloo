import React from 'react';
import * as moment from 'moment';
import { Button } from 'framework7-react';
import { Star, StarBorderOutlined } from '@material-ui/icons';
import { MAX_RATINGS } from '../../strings';

const CreateReview = ({ currentUser, handleOnReviewClick }) => {
  return (
    <div className="padding text-align-center grey-bottom-border">
      <div className="user-profile-image-section">
        <img
          className="image user-profile-image"
          src={currentUser.profileImage}
          alt={`${currentUser.name} profile`}
        />
      </div>

      <div className="margin-bottom">
        <h2>Hey, {currentUser.name}!</h2>
        <p className="no-padding description-skin">
          Rate your toilet experience and earn points
        </p>
      </div>

      <div className="display-flex flex-direction-row justify-content-space-around margin-bottom">
        {[...Array(MAX_RATINGS)].map((value, index) => (
          <Button
            key={index}
            onClick={() => handleOnReviewClick(index + 1)}
            className="create-review-btn grey-skin"
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
    <div className="padding">
      {reviews.map((review, index) => (
        <div
          key={index}
          className="margin-bottom padding-bottom grey-bottom-border"
        >
          <div className="margin-bottom display-flex flex-direction-row">
            <div className="review-user-profile-image-section">
              <img
                src={review.user.profileImage}
                alt={`${review.user.name} profile`}
                className="image user-profile-image"
              />
            </div>
            <div>
              <h3 className="header-margin">{review.user.name}</h3>
              <div className="display-flex flex-direction-row justify-content-space-between">
                <ReviewStars reviewCount={review.cleanliness_rating} />
                <span className="grey-text margin-left">
                  {moment.unix(review.created_at).fromNow()}
                </span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="grey-text header-margin">{review.title}</h4>
            <p className="no-margin description-skin">{review.description}</p>
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
        <span className="review-stars secondary-skin" key={index}>
          {star}
        </span>
      ))}
    </div>
  );
};

const ReviewsComponent = ({ reviews, handleOnReviewClick }) => {
  return (
    <div className="tab-info">
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
