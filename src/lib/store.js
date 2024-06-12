import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { api } from './api';
import authReducer from "./reducers/authReducer";
import userReducer from "./reducers/userReducer";

const store = configureStore({
    reducer: {
        authReducer,
        userReducer,
        [api.reducerPath]: api.reducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(api.middleware)
})

export default store;