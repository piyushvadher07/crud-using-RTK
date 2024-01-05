import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userslice/userslice";

const store = configureStore({
    reducer:{
        user:userSlice,
    },
})

export default store;