import React, { useState, useEffect } from 'react';
import * as moment from 'moment';
import { Page, Navbar } from 'framework7-react';
import { Star, StarBorderOutlined } from '@material-ui/icons';
import { MAX_RATINGS } from '../../strings';
import './styles.css';

const ReviewDetails = ({ review }) => {
  return (
    <div className="padding-bottom margin-bottom grey-bottom-border">
      <div className="margin-bottom display-flex flex-direction-row">
        <div>
          <h3 className="header-margin">{review.toilet}</h3>
          <div className="display-flex flex-direction-row">
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

const ManageReviews = (props) => {
  const { userId } = props;

  const [reviews, setReviews] = useState([]);

  const reviewsStub = [
    {
      toilet: 'MBS Level 2',
      cleanliness_rating: 4,
      title: 'Tip-top cleanliness',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      created_at: 1600253600,
    },
    {
      toilet: 'Changi Airport T4 L4',
      cleanliness_rating: 2,
      title: 'Dirty',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      created_at: 1600253600,
    },
  ];

  useEffect(() => {
    // TODO: API CALL

    setReviews(reviewsStub);
  }, []);

  return (
    <Page className="white-background-skin">
      <Navbar backLink title="Manage Reviews" />

      <div className="padding">
        {reviews.map((review, index) => (
          <ReviewDetails key={index} review={review} />
        ))}
      </div>
    </Page>
  );
};

export default ManageReviews;
