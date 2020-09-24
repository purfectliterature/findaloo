import axios from 'axios';

import Routes from './routes';

export const fetchToilets = (onSuccess, onError) => {
  axios
    .get(Routes.getToilets)
    .then((response) => {
      if (response.status === 200 && response.data.length > 0) {
        onSuccess(response.data);
      } else {
        console.log('ERROR COY');
      }
    })
    .catch(onError);
};

export const fetchToiletDetails = (id, onSuccess, onError) => {
  axios
    .get(`${Routes.getToilets}/${id}`)
    .then((res) => {
      if (res.status === 200) {
        onSuccess(res.data);
      } else {
        console.log('fetchToiletDetails: Something went wrong fetching data');
      }
    })
    .catch(onError);
};

export const fetchToiletsHash = (onSuccess, onError) => {
    axios.get(Routes.getToiletsHash).then((response) => {
        if (response.status === 200) {
            onSuccess(response.data.version);
        } else {
            console.log("fetchToiletsHash: Invalid response received");
            console.log(response);
        }
    }).catch(onError);
}

export const fetchNearestToilets = ({ lat, lng }, onSuccess, onError) => {
    axios.post(Routes.getNearestToilets, { lat, lon: lng }).then((response) => {
        if (response.status === 200 && response.data.length > 0) {
            onSuccess(response.data);
        } else {
            console.log("fetchNearestToilets: Invalid response received");
        }
    }).catch(onError);
}