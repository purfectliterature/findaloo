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
    authToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQiLCJlbWFpbCI6ImFnbmVzMkBnbWFpbC5jb20iLCJhdXRoVHlwZSI6Im5hdGl2ZSIsImlhdCI6MTYwMDk2MzI3NiwiZXhwIjoxNjAwOTY2ODc2fQ.3KjiLLxSgRgRvW5sbnbdnHGqO_Kw0iQLLJ3U9jv6tiE";
    const headers = {
        "Content-Type": "application/json",
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

export const updateProfilePicture = (
  profilePicture,
) => {
  let imageUrl;
  let file = profilePicture;
  let fileParts = file.name.split(".");
  let fileName = fileParts[0];
  let fileType = fileParts[1];
  axios
    .post(`https://a3.dawo.me:3000/customer/profile/imageUrl`, {
      fileName: fileName,
      fileType: fileType,
    })
    .then((response) => {
      console.log(response);
      let returnData = response.data.data.returnData;
      let signedRequest = returnData.signedRequest;
      imageUrl = returnData.url;
      console.log(returnData.url);
      console.log(imageUrl);
      let options = {
        headers: {
          "Content-Type": fileType,
          ACL: "public-read",
        },
      };
      axios
        .put(signedRequest, file, options)
        .then((result) => {
          return result;
        })
        .catch((error) => {
          console.log(error);
        });
    })
    .catch((error) => {
      console.log(error);
    });
};

export const updateUserInfo = (
    authToken,
    name,
    profilePicture,
    onSuccess,
    onError
) => {
 authToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQiLCJlbWFpbCI6ImFnbmVzMkBnbWFpbC5jb20iLCJhdXRoVHlwZSI6Im5hdGl2ZSIsImlhdCI6MTYwMDk2MzI3NiwiZXhwIjoxNjAwOTY2ODc2fQ.3KjiLLxSgRgRvW5sbnbdnHGqO_Kw0iQLLJ3U9jv6tiE";

    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
    };

    axios
        .put(
            Routes.getUserProfile,
            {
                name: name,
                profilePicture: profilePicture,
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
