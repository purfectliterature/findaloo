import { combineReducers, configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage'
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
} from "redux-persist";
import { offline } from '@redux-offline/redux-offline';
import offlineConfig from '@redux-offline/redux-offline/lib/defaults';

import userReducer from "./user";
import toiletsReducer from "./toilets";
import reviewsReducer from "./reviews";
import reportsReducer from "./reports"

const persistConfig = {
    key: "root",
    storage
};

const reducer = persistReducer(persistConfig, combineReducers({
    user: userReducer,
    toilets: toiletsReducer,
    reviews: reviewsReducer,
    reports: reportsReducer,
}));


export const store = configureStore({
    reducer,
    middleware: [
        ...getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            }
        })
    ],
    enhancers: [offline(offlineConfig)],
});
    
export const persistor = persistStore(store);