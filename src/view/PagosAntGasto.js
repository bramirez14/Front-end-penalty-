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
        title: 'Nombre',
        dataIndex: 'nombre',
        key: 'nombre',
      },
      {
        title: 'Apellido',
        dataIndex: 'apellido',
        key: 'apellido',
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
          title: 'N orden',
          dataIndex: 'norden',
          key: 'norden',
        },
        {
          title: 'PDF',
          dataIndex: 'pdf',
          key: 'pdf',
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
      const datos = filtroAprobacion?.map((f) => {
        return {
          ...f,
          key: f.id,
          nombre: f.usuario.nombre,
          apellido: f.usuario.apellido,
        };
      });

    return (
        <Table columns={columns} dataSource={datos} pagination={false} bordered={true}/>
    )
}
