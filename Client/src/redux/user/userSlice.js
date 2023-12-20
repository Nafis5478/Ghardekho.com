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
        }

    }
})

export const {signinSuccess,signinStart,siginFailure}=userSlice.actions;
export default userSlice.reducer;