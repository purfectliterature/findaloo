import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import * as moment from 'moment';
import { Page, Navbar, NavLeft, NavTitle, Button, f7 } from 'framework7-react';
import { Star, StarBorderOutlined, ArrowBackIos } from '@material-ui/icons';
import { MAX_RATINGS } from '../../strings';
import './styles.css';

import { getTokens } from '../../store/user';
import { fetchUserReviews } from '../../utils/reviews';

const ReviewDetails = ({ review }) => {
  return (
    <div className="padding-bottom margin-bottom grey-bottom-border">
      <div className="margin-bottom display-flex flex-direction-row">
        <div>
          <h3 className="header-margin">{review.toilet}</h3>
          <div className="display-flex flex-direction-row">
            <ReviewStars reviewCount={review.cleanliness_rating} />
            <span className="grey-text margin-left">
              {moment(review.created_at).fromNow()}
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
  const [reviews, setReviews] = useState([]);
  const userTokens = useSelector(getTokens);

  useEffect(() => {
    fetchUserReviews(
      userTokens.authToken,
      (data) => {
        setReviews(data);
      },
      (err) => {
        console.log(err);
      }
    );
  }, []);

  return (
    <Page className="white-background-skin">
      <Navbar>
        <NavLeft>
          <Button
            onClick={() => {
              f7.views.main.router.navigate(`/profile/`, { animate: false });
            }}
          >
            <ArrowBackIos />
          </Button>
        </NavLeft>
        <NavTitle>Manage Reviews</NavTitle>
      </Navbar>

      <div className="padding">
        {reviews.map((review, index) => (
          <ReviewDetails key={index} review={review} />
        ))}
      </div>
    </Page>
  );
};

export default ManageReviews;
