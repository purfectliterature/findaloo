import React, { useState, useEffect, useRef } from 'react';
import {
  Page,
  Navbar,
  NavRight,
  Button,
  List,
  ListInput,
} from 'framework7-react';
import { Edit } from '@material-ui/icons';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './styles.css';

const EditProfile = (props) => {
  const { userId, userName, userProfilePicture } = props;

  const [profilePicture, setProfilePicture] = useState(null);
  const fileInput = useRef(null);

  const handleFormSubmission = async (values) => {
    const { name, profilePicture } = values;
    console.log('name: ', name);
    console.log(profilePicture);

    // TODO: API CALL

    formik.setSubmitting(false);

    // TODO: Routing
    // f7.views.main.router.navigate(`/profile/`);
  };

  const handleEditProfileOnClick = (event) => {
    fileInput.current.click();
  };

  const handleUploadProfilePicture = (file) => {
    formik.setFieldValue('profilePicture', file);
  }

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Required').min(1, 'Name must be provided'),
    profilePicture: Yup.mixed(),
  });

  const formik = useFormik({
    initialValues: {
      name: userName,
      profilePicture: null,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleFormSubmission(values);
    },
  });

  useEffect(() => {
    if (formik.values.profilePicture) {
      const file = formik.values.profilePicture;
      const reader = new FileReader();
      reader.onload = (ev) => {
        setProfilePicture(ev.target.result);
      };
      reader.readAsDataURL(file);
    }
  }, [formik]);

  return (
    <Page className="edit-profile-page white-background-skin">
      <form onSubmit={formik.handleSubmit}>
        <Navbar backLink title="Edit Profile">
          <NavRight>
            <Button type="submit">Update</Button>
          </NavRight>
        </Navbar>

        <div className="padding">
          <div className="margin-bottom edit-profile-profile-picture">
            <img
              className="image user-profile-image"
              src={profilePicture || userProfilePicture}
              alt="profile"
            />
            <div className="edit-profile-edit-btn-section">
              <Button
                fill
                round
                className="display-flex justify-content-center white-background-skin grey-skin simple-shadow-skin edit-profile-edit-btn"
              >
                <Edit onClick={handleEditProfileOnClick} />
              </Button>
              <input
                type="file"
                ref={fileInput}
                name={formik.values.profilePicture ? formik.values.profilePicture.name : ''}
                className="edit-profile-file-input"
                onChange={(event) => handleUploadProfilePicture(event.currentTarget.files[0])}
              />
            </div>
          </div>

          <div className="text-align-center margin-bottom edit-profile-name-input">
            <List>
              <ListInput
                outline
                floatingLabel
                clearButton
                type="text"
                label="Name"
                placeholder="Name"
                validate
                errorMessage={
                  formik.touched.name && formik.errors.name
                    ? formik.errors.name
                    : ''
                }
                errorMessage={formik.errors.name}
                errorMessageForce
                disabled={formik.isSubmitting}
                {...formik.getFieldProps('name')}
              />
            </List>
          </div>
        </div>
      </form>
    </Page>
  );
};

export default EditProfile;
