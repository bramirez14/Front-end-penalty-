import React from 'react'
import logo from '../../logoPenalty.jpg'
import './css/encabezado.css'
export const Encabezado = () => {
    return (
        <div className='contendor-encabezado'>
   <img src={logo}  alt='logo'/>
   <div>
        <p> <b className='negrita'> E-mail:</b> info@penalty.com.ar <br/>
        <b className='negrita'>Telefono:</b>+54112120-0200 <br/>
        <b className='negrita'>Sito Web:</b>  www.penalty.com.ar <br/>
        PenaltyArgentina S.A.  <br/>
        <b className='negrita'>Direccion:</b> Av.Libertador 6680  <br/>
        CABA
        </p>
        </div>
  
</div>
    )
}
