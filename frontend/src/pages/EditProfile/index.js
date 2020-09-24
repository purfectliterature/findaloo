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
   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQiLCJlbWFpbCI6ImFnbmVzMkBnbWFpbC5jb20iLCJhdXRoVHlwZSI6Im5hdGl2ZSIsImlhdCI6MTYwMDkxODcyMywiZXhwIjoxNjAwOTIyMzIzfQ.G5EKLjj4m0xEnsgt62MyQxrVKG8V9gECNMDr-cSA73c";
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
      let fileParts = file.name.split(".");
      let fileName = fileParts[0];
      let fileType = fileParts[1];
      console.log(fileName);
      console.log(fileType);
      console.log("Preparing the upload");
      axios
        .post(`${endpoints.databaseApi}/customer/profile/imageUrl`, {
          fileName: fileName,
          fileType: fileType,
        })
        .then((response) => {
          console.log(response)
          response = response.data.data;
          console.log(response);
          const formData = new FormData();
          Object.keys(response.fields).forEach((key) => {
            formData.append(key, response.fields[key]);
          });

          // Actual file has to be appended last.
          formData.append("file", file);

          console.log(fileName);
          console.log(fileType)
          // Put the fileType in the headers for the upload
          var options = {
            headers: {
              Key: fileName,
              "Content-Type": fileType,
              "x-amz-acl": "public-read",
            },
          };
          axios
            .post(response.url, formData)
            .then((result) => {
              console.log("Response from s3");
            })
            .catch((error) => {
              alert("ERROR " + JSON.stringify(error));
            });
        })
        .catch((error) => {
          alert(JSON.stringify(error));
        });
      /*const data = new FormData();
      data.append("file", file);
      var response = await axios.post(
        `${endpoints.databaseApi}/customer/profile/imageUrl`, data, {headers: headers,}
      );*/
      /*var response = await axios
        .get(
          `${endpoints.databaseApi}/customer/profile/imageUrl`,
          {
            headers: headers,
          }
      )
      console.log(response.data.uploadURL);
      const result = await axios.put(
        response.data.uploadURL,
        {
          body: file,
        },
        {
          headers: {
            "Content-Type": "png",
            "x-amz-acl": "public-read"
          },
        }
      );*/
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
