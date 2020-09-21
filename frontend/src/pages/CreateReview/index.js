import React, { useState } from 'react';
import { Page, Navbar, NavRight, Button, f7 } from 'framework7-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import UserProfile from '../../components/UserProfile';
import UserRating from '../../components/UserRating';
import UserInput from '../../components/UserInput';

const CreateReviews = (props) => {
  const { id, rating, postTitle } = props;
  const currentUser = {
    name: 'Jin Ying',
    profile_image: 'https://www.comp.nus.edu.sg/stfphotos/sooyj_2.jpg',
  };

  const [userRatings, setUserRatings] = useState(rating);

  const handleFormSubmission = async (values) => {
    const { reviewTitle, reviewDescription } = values;
    console.log('rating', userRatings);
    console.log('reviewTitle', reviewTitle);
    console.log('reviewDescription', reviewDescription);

    // TODO: API CALL

    formik.setSubmitting(false);

    // TODO: Routing
    // f7.views.main.router.navigate(`/toilets/${id}/`);
  };

  const handleOnReviewClick = (newRating) => {
    setUserRatings(newRating);
  };

  const validationSchema = Yup.object().shape({
    reviewTitle: Yup.string()
      .required()
      .min(1, 'A title must be provided')
      .max(140, 'Title cannot exceeds 140 character limit'),
    reviewDescription: Yup.string().required(),
  });

  const formik = useFormik({
    initialValues: {
      reviewTitle: '',
      reviewDescription: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleFormSubmission(values);
    },
  });

  return (
    <Page className="white-background-skin">
      <form onSubmit={formik.handleSubmit}>
        <Navbar backLink title={postTitle}>
          <NavRight>
            <Button type="submit">Post</Button>
          </NavRight>
        </Navbar>

        <UserProfile user={currentUser} />
        <UserRating
          ratings={userRatings}
          handleOnReviewClick={handleOnReviewClick}
        />
        <UserInput formik={formik} />
      </form>
    </Page>
  );
};

export default CreateReviews;
