import axios from 'axios';
import Routes from './routes';

export const createReport = (
  authToken,
  toiletId,
  issue,
  items,
  description,
  onSuccess,
  onError
) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${authToken}`,
  };

  axios
    .post(
      `${Routes.toiletReports}/${toiletId}`,
      {
        issue,
        items,
        description,
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
