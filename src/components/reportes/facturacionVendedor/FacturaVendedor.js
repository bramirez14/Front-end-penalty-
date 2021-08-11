import React,{useState} from 'react'
import { Card } from 'antd';
import { PeticionGETIntranet } from '../../../config/PeticionGET';
import { FacturacionMes } from './facturaMes/FacturacionMes';
import { Remitado } from '../remitado/Remitado';
import { FacturacionAnno } from './facturacionAnno/FacturacionAnno';
import { FacturacionMesGral } from './facturacionMesGral/FacturacionMesGral';
import { FacturacionAnnoGral } from './facturacionAnnoGral/FacturacionAnnoGral';
const N = localStorage.getItem('N');
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
        tab: N === "0000"||
        N === "905" ||
        N === "906" ||
        N === "903" ||
        N === "902" ||
        N === "901" ||
        N === "907"?'Facturacion Mes Gral':'',
      },{
        key: 'tab5',
        tab:  
        N === "0000"||
       N === "905" ||
       N === "906" ||
       N === "903" ||
       N === "902" ||
       N === "901" ||
       N === "907"? 'Facturacion Año Gral':'',
      },
     
  ];
 

  const contentList = {
    
    tab1: <FacturacionMes/>,
    tab2: <Remitado/>,
    tab3: <FacturacionAnno/>,
    tab4: <FacturacionMesGral/>,
    tab5: <FacturacionAnnoGral/>

    
  };
export const FacturaVendedor = () => {

    const [state, setState] = useState({key: 'tab1'})
    console.log(state);
      const onTabChange = (key, type) => {
        console.log(key, type);
        setState({ [type]: key });
      };
      
    return (
        <Card
        style={{ width: '100%' }}
        title={<h1>Listado Ventas por Vendedor / Cliente</h1>}
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
