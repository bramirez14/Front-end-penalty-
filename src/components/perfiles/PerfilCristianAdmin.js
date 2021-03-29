import React from 'react'
import {useContext,useEffect} from 'react'
import { UserContext } from '../../contexto/UserContext'
import SidebarContext from '../context/SidebarContext'
import './css/perefilCristianAdmin.css'

import { Tarjeta } from '../helperPerfiles/Tarjeta'
export const PerfilCristianAdmin = () => {
 const Text=useContext(UserContext)
const {open}=Text
    return (
        <>
   
        <div className={!open?'container':'container-active'}>
          <div className={!open?'sector1':'sector1-active'}>
          <Tarjeta
          width= 'auto'
          margin='20px'
          />
         <Tarjeta
          width= 'auto'
          margin='10px'
          /> <Tarjeta
          width= 'auto'
          margin='20px'
          />

<Tarjeta
          width= 'auto'
          margin='10px'
          />





</div>
          <div className='sector2'>2</div>
          <div className ='sector3'>3</div>
          <div className='sector4'>4</div>
        </div>
        </>
    )
}
