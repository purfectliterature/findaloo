const DATABASE = "https://a3.dawo.me:3000";
const AUTHENTICATION = "https://a3.dawo.me:4000";

export default {
    getToilets: `${DATABASE}/toilets`,
    getNearestToilets: `${DATABASE}/toilets/nearest`,
    getToiletsFromSearchKeywords: `${DATABASE}/toilets/search`,
    toiletReviews: `${DATABASE}/review`,
    toiletReports: `${DATABASE}/report`,
    getUserProfile: `${DATABASE}/customer/profile`,
    updatePassword: `${DATABASE}/customer/change-password`,
    getUserReviews: `${DATABASE}/customer/reviews`, 

    login: `${AUTHENTICATION}/login`,
    logout: `${AUTHENTICATION}/logout`,
    customerSignUp: `${AUTHENTICATION}/sign-up/customer`,
    managementSignUp: `${AUTHENTICATION}/sign-up/management`,
    getUserToken: `${AUTHENTICATION}/token`
};
