import React, { useState , useEffect, useCallback} from 'react'
import { useSocket } from '../context/SocketProvider'

export default function Room() {
    const socket = useSocket()
    const [userInRoom,setUserInRoom]=useState(false)
    const handleUserjoinedRoom= useCallback(({email,id})=>{
        console.log("You have got company"+" "+email+" just joined with id"+" "+id)
        setUserInRoom(true)
    },[])
    useEffect(()=>{
        socket.on('userJoinedRoom',handleUserjoinedRoom)

        // cleanup
        return ()=>{
            socket.off('userJoinedRoom',handleUserjoinedRoom)
        }
    },[socket,handleUserjoinedRoom])
  return (
    <div>
      <h1>Room Page</h1>
      {userInRoom?<h3>Connected</h3>:<h3>No one in room</h3>}
      {userInRoom?<button>Call</button>:null}
    </div>
  )
}
