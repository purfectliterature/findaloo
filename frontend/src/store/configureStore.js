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
import { createOffline } from '@redux-offline/redux-offline';
import offlineConfig from '@redux-offline/redux-offline/lib/defaults';

import userReducer from "./user";
import toiletsReducer from "./toilets";
import reviewsReducer from "./reviews";
import reportsReducer from "./reports"

const persistConfig = {
    key: "root",
    storage
};

// When using redux-persist v5, persist in createOffline config must be disabled
// by assigning to a falsey value to prevent the autoRehydrator to be created by
// enhanceStore. Else, will get an Uncaught TypeError exception.
const { middleware, enhanceReducer, enhanceStore } = createOffline({
    ...offlineConfig,
    persist: false
});

const reducer = persistReducer(persistConfig, enhanceReducer(combineReducers({
    user: userReducer,
    toilets: toiletsReducer,
    reviews: reviewsReducer,
    reports: reportsReducer
})));

export const store = configureStore({
    reducer,
    middleware: [
        middleware,
        ...getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            }
        }),
    ],
    enhancers: (defaultEnhancers) => [enhanceStore, ...defaultEnhancers]
});
    
export const persistor = persistStore(store);