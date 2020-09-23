import { google } from "googleapis";

const googleConfig = {
    clientId: process.env.GOOGLE_CLIENT_ID, // e.g. asdfghjkljhgfdsghjk.apps.googleusercontent.com
    clientSecret: process.env.GOOGLE_CLIENT_SECRET, // e.g. _ASDFA%DFASDFASDFASD#FAD-
    redirect: process.env.GOOGLE_REDIRECT_URL, // this must match your google api settings
};

const defaultScope = [
    "https://www.googleapis.com/auth/plus.me",
    "https://www.googleapis.com/auth/userinfo.email",
];

function createConnection() {
    return new google.auth.OAuth2(
        googleConfig.clientId,
        googleConfig.clientSecret,
        googleConfig.redirect
    );
}

function getConnectionUrl(auth) {
    return auth.generateAuthUrl({
        access_type: "offline",
        prompt: "consent",
        scope: defaultScope,
    });
}

function getGooglePlusApi(auth) {
    return google.plus({ version: "v1", auth });
}

function urlGoogle() {
    const auth = createConnection();
    const url = getConnectionUrl(auth);
    return url;
}
