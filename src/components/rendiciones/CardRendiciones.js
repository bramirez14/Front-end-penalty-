import React from "react";
import "./css/cardRendiciones.css";
import { Button } from "antd";
import {Link} from 'react-router-dom'
import { List,  } from 'antd';
import { axiosURL } from "../../config/axiosURL";
import Swal from 'sweetalert2'
import { PdfoImg } from "../../helpers/PdfoImg";

export const CardRendiciones = ({data,axiosGet,imagen,categoria,importe,fecha,notas,uid}) => {
 const handleDeleteRendicion = async (id)=> {
 
   const result= await Swal.fire({
  title: 'Estas seguro?',
  text: "¡No podrás revertir esto!",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Borrar!'
})
console.log(result);
  if (result.isConfirmed) {
    await axiosURL.delete(`/delete/rendicion/gasto/${id}`)
    Swal.fire("Borrado!", "Su archivo se borró con exito.", "success");
    axiosGet();
  }

   
  
 }
  return (
    <>
   
    <List
    itemLayout="vertical"
    size="large"
    dataSource={data}
  bordered={true}
  pagination={{
    pageSize: 4,
  }}
  className="list-card"
    renderItem={item => (
      <List.Item
        key={item.title}
        actions={[
          <div style={{display:'flex',flexWrap:'nowrap'}}>
            <Link
          to={`/editar/rendicion/${item.id}`}>
        <Button
          style={{ borderRadius:'10px'}}
        >
        Editar
        </Button>
        </Link>
        
        <Button onClick={() => handleDeleteRendicion(item.id)}
          style={{ borderRadius:'10px',marginLeft:20,}}
        >
      Borrar
        </Button>
    
          </div>
          ]}
          extra={
            <PdfoImg file={item.archivo} style={{fontSize:40}} height={200} width={200}
          
          />
            }
      >
        <List.Item.Meta
         
        />
         <div >
             <h2> <b> Categoria:</b> {item.categoria}</h2>
             <h2> <b>Importe:</b> $  {item.importe}</h2>
             <h2> <b>fecha de ingreso:</b>  {item.fecha} </h2>
            <h2> <b>Descripcion:</b> {item.nota} </h2 > 
            </div>
      </List.Item>
    )}
  />


  </>
    
      
    
  );
};
