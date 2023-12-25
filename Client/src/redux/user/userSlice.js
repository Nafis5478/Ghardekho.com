import { createSlice } from "@reduxjs/toolkit";

const initialState={
    currentUser:null,
    error:null,
    loading:false
};
const userSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
        signinStart:(state)=>{
            state.loading=true
        },
        signinSuccess:(state,action)=>{
            state.currentUser=action.payload,
            state.loading=false,
            state.error=null;
        },
        siginFailure:(state,action)=>{
            state.error=action.payload,
            state.loading=false;    
        },
        updateUserStart:(state)=>{
            state.loading=true;
        },
        updateUserSuccess:(state,action)=>{
            state.currentUser=action.payload,
            state.loading=false,
            state.error=null;
        },
        updateUserFailure:(state,action)=>{
            state.error=action.payload,
            state.loading=false;    
        },
        deleteUserstart:(state)=>{
            state.loading=true;
        },
        deleteUserSuccess:(state,action)=>{
            state.currentUser=null,
            state.loading=false,
            state.error=null;
        },
        deleteUserFailure:(state,action)=>{
            state.loading=false,
            state.error=action.payload;
<<<<<<< HEAD
        },
        signoutStart:(state)=>{
            state.loading=true;
        },
        signoutSuccess:(state,action)=>{
            state.currentUser=null,
            state.loading=false,
            state.error=null;
        },
        signoutFailur:(state,action)=>{
            state.loading=false,
            state.error=action.payload;
=======
>>>>>>> 526501d857ef9c41b06dc285ce50760a608330ba
        }

    }
})

<<<<<<< HEAD
export const {signinSuccess,signinStart,siginFailure,updateUserStart,updateUserSuccess,updateUserFailure,deleteUserFailure,deleteUserSuccess,deleteUserstart,signoutStart,signoutSuccess,signoutFailure}=userSlice.actions;
=======
export const {signinSuccess,signinStart,siginFailure,updateUserStart,updateUserSuccess,updateUserFailure,deleteUserFailure,deleteUserSuccess,deleteUserstart}=userSlice.actions;
>>>>>>> 526501d857ef9c41b06dc285ce50760a608330ba
export default userSlice.reducer;