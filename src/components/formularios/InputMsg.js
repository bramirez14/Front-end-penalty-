import React from 'react'
import './css/inputMsg.css'
export const InputMsg = ({ name, change, width, placeholder }) => {
    return (
        <>
            <textarea
                className="mensaje"
                onChange={change}
                name={name}
                rows="5"
                style={{ width: width }}
                placeholder={ placeholder}
            />
        </>
    )
}
