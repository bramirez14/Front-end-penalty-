import React,{useState} from 'react'
import { Imagen } from '../img/Imagen'

export const ImagenKm = ({state, setState}) => {
    const [data, setData] = useState([]);
    return (
        <div style={{display:'flex',flexWrap:'nowrap'}}>
        <Imagen ancho={'200px'}
         setData={setData} state={state} setState={setState}
        />
        <div
                style={{
                  border: "solid 1px #ddd",
                  width: "200px",
                  height: "200px",
                  margin: "auto",
                }}
              >
                <img
                  style={{
                    width: "200px",
                    height: "200px",
                    margin: "auto",
                    padding: "20px",
                  }}
                  src={data[0]?.src}
                  alt=""
                />
              </div>
              </div>
    )
}
