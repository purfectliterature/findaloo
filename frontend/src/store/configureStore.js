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

import userReducer from "./user";
import toiletsReducer from "./toilets";

const persistConfig = {
    key: "root",
    storage
};

const reducer = persistReducer(persistConfig, combineReducers({
    user: userReducer,
    toilets: toiletsReducer
}));


export const store = configureStore({
    reducer,
    middleware: [
        ...getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            }
        })
    ]
});
    
export const persistor = persistStore(store);