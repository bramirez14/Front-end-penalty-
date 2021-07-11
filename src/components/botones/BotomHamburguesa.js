import React from 'react'
import { FaBars } from 'react-icons/fa'
import './botonHam.css'
export const BotomHamburguesa = ({abrirCerrarHamburguesa}) => {
    return (
        <>
            <FaBars className='icono-campana'onClick={abrirCerrarHamburguesa}/>
            
        </>
    )
}
