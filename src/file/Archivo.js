import React from 'react'
import './archivo.css'

export const Archivo = ({change}) => {
   

    return (
        <div className="button-wrapper">
        <span className="label">
         SUBIR PDF
        </span>
          <input type="file" name='file' id="upload" className="upload-box" placeholder="Upload File" onChange={change}/>
        
      </div>
    )
}
