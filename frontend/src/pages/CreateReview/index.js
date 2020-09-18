import React, { useState } from 'react';
import { Page, Navbar, NavRight, Button, f7 } from 'framework7-react';
import './styles.css';
import UserProfileComponent from '../../components/createReview/UserProfileComponent';
import UserRatingComponent from '../../components/createReview/UserRatingComponent';

const CreateReviews = (props) => {
  // const { id, rating, title } = props;
  const id = 1;
  const rating = 2;
  const title = 'peepoo peepoo';
  const currentUser = {
    name: 'Jin Ying',
    profile_image: 'https://www.comp.nus.edu.sg/stfphotos/sooyj_2.jpg',
  };

  const [userRatings, setUserRatings] = useState(rating);

  const handlePostOnClick = (rating, title, description) => {
    console.log('rating', rating);
    console.log('title', title);
    console.log('description', description);

    // TODO: API CALL

    f7.views.main.router.navigate(`/toilets/${id}/`);
  };

  const handleOnReviewClick = (newRating) => {
    setUserRatings(newRating);
  }

  return (
    <Page className="white-background-skin">
      <Navbar backLink title={title}>
        <NavRight>
          <Button
            onClick={() => {
              handlePostOnClick(rating);
            }}
          >
            Post
          </Button>
        </NavRight>
      </Navbar>

      <UserProfileComponent user={currentUser} />
      <UserRatingComponent ratings={userRatings} handleOnReviewClick={handleOnReviewClick} />
    </Page>
  );
};

export default CreateReviews;
