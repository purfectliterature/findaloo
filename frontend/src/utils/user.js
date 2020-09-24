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

export const getGoogleSignInUrl = (onSuccess) => {
    axios.get(Routes.googleSignInUrl).then((response) => {
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

export const fetchUserInfo = (authToken, onSuccess, onError) => {
    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
    };

    axios
        .get(Routes.getUserProfile, { headers: headers })
        .then((res) => {
            if (res.status === 200) {
                onSuccess({
                    name: res.data.name,
                    profilePicture: res.data.profile_picture,
                    email: res.data.email,
                    points: parseInt(res.data.points)
                });
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
        "Content-Type": "application/json",
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
        "Content-Type": "application/json",
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
