import React, { useMemo } from 'react'
import {io} from 'socket.io-client'
const SocketContext = React.createContext(null)

/**
 * This code defines a custom React hook called useSocket. It allows components to access the socket instance stored in the SocketContext created earlier.
 * @returns socket instance stored in the SocketContext created earlier.
 */
export const useSocket = () => React.useContext(SocketContext)
export default function SocketProvider(props) {
    // to save reinitialization
    const socket = useMemo(() => io('http://localhost:3001'),[])
  return (
    <SocketContext.Provider value={socket}>{props.children}</SocketContext.Provider>
  )
}
