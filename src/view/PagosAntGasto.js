import React from 'react'
import { Table, Button } from 'antd';
import { PeticionGET } from '../config/PeticionGET';
import { axiosURL } from '../config/axiosURL';

export const PagosAntGasto = ({history}) => {
    const  antGasto = PeticionGET('/gastos');
    const filtroAprobacion= antGasto.filter(a=> a.aprobacion==='Si');
    const pagoRealizado= async (id)=>{
      const {status} =await axiosURL.put(`/pago/gasto/${id}`,{pagoRealizado:'Si'});
      status===200 && history.push('/perfil');
    }
    const columns = [
        {
          title: 'N de Ant Gasto',
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
        <Table columns={columns} dataSource={filtroAprobacion} pagination={false} bordered={true}/>
    )
}
