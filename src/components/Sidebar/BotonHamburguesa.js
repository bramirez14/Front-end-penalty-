import React from 'react'
import './css/botonHamburguesa.css'
export const BotonHamburguesa = ({open,click}) => {
    return (
    
        <button onClick={click} className= {open? 'hamburger hamburger--emphatic is-active' :'hamburger hamburger--emphatic'} type="button">
        <span className="hamburger-box">
          <span className="hamburger-inner"></span>
        </span>
      </button>  
      
    )
}
