import { Button, Card } from 'antd';
import React, { useState } from 'react'
import { PeticionGETIntranet } from '../../config/PeticionGET';
import { HelperTABLEobj } from '../../helpers/HelperTABLEobj'
import { numberWithCommas } from '../reportes/helpers/funciones';

export const TablaLiquidacion = ({cliente,setCliente,setDataCheck,dataCheck,screens}) => {
const ctactes = PeticionGETIntranet('/cuentacorriente');

const buscarCliente= ctactes.filter(c=> c.razonsoc === cliente.razonsoc)
const columns = [

    {
        title: 'Fecha',
        dataIndex: 'fecemision',
        key: 'fecemision',
        lupa:false,
      width:100,

        render:(state, file)=> {
            const fecha=file.fecemision.split('T')[0]
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
        lupa:false,
        width:100,

        render:(state, file)=> <h5>${numberWithCommas(file.saldoml)}</h5>
        
      },


]
const newctactes=buscarCliente?.map((c,i)=> 
    { 
        return{
...c,
key:(i+1).toString()

}})

    return (
      <Card>
      <HelperTABLEobj
            title={<h2 style={{textAlign:'center'}}><b>LIQUIDACION</b></h2>}
            columns={columns}
            data={newctactes}
            check={true}
            setDataCheck={setDataCheck}
          bordered={false}
    y={screens.xs===false?'':400}

            />
      </Card>
      
    )
}
