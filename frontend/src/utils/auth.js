import axios from 'axios';
import Routes from './routes';

export const logout = (refreshToken, onSuccess, onError) => {
  axios
    .delete(Routes.logout, {
      params: {
        refreshToken: refreshToken,
      },
    })
    .then((res) => {
      onSuccess(res.data);
    })
    .catch(onError);
};
