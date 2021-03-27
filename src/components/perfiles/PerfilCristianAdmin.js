import React from 'react'
import {useContext,useEffect} from 'react'
import { UserContext } from '../../contexto/UserContext'
import SidebarContext from '../context/SidebarContext'
import './css/perefilCristianAdmin.css'

export const PerfilCristianAdmin = () => {
 const Text=useContext(UserContext)
const {open}=Text
   console.log(open);
    return (
        <>
   
        <div className={!open?'container':'container-active'}>
          <div className='sector1'> 1</div>
          <div className='sector2'>2</div>
          <div className ='sector3'>3</div>
          <div className='sector4'>4</div>
        </div>
        </>
    )
}
