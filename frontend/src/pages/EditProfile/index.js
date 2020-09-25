import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import {
  Page,
  Navbar,
  NavLeft, 
  NavTitle,
  NavRight,
  Button,
  List,
  ListInput,
  f7,
} from 'framework7-react';
import { Edit, ArrowBackIos } from '@material-ui/icons';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './styles.css';

import { getUserInfo, getTokens } from '../../store/user';
import { updateProfilePicture, updateUserInfo } from '../../utils/user';

const UserImage = ({ currentProfilePicture, newProfilePicture }) => {
  if (
    (!currentProfilePicture || typeof currentProfilePicture === 'undefined') &&
    (!newProfilePicture || typeof newProfilePicture === 'undefined')
  ) {
    return (
      <img
        className="image user-profile-image"
        src={require('../../assets/user.svg')}
        alt="profile"
      />
    );
  }

  return (
    <img
      className="image user-profile-image"
      src={newProfilePicture || currentProfilePicture}
      alt="profile"
    />
  );
};

const EditProfile = () => {
  const [profilePicture, setProfilePicture] = useState(null);
  const userInfo = useSelector(getUserInfo);
  const userTokens = useSelector(getTokens);
  const fileInput = useRef(null);

  useEffect(() => {
    if (!userTokens || !userTokens.authToken) {
      f7.views.main.router.navigate('/');
      return;
    }
  }, []);

  const handleFormSubmission = async (values) => {
    const { name, profilePicture } = values;
    let imageUrl = userInfo.profilePicture;
    if (profilePicture) {
      imageUrl = await updateProfilePicture(profilePicture);
    }

    try {
      updateUserInfo(
        userTokens.authToken,
        name,
        imageUrl,
        (data) => {
          formik.setSubmitting(false);
          f7.views.main.router.navigate(`/profile/`);
        },
        (err) => {
          console.log(err);
          formik.setSubmitting(false);
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleEditProfileOnClick = (event) => {
    fileInput.current.click();
  };

  const handleUploadProfilePicture = async (file) => {
    formik.setFieldValue('profilePicture', file);
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Required').min(1, 'Name must be provided'),
    profilePicture: Yup.mixed(),
  });

  const formik = useFormik({
    initialValues: {
      name: userInfo.name,
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
        <Navbar>
          <NavLeft>
            <Button onClick={() => {f7.views.main.router.navigate(`/profile/`, { animate: false })}}>
              <ArrowBackIos />
            </Button>
          </NavLeft>
          <NavTitle>Edit Profile</NavTitle> 
          <NavRight>
            <Button type="submit" disabled={formik.isSubmitting}>
              Update
            </Button>
          </NavRight>
        </Navbar>

        <div className="padding">
          <div className="margin-bottom edit-profile-profile-picture">
            <UserImage
              currentProfilePicture={userInfo.profilePicture}
              newProfilePicture={profilePicture}
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
