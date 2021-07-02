import React,{useState} from 'react'
import { Card } from 'antd';
import { PeticionGETIntranet } from '../../config/PeticionGET';

const tabList = [
    {
      key: 'tab1',
      tab: 'Facturacion Mes',
    },
    {
      key: 'tab2',
      tab: 'Remitado',
    },
    {
        key: 'tab3',
        tab: 'Facturacion por Año ',
      },
      {
        key: 'tab4',
        tab: 'Facturacion Mes Gral',
      },{
        key: 'tab5',
        tab: 'Facturacion Año Gral',
      },
      {
        key: 'tab6',
        tab: 'Exportar a Excel',
      },
  ];
  const columnas=[
    {
        title: 'N° de vendedor',
        dataIndex: 'vendedor',
        key: 'vendedor',
        width: '30%',
      },
    {
        title: 'N° de Cliente',
        dataIndex: 'cliente',
        key: 'cliente',
    },
    {
        title: 'Razon Social',
        dataIndex: 'razonsoc',
        key: 'razonsoc',
        width: '200px',
      },
    {
      title: 'Unidades',
      dataIndex: 'UNIDADES',
      key: 'UNIDADES',
    },
    {
        title: 'Importe',
        dataIndex: 'Importe',
        key: 'Importe',
      },
  ]

  const contentList = {
    tab1: <p>content1</p>,
    tab2: <p>


    </p>,
  };
export const FacturaVendedor = () => {

    const [state, setState] = useState({key: 'tab1'})
    console.log(state);
      const onTabChange = (key, type) => {
        console.log(key, type);
        setState({ [type]: key });
      };
    //buscar en ant un metodo para poder intercambiar cada tabla
    // hacer las 6 tablas 
    //imprimir  las tablas de la Db 
    // hacer importacion a excel.
    const remmes= PeticionGETIntranet('/')
      
    return (
        <Card
        style={{ width: '100%' }}
        title={<h1>Listado Ventas por Vendedor / Cliente</h1>}
        extra={<a href="#">More</a>}
        tabList={tabList}
        activeTabKey={state.key}
        onTabChange={key => {
          onTabChange(key, 'key');
        }}
      >
        {contentList[state.key]}
      </Card>
    )
}
