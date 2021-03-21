import React from 'react'
import { FaHandHoldingUsd, FaAngleDown } from "react-icons/fa";
import DatePicker from "react-datepicker";
import { SiGooglecalendar } from "react-icons/si";

//import './css/inputCalendario.css'

export const InputCalendario = ({calendar,selected}) => {
    return (
       

       <div className='oooo'>
          
          <label className="label-icon-calendar">
          <SiGooglecalendar className="icono-calendario" />
          </label>

          <DatePicker
                className="input"
                
                onChange={calendar}
                selected={selected}
                dateFormat="dd/MM/yyyy"
              />
</div>
   
     
      
    
    )
}
