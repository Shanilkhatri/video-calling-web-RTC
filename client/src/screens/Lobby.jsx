import React, { useCallback, useEffect } from 'react'
import { useState } from 'react'
import { useSocket } from '../context/SocketProvider'
import {useNavigate} from 'react-router-dom'
export default function Lobby() {
  const [email,setEmail]=useState('')
  const [room,setRoom]=useState('')
  const socket = useSocket()
  const navigate = useNavigate()


  const handleSubmit= useCallback((e)=>{
   e.preventDefault() 
   socket.emit('joinRoom',{email,room})
  },[email,room,socket])

  const handleUserjoinedRoom= useCallback(({email,room})=>{
    navigate(`/room/${room}`)
  },[])
  // useeffect for joining room event if it occurs
  useEffect(()=>{
    socket.on('joinRoom',
      handleUserjoinedRoom
    )
    return ()=>{
      socket.off('joinRoom',handleUserjoinedRoom)
    }
  },[socket,handleUserjoinedRoom])
  return (
    <div>
      <h1>Lobby</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email Id</label>
        <input type="email" id="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
        <br />
        <label htmlFor="room">Room Number</label>
        <input type="text" id="room" value={room} onChange={(e)=>setRoom(e.target.value)}/>
        <br />
        <button type="submit">Join Room</button>
      </form>
    </div>
  )
}
