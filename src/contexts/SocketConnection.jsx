import React from 'react'
import { useContext } from 'react'

const SocketContext = React.createContext()

export function useSocket(){
    return useContext(SocketContext)
}

export function SocketConnection() {
    return (
        <></>
    )
}
