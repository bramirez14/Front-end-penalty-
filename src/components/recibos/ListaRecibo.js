import React from 'react'
import { List, Button, Grid, Tag, Card  } from 'antd';
import { PeticionGETIntranetCobranzas } from '../../config/PeticionGET';
import { HelperTABLEobj } from '../../helpers/HelperTABLEobj';
import { DownloadOutlined } from '@ant-design/icons';
const { useBreakpoint } = Grid;

  export const ListaRecibo = ({ history}) => {
 /**evitar que usuari 907 ingresen a la ruta */
 const N = localStorage.getItem('N');
 ( N !== "907" && N!== '901' )&& history.push("/perfil");
    const getRecibos= PeticionGETIntranetCobranzas('/ingresos/recibos');
    const numerorecibo=getRecibos[0]?.map(g=>g.numerorecibo);
    const nreciboSinRecibo= [...new Set(numerorecibo)]
    const handleNrecibo=(file)=> {
    history.push(`/carga/recibo/${file.numerorecibo}`)
 }



 const reducido= getRecibos[0]?.reduce((acum,elemet)=>{
  if( !acum.find(d=> d.numerorecibo == elemet.numerorecibo)){
    acum.push(elemet)
  }
  return acum
 },[])
 console.log(reducido,26);
 const screens = useBreakpoint();

 const columns = [
  {
    title: 'N de recibo',
    dataIndex: 'numerorecibo',
    key: 'numerorecibo',
    lupa:false,
    width:100,
  },
  {
    title: 'Razon Social',
    dataIndex: 'razonsocial',
    key: 'razonsocial',
    lupa:false,
    width:100,


  },
  {
    title: 'N comprobante',
    dataIndex: 'ncomprobante',
    key: 'ncomprobante',
    lupa:false,
    width:100,


  },
  {
    title: 'Pdf',
    dataIndex: 'pdf',
    key: 'pdf',
    lupa:false,
    width:100,


    render:(state, file)=> <DownloadOutlined />
  },
  {
    title: '',
    dataIndex: 'ingresar',
    key: 'ingresar',
    lupa:false,
    width:100,


    render:(state, file)=> <Button onClick={() => handleNrecibo(file)}>Ingresar</Button>
  },


 ]
 console.log(screens,'line 70 lista recibo');
    return (
        <Card className='lista-recibo'>
<HelperTABLEobj
title={<h2 style={{textAlign:'center'}}> <b> Recibos </b> </h2>}
columns={columns}
data={reducido?.reverse()}
y={screens.md===false?300:''}
bordered={false}
/>
     </Card>  
    )
}
