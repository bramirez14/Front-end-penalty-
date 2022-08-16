import React, { useEffect, useState } from 'react'

import { numberWithCommas } from '../reportes/helpers/funciones';
import {  Card  } from 'antd';
import {  axiosURLIntranet } from '../../config/axiosURL';
import { TableLiq } from './TableLiq';
export const TablaLiquidacion = ({cliente,setCliente,setDataCheck,dataCheck,screens}) => {

const [data, setData] = useState([]);
const axiosGet = async () => {
    let  res = await axiosURLIntranet.get('/cuentacorriente');
    setData(res.data)
};
useEffect(() => {
    axiosGet();
  }, []);

const buscarCliente= data.filter(c=> c.razonsoc === cliente.razonsoc);
const columns = [

    {
        title: 'Fecha',
        dataIndex: 'fecemision',
        key: 'fecemision',
        lupa:false,
      width:120,

        render:(state, file)=> {
            const fecha=file.fecemision?.split('T')[0]
            return <h5>{fecha}</h5>
        }
      },

      {
        title: 'Factura',
        dataIndex: 'cabeza',
        key: 'cabeza',
        lupa:false,
      width:140,

        render:(state, file)=> <h5>{file.cabeza}</h5>
      },
      {
        title: 'Cod',
        dataIndex: 'codcabeza',
        key: 'codcabeza',
        lupa:false,
        width:70,

        render:(state, file)=> <h5>{file.codcabeza}</h5>
      },
      {
        title: 'Importe',
        dataIndex: 'saldoml',
        key: 'saldoml',
        editable: true,
        lupa:false,
        width:140,

        render:(state, file)=><h5>${numberWithCommas(file.saldoml)}</h5>
      },


]
const newctactes=buscarCliente?.map((c,i)=> 
    { 
        return{
...c,
key:(i+1).toString()

}})

    return (
      <>
   
      <Card>
       <TableLiq col={columns} 
       datos={newctactes}
    setDataCheck={setDataCheck}
    dataCheck={dataCheck}
    setDatos={setData}
    />
      </Card> 
      </>
      
    )
}
