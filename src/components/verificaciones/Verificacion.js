import React,{useState} from 'react'
import { PeticionGET } from '../../config/PeticionGET'
import { Card,Collapse,Button,Avatar,Row,Col } from 'antd';
import {Link} from 'react'

const tabList = [
    {
      key: 'tab1',
      tab: 'tab1',
    },
    {
      key: 'tab2',
      tab: 'tab2',
    },
  ];
  const data = [
    {
      title: 'Ant Design Title 1',
    },
    {
      title: 'Ant Design Title 2',
    },
    {
      title: 'Ant Design Title 3',
    },
    {
      title: 'Ant Design Title 4',
    },
  ];
 
  const { Panel } = Collapse;
  const { Meta } = Card;
export const Verificacion = () => {
    const [rendicion, setRendicion] = useState([])
    const [state, setState] = useState({
        key: 'tab1',
        noTitleKey: 'app',
      })
      const onTabChange = (key, type) => {
        console.log(key, type);
        setState({ [type]: key });
      };
    
   const getGastos= PeticionGET('/gastos')
   const filtroListo= getGastos.filter(f=>f.listo==='Si');
   function callback(key) {
    console.log(key);
  }

 const style={
  marginLeft:'10px'
 }
  
  
 
 
const contentList = {
    tab1: <Collapse onChange={callback}>
      
  {  filtroListo.map(m=>
  <>
   <Panel header={
     <>
   <span style={style}># {m.id} </span>
   <span style={style}>,{m.usuario.nombre} </span>
   <span >{m.usuario.apellido}, </span>
   <span style={style}> fecha de solicitud:{m.fecha}, </span>
   <span style={style}> importe: ${m.importe} </span>


</>
     } key={m.id}   >
   <Row gutter={40}>
   {  m.rendicion.map(mm=>
   <>
   <Col xs={6} sm={6} md={6} lg={6} xl={6}>
<Card
    style={{ width: 200, border:"solid 2px #ddd" }}
    cover={
      <img
        alt="example"
        src={mm.imagen}
        alt='No hay imagen'
      />
    }
   
  >
    <Meta
      avatar={<Avatar src={m.imagen} />}
      title={mm.categoria}
      description={
        <>
        <p>{mm.fecha}</p>
        <p>${mm.importe}</p>
        </>
      }
    />
  </Card>
  </Col>
   </>
   )}
   </Row>
   <Button>Ok</Button>
 </Panel>
 
  </>
  )
 }
  </Collapse> ,
    tab2: <p>content2</p>,
  };
 
    return (
        <>
    <Card
          style={{ width: '100%' }}
          title="Verificaciones"
          extra={<a href="#">More</a>}
          tabList={tabList}
          activeTabKey={state.key}
          onTabChange={key => {
            onTabChange(key, 'key');
          }}
        >
          {contentList[state.key]}
        </Card>
       
         
         

      
   
        
        
       
        
    
      
    
      </>
    )
}
