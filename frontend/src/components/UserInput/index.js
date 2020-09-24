import React from 'react';
import { List, ListInput } from 'framework7-react';

const UserInputComponent = ({ formik }) => {
  return (
    <div className="margin">
      <List>
        <ListInput
          type="text"
          label="Title"
          placeholder="Your title"
          clearButton
          floatingLabel
          validate
          errorMessage={
            formik.touched.reviewTitle && formik.errors.reviewTitle
              ? formik.errors.reviewTitle
              : ''
          }
          errorMessageForce
          disabled={formik.isSubmitting}
          {...formik.getFieldProps('reviewTitle')}
        />
        <ListInput
          type="textarea"
          label="Description"
          placeholder="Share details about your experience at this toilet"
          clearButton
          floatingLabel
          errorMessage={
            formik.touched.reviewDescription && formik.errors.reviewDescription
              ? formik.errors.reviewDescription
              : ''
          }
          errorMessageForce
          disabled={formik.isSubmitting}
          {...formik.getFieldProps('reviewDescription')}
        />
      </List>
    </div>
  );
};

export default UserInputComponent;
