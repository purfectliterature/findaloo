import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Page, Navbar, NavRight, Button, f7 } from 'framework7-react';
import { endpoints } from '../../utils/routes';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import UserProfile from '../../components/UserProfile';
import UserRating from '../../components/UserRating';
import UserInput from '../../components/UserInput';

const CreateReviews = (props) => {
  const { id, rating, postTitle } = props;
  // TODO: CHANGE
  const authKey =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQiLCJlbWFpbCI6ImFnbmVzMkBnbWFpbC5jb20iLCJhdXRoVHlwZSI6Im5hdGl2ZSIsImlhdCI6MTYwMDg1NTIwNiwiZXhwIjoxNjAwODU4ODA2fQ.UFilfB1Xv9JongrE2TxubJJU7oFm7JdF-vPK3MWg6SU';
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${authKey}`,
  };

  const [userRatings, setUserRatings] = useState(rating);
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    axios
      .get(`${endpoints.databaseApi}/customer/profile`, { headers: headers })
      .then((response) => {
        if (response.status === 200) {
          setCurrentUser(response.data);
        }
      });
  }, []);

  const handleFormSubmission = async (values) => {
    const { reviewTitle, reviewDescription } = values;

    axios
      .post(
        `${endpoints.databaseApi}/review/${id}`,
        {
          cleanlinessRating: rating,
          title: reviewTitle,
          description: reviewDescription,
        },
        {
          headers: headers,
        }
      )
      .then((response) => {
        formik.setSubmitting(false);
        f7.views.main.router.navigate(`/toilets/${id}/`);
      })
      .catch((err) => {
        formik.setSubmitting(false);
        console.log(err);
      });
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
