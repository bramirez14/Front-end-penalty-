import React from "react"
import { Card, Avatar } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';

export const CardImg =({data,
    handleDelete,
    categoria,
    importe,
    notas,
    pago,
    medio})=>{

    const { Meta } = Card;

    return(
        <Card
        style={{ width: 240,marginLeft:40,marginTop:70}}
        cover={
          <img
          style={{width:200,height:200,borderRadius:20 }}
            alt="No Hay Imagen"
            src={data[0]?.src}
          />
        }
   
      >
        <Meta
      title="Datos"
      description={
       <>
        <h5>
          {" "}
          Categoria: <span className="sp">{categoria}</span>
        </h5>
        <h5>
          {" "}
          {medio} <span className="sp">{pago}</span>
        </h5>
        <h5>
          {" "}
          Importe: <span className="sp">{importe}</span>
        </h5>
        <h5 className="h5">
          {" "}
          Nota: <p className="overflow-visible">{notas}</p>{" "}
        </h5>
        </>
      }
    />
      </Card>

    )
}