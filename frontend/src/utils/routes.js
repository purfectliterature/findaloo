export const endpoints = {
  databaseApi: "https://a3.dawo.me:3000",
  authenticationApi: "https://a3.dawo.me:4000"
};
const DATABASE = "https://a3.dawo.me:3000";
const AUTHENTICATION = "https://a3.dawo.me:4000";

export default {
    getToilets: `${DATABASE}/toilets`,
    getNearestToilets: `${DATABASE}/toilets/nearest`,
    getToiletsFromSearchKeywords: `${DATABASE}/toilets/search`,
    toiletReviews: `${DATABASE}/review`,
    toiletReports: `${DATABASE}/report`,
    getUserProfile: `${DATABASE}/profile`,    

    login: `${AUTHENTICATION}/login`,
    logout: `${AUTHENTICATION}/logout`,
    customerSignUp: `${AUTHENTICATION}/sign-up/customer`,
    managementSignUp: `${AUTHENTICATION}/sign-up/management`,
    getUserToken: `${AUTHENTICATION}/token`
};
