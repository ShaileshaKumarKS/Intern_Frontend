import {configureStore} from "@reduxjs/toolkit"
import userReducer from "../Feature/UserSlice"


export const Store =configureStore({
    reducer:{
        user:userReducer,
    }
})