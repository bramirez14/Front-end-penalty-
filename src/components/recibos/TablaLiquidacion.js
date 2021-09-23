
import React, { useEffect, useState } from 'react'
import { PeticionGETIntranet } from '../../config/PeticionGET';
import { HelperTABLEobj } from '../../helpers/HelperTABLEobj'
import { numberWithCommas } from '../reportes/helpers/funciones';
import {  Card, Input, Form,Button } from 'antd';
import {  axiosURLIntranet } from '../../config/axiosURL';
import { TableLiq } from './TableLiq';
export const TablaLiquidacion = ({cliente,setCliente,setDataCheck,dataCheck,screens}) => {
const ctactes = PeticionGETIntranet('/cuentacorriente');

const [data, setData] = useState([]);
const axiosGet = async () => {
    let  res = await axiosURLIntranet.get('/cuentacorriente');
    setData(res.data)
};

useEffect(() => {
    axiosGet();
  }, []);

  console.log(data,'line 21');
const buscarCliente= data.filter(c=> c.razonsoc === cliente.razonsoc);
console.log(dataCheck,'line 23');
const columns = [

    {
        title: 'Fecha',
        dataIndex: 'fecemision',
        key: 'fecemision',
        lupa:false,
      width:100,

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
      width:100,

        render:(state, file)=> <h5>{file.cabeza}</h5>
      },
      {
        title: 'Comprobante',
        dataIndex: 'codcabeza',
        key: 'codcabeza',
        lupa:false,
        width:100,

        render:(state, file)=> <h5>{file.codcabeza}</h5>
      },
      {
        title: 'Importe',
        dataIndex: 'saldoml',
        key: 'saldoml',
        editable: true,
        lupa:false,
        width:100,

        render:(state, file)=><h5>{file.saldoml}</h5>
      },


]
const newctactes=buscarCliente?.map((c,i)=> 
    { 
        return{
...c,
key:(i+1).toString()

}})
const handelChange=(e,value)=>{
console.log(e,value);
}
console.log(data,'line84');
const editar=()=>{
  const one=data[0]
setData([...data,{one,saldoml:200}])
  }
    return (
      <>
    <TableLiq col={columns} datos={newctactes}/>
      {/* <Card>
        <Button onClick={editar}>
          ediar 
        </Button>
        <Form onChange={handelChange}>
      <HelperTABLEobj
            title={<h2 style={{textAlign:'center'}}><b>LIQUIDACION</b></h2>}
            columns={columns}
            data={newctactes}
            check={true}
            setDataCheck={setDataCheck}
            bordered={false}
            y={screens.xs===false?'':400}

            />
            </Form>
      </Card> */}
      </>
      
    )
}
