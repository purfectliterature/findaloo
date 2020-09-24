import axios from "axios";
import Routes from "./routes";

export const login = (params, onSuccess, onError) => {
    axios
        .post(Routes.login, params)
        .then((response) => {
            if (response.status === 200) {
                onSuccess(response.data);
            }
        })
        .catch(onError);
};

export const register = (params, onSuccess, onError) => {
    axios
        .post(Routes.customerSignUp, params)
        .then((response) => {
            if (response.status === 200) {
                onSuccess(response.data);
            }
        })
        .catch(onError);
};

export const getGoogleSignInUrl = (params, onSuccess) => {
    axios.get(Routes.googleSignInUrl, params).then((response) => {
        if (response.status === 200) {
            onSuccess(response.data);
        }
    });
};

export const exchangeToken = (params, onSuccess, onError) => {
    axios
        .post(Routes.googleExchangeToken, params)
        .then((response) => {
            if (response.status === 200) {
                onSuccess(response.data);
            }
        })
        .catch((error) => {
            onError(error);
        });
};

export const getProfile = (params, onSuccess) => {
    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${params.accessToken}`,
    };
    axios
        .get(Routes.getUserProfile, {
            params: params,
            headers: headers,
        })
        .then((response) => {
            onSuccess(response.data);
        });
};
