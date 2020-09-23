import axios from "axios";

import Routes from "./routes";

export const fetchToilets = (onSuccess, onError) => {
    axios.get(Routes.getToilets).then((response) => {
        if (response.status === 200 && response.data.length > 0) {
            onSuccess(response.data);
        } else {
            console.log("ERROR COY");
        }
    }).catch(onError);
}