import React from 'react'
import logo from '../../logoPenalty.jpg'
import './encabezado.css'
export const Encabezado = () => {
    return (
        <div className='contendor-encabezado'>
        
        <img src={logo} className='logo' alt='logo'/>
        <p> <b>E-mail:</b> info@penalty.com.ar <br/>
        <b>Telefono:</b>+54112120-0200 <br/>
        <b>Sito Web:</b>  www.penalty.com.ar <br/>
        PenaltyArgentina S.A.  <br/>
        <b>Direccion:</b> Av.Libertador 6680  <br/>
        CABA
        
        </p>
</div>
    )
}
