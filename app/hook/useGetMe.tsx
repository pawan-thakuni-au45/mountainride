"use client"

import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setUserState } from '../redux/userSlice'

const useGetMe = (enabled:boolean) => {
    const dispatch=useDispatch()
  

    useEffect(()=>{
          if(!enabled) return
    

        const getMe=async()=>{
           const {data}= await axios.get('/api/user/me')
           console.log(data,"this is ")
           dispatch(setUserState(data))
        }
getMe()
    },[enabled])
 
}

export default useGetMe