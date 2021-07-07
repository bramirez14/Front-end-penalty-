import { useCallback, useEffect, useState } from 'react';
import io from 'socket.io-client';


export const useSocket = ( serverPath ) => {

    const [ socket, setSocket ] = useState(null);
    const [ online, setOnline ] = useState(false);

    const conectarSocket = useCallback( () => {

        const token = localStorage.getItem('token'); // se solicita el token de localstorage
        const socketTemp =  io.connect( serverPath, { 
            transports: ['websocket'],// es necesario
            autoConnect: true,
            forceNew: true,
            query: {
                'x-token': token
            }
        });
        
        
        setSocket(socketTemp);
    },[ serverPath ]);
    //console.log(socket);


    const desconectarSocket = useCallback( () => {
        socket?.disconnect();
    },[ socket ]);


    useEffect(() => {
        setOnline( socket?.connected );
    }, [socket])

   /*  useEffect(() => {
        socket?.on('connect', () => setOnline( true ));
    }, [ socket ])

    useEffect(() => {
        socket?.on('disconnect', () => setOnline( false ));
    }, [ socket ]) */

    return {
        socket,
        online,
        conectarSocket,
        desconectarSocket
    }
}