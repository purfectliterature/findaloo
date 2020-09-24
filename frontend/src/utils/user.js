import axios from 'axios';
import Routes from './routes';

export const fetchUserInfo = (authToken, onSuccess, onError) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${authToken}`,
  };

  axios
    .get(Routes.getUserProfile, { headers: headers })
    .then((res) => {
      if (res.status === 200) {
        onSuccess(res.data);
      }
    })
    .catch(onError);
};

export const updateUserInfo = (
  authToken,
  name,
  profilePicture,
  onSuccess,
  onError
) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${authToken}`,
  };

  axios
    .put(
      Routes.getUserProfile,
      {
        name: name,
        profile_picture: profilePicture,
      },
      {
        headers: headers,
      }
    )
    .then((res) => {
      if (res.status === 200) {
        onSuccess(res.data);
      }
    })
    .catch(onError);
};

export const updatePassword = (
  authToken,
  currentPassword,
  newPassword,
  onSuccess,
  onError
) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${authToken}`,
  };

  axios
    .put(
      Routes.updatePassword,
      {
        newPassword: newPassword,
      },
      {
        headers: headers,
      }
    )
    .then((res) => {
      if (res.status === 200) {
        onSuccess(res.data);
      }
    })
    .catch(onError);
};
