import React,{useState} from 'react'
import './css/botonHamburguesa.css'
export const BotonHamburguesa = ({open,click}) => {
    //const [hamburguesaOpen, setHamburguesaOpen] = useState(false);
    //const showHamburguesa = () => setHamburguesaOpen(!hamburguesaOpen)

    return (
    
        <button onClick={click} className= {open? 'hamburger hamburger--emphatic is-active' :'hamburger hamburger--emphatic'} type="button">
        <span className="hamburger-box">
          <span className="hamburger-inner"></span>
        </span>
      </button>  
      
    )
}
