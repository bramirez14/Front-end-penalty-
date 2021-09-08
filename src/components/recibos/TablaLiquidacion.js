import React, { useState } from 'react'
import { PeticionGETIntranet } from '../../config/PeticionGET';
import { HelperTABLEobj } from '../../helpers/HelperTABLEobj'

export const TablaLiquidacion = () => {
    const [dataCheck, setDataCheck] = useState()
    const ctactes = PeticionGETIntranet('/cuentacorriente');
console.log(dataCheck,'line 8');
const columns = [

    {
        title: 'Fecha',
        dataIndex: 'fecemision',
        key: 'fecemision',
        lupa:false,
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
        render:(state, file)=> <h5>{file.cabeza}</h5>
      },
      {
        title: 'Comprobante',
        dataIndex: 'codcabeza',
        key: 'codcabeza',
        lupa:false,
        render:(state, file)=> <h5>{file.codcabeza}</h5>
      },
      {
        title: 'Importe',
        dataIndex: 'saldoml',
        key: 'saldoml',
        lupa:false,
        render:(state, file)=> <h5>{file.saldoml}</h5>
        
      },


]
const newctactes=ctactes.map((c,i)=> 
    { 
        return{
...c,
key:(i+1).toString()

}})
console.log(newctactes);

    return (
        <HelperTABLEobj
        columns={columns}
        data={newctactes}
        check={true}
        setDataCheck={setDataCheck}

        />
    )
}
