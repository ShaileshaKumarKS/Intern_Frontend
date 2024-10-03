import { createSlice } from "@reduxjs/toolkit";

const initialState={

    user:{
        photoURL:localStorage.getItem("userPhotoURL")
    },
}
export const UserSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        login:(state,action)=>{
            state.user=action.payload
            localStorage.getItem("userPhotoURL",action.payload.photoURL)
        },
        logout:(state)=>{
            state.user=null;
            localStorage.removeItem("userPhotoURL")
        },
        updateProfile:(state,action)=>{
            
                state.user.photoURL=action.payload.photoURL;
                localStorage.setItem("userPhotoURL",action.payload.photoURL)
            
        },
    },
});

export const {login,logout,updateProfile}=UserSlice.actions;
export const selectUser=(state)=>state.user.user;
export default UserSlice.reducer