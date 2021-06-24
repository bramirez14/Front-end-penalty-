import React, { useContext, useEffect} from 'react';
import { createContext } from 'react';
import { useSocket } from '../hooks/useSocket';
import { UserContext } from './UserContext';

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
const { auth } = useContext(UserContext)
    console.log(auth);
     const id=localStorage.getItem('uid')
    const { socket, online, conectarSocket, desconectarSocket } = useSocket('http://localhost:4000');

useEffect(() => {
    if ( auth ) {
        conectarSocket();
    }
}, [conectarSocket, auth])   

useEffect(() => {
    if ( !auth) {
        desconectarSocket();
    }
}, [desconectarSocket, auth])  
 
/* useEffect(() => {
        
    socket?.on( 'lista-usuarios', (usuarios) => {
       console.log(usuarios);
       
    })

}, [socket]); */
  

    // Escuchar los cambios en los usuarios conectados
   




    return (
        <SocketContext.Provider value={{ socket, online }}>
            { children }
        </SocketContext.Provider>
    )
}