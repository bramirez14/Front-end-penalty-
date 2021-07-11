import React from 'react'
import { Table,  Space,Button } from 'antd';
import { PeticionGET } from '../config/PeticionGET';
import { axiosURL } from '../config/axiosURL';

export const PagosAntSueldo = ({history}) => {
    
    const  antSueldo = PeticionGET('/anticipo');
    const pagoRealizado= async (id)=>{
      const {status}=await axiosURL.put(`/pago/anticipo/${id}`,{pagoRealizado:'Si'})
      status===200 && history.push('/perfil')
    }
    const columns = [
        {
          title: 'N de Anticipo',
          dataIndex: 'id',
          key: 'id',
          width:'80px',
        },
        {
          title: 'Fecha',
          dataIndex: 'fecha',
          key: 'fecha',
        },
        {
          title: 'Devolucion',
          dataIndex: 'sueldo',
          key: 'sueldo',
        },
      
        {
          title: 'Importe',
          key: 'importe',
          dataIndex: 'importe',
          render:(state,file)=>(<p>${file.importe}</p>)
        },
        {
          title: 'Estado',
          dataIndex: 'estadoFinal',
          key: 'estadoFinal',
        },
        {
          title: 'Acciones',
          key: 'acciones',
          render: (state, file) => (
            <>
            {
              file.pagoRealizado==='Si'?
              <p>Realizado</p>
              :
              <Button onClick={()=>pagoRealizado(file.id)}>Pago Realizado</Button>

            }
            </>
          ),
        },
      ];
    return (
        <Table columns={columns} dataSource={antSueldo} pagination={false} bordered={true}/>
    )
}
