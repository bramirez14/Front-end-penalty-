import React from 'react'
import './css/inputMsg.css'
export const InputMsg = ({name,change}) => {
    return (
        <>
              <textarea
              className="mensaje"
            onChange={change}
              name={name}
              rows="5"
              cols="34"
              defaultValue="Mensaje:"
              
             // onChange={handleChange}
            />
        </>
    )
}
