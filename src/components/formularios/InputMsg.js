import React from 'react'
import './css/inputMsg.css'
export const InputMsg = () => {
    return (
        <>
              <textarea
              className="mensaje"
        
              name="mensaje"
              rows="5"
              cols="34"
              defaultValue="Mensaje:"
              
             // onChange={handleChange}
            />
        </>
    )
}
