import { createSlice } from "@reduxjs/toolkit";
import  { IUser } from '../models/user.model'

interface userTypes {
    userData: {
        user:IUser | null
    }
}

const initialState:userTypes={
    userData:{
        user:null
    }
}



const userSlice=createSlice({
    name:"user",
    initialState,
    reducers:{
        setUserState:(state,action)=>{
            state.userData=action.payload
        }
    }
})

export const {setUserState}=userSlice.actions

export default userSlice.reducer