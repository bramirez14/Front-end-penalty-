import React,{useState} from 'react';
import { Card,Row, Col } from 'antd';




export const CardTitle = ({gasto,sueldo,vacaciones})=> {
  const tabList = [
    {
      key: 'tab1',
      tab: 'Ant. Gasto',
    },
    {
      key: 'tab2',
      tab: 'Ant. Sueldo',
    },
    {
      key: 'tab3',
      tab: 'Ant. Vacaciones',
    },
  ];;
  
  const contentList = {
    tab1: 
    <Row gutter={[10,10]}>
    {gasto.map(g=>(
    <Col span={12}>

    <Card >
    <p><b>Fecha:</b> {g.fecha}</p>
    <p><b>Importe:</b> {g.importe}  </p>
    <p><b>Forma de pago:</b> {g.formapago.pago}</p>
  </Card>
</Col>

  ))}
</Row>,
    tab2: <Row gutter={[10,10]}>
    {sueldo?.map(s=>(
    <Col span={12}>

    <Card >
    <p><b>Fecha:</b> {s.fecha}</p>
    <p><b>Importe:</b> {s.importe}  </p>
    <p><b>Cuotas:</b> {s.cuotas}</p>
    <p><b>Forma de devolucion:</b> {s.sueldo}</p>

  </Card>
</Col>

  ))}
</Row>,
    tab3: 
    <Row gutter={[10,10]}>
    {vacaciones?.map(v=>(
    <Col span={12}>
    <Card >
    <p><b>Fecha:</b> {v.fechaSolicitud}</p>
    <p><b>Periodo:</b> {v.periodo}  </p>
    <p><b>Fecha Desde:</b> {v.fechaDesde}  </p>
    <p><b>Fecha Hasta:</b> {v.fechaHasta}  </p>
    <p><b>Dias Faltantes:</b> {v.diasFaltantes}  </p>

  </Card>
</Col>

  ))}        
</Row>,

  };
  const [state, setState] = useState({
    key: 'tab1',
  })

  const onTabChange = (key, type) => {
    setState({ [type]: key });
  };

    return (
      <>
        <Card
          style={{ width: '100%' }}
          tabList={tabList}
          activeTabKey={state.key}
          onTabChange={key => onTabChange(key, 'key')}
        >
          {contentList[state.key]}
        </Card>
       
      </>
    );
  
}
