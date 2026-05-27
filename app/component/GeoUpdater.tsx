
"use client"
import React, { useEffect, useRef } from 'react'
import { getSocket } from '../lib/socket';

const GeoUpdater = ({userId}:{userId:string}) => {

  const socketRef=useRef<any>(null)
  useEffect(()=>{
    if(!userId)return;
    if(!navigator.geolocation)return;

    socketRef.current=getSocket()
    socketRef.current.emit("identity",userId)

   const watcher=navigator.geolocation.watchPosition((position) => {

    socketRef.current.emit("update-location", {
        userId,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
    })

})

    return ()=>{navigator.geolocation.clearWatch(watcher)}
  },[userId])
  return null
}

export default GeoUpdater