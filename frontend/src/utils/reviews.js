import axios from 'axios';
import Routes from './routes';

export const createReview = (
  authToken,
  toiletId,
  title,
  description,
  rating,
  onSuccess,
  onError
) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${authToken}`,
  };

  axios
    .post(
      `${Routes.toiletReview}/${toiletId}`,
      {
        cleanlinessRating: rating,
        title: title,
        description: description,
      },
      {
        headers: headers,
      }
    )
    .then((res) => {
      onSuccess(res.data);
    })
    .catch(onError);
};

export const fetchUserReviews = (authToken, onSuccess, onError) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${authToken}`,
  };

  axios
    .get(Routes.getUserReviews, { headers: headers })
    .then((res) => {
      if (res.status === 200) {
        onSuccess(res.data);
      }
    })
    .catch(onError);
};
