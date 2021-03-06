import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Page,
  Navbar,
  NavRight,
  NavLeft,
  NavTitle,
  Button,
  f7,
} from 'framework7-react';
import { ArrowBackIos } from '@material-ui/icons';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import UserProfile from '../../components/UserProfile';
import UserRating from '../../components/UserRating';
import UserInput from '../../components/UserInput';
import './styles.css';

import { getUserInfo, getTokens } from '../../store/user';
import { addNewReviews } from '../../store/reviews';

const CreateReviews = (props) => {
  const { id, rating, postTitle } = props;

  const [userRatings, setUserRatings] = useState(rating);
  const currentUser = useSelector(getUserInfo);
  const userTokens = useSelector(getTokens);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userTokens || !userTokens.authToken) {
      f7.views.main.router.navigate('/');
      return;
    }
  }, []);

  const handleFormSubmission = async (values) => {
    const { reviewTitle, reviewDescription } = values;

    const review = {
      title: reviewTitle,
      rating: rating,
      description: reviewDescription,
    };
    dispatch(addNewReviews(id, userTokens.authToken, review));

    formik.setSubmitting(false);
    f7.views.main.router.navigate(`/toilets/${id}/`);
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
    <Page className="create-review-page white-background-skin">
      <form onSubmit={formik.handleSubmit}>
        <Navbar>
          <NavLeft>
            <Button
              onClick={() => {
                f7.views.main.router.navigate(`/toilets/${id}/`, {
                  animate: false,
                });
              }}
            >
              <ArrowBackIos />
            </Button>
          </NavLeft>
          <NavTitle>{postTitle}</NavTitle>
          <NavRight>
            <Button type="submit" disabled={formik.isSubmitting}>
              Post
            </Button>
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
