import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import {
  Page,
  Navbar,
  NavRight,
  Button,
  List,
  ListInput,
  f7,
} from 'framework7-react';
import { Edit } from '@material-ui/icons';
import { endpoints } from '../../utils/routes';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './styles.css';

const EditProfile = (props) => {
  const { userName, userProfilePicture } = props;
  const authKey =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQiLCJlbWFpbCI6ImFnbmVzMkBnbWFpbC5jb20iLCJhdXRoVHlwZSI6Im5hdGl2ZSIsImlhdCI6MTYwMDg2MDMzNSwiZXhwIjoxNjAwODYzOTM1fQ.1utFZBr9qBkPFQbMImlm_9gLMACh2Py2Z0BLkUv9u-8';
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${authKey}`,
  };

  const [profilePicture, setProfilePicture] = useState(null);
  const fileInput = useRef(null);

  const handleFormSubmission = async (values) => {
    const { name, profilePicture } = values;
    axios
      .put(
        `${endpoints.databaseApi}/customer/profile`,
        {
          name: name,
          profile_picture: profilePicture,
        },
        {
          headers: headers,
        }
      )
      .then((res) => {
        formik.setSubmitting(false);
        f7.views.main.router.navigate(`/profile/`);
      })
      .catch((err) => {
        console.log(err);
        formik.setSubmitting(false);
      });
  };

  const handleEditProfileOnClick = (event) => {
    fileInput.current.click();
  };

  const handleUploadProfilePicture = async (file) => {
    try {
      var response = await axios
        .get(
          `${endpoints.databaseApi}/customer/profile/imageUrl`,
          {
            headers: headers,
          }
      )
      let binary = atob(this.image.split(',')[1])
      let array = []
      for (var i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i))
      }
      let blobData = new Blob([new Uint8Array(array)], { type: 'image/jpeg' })
      console.log('Uploading to: ', response.data.uploadURL)
      const result = await axios.put(response.data.uploadURL, {
        body: blobData
      })
    } catch (err) {
      console.log(err);
    }
    formik.setFieldValue('profilePicture', file);
  };

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
                name={
                  formik.values.profilePicture
                    ? formik.values.profilePicture.name
                    : ''
                }
                className="edit-profile-file-input"
                onChange={(event) =>
                  handleUploadProfilePicture(event.currentTarget.files[0])
                }
              />
            </div>
          </div>

          <div className="text-align-center margin-bottom edit-profile-name-input">
            <List noHairlines>
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
