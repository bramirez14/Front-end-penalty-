import React,{useState} from 'react'
import { Card } from 'antd';
import { CobranzaMes } from './CobranzaMes';
import { CobranzaAnno } from './CobranzaAnno';


const tabList = [
    {
      key: 'tab1',
      tab: 'Cobranza Mes',
    },
    {
      key: 'tab2',
      tab: 'Cobranza Año',
    },
    
  ];
 

  const contentList = {
    tab1: <CobranzaMes/>,
    tab2: <CobranzaAnno/>,
  };
export const Cobranza = () => {

    const [state, setState] = useState({key: 'tab1'})
    console.log(state);
      const onTabChange = (key, type) => {
        console.log(key, type);
        setState({ [type]: key });
      };
      
    return (
        <Card
        style={{ width: '100%' }}
        title={<h1>Listado Cobranzas por Vendedor/ Cliente</h1>}
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
