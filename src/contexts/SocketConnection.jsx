import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useContext } from 'react'
import io from 'socket.io-client'


const SocketContext = React.createContext()

export function useSocket(){
    return useContext(SocketContext)
}

// server & socket connection
export function SocketConnection({ id, children }) {

    const [ socket, setSocket ] = useState()

    // create socket when new page loads or if there is an id change
    useEffect(() => {
        const newSocket = io('http://localhost:7000', { query: {id} })

        setSocket(newSocket)

        // close old socket to prevent duplicate messages
        return () => newSocket.close()
    }, [id])

    return (
        <SocketContext.Provider value={socket} >
            { children }
        </SocketContext.Provider>
    )
}
