import {
  Row,
  Col,
  Card,
  List,
  Avatar,
  Button,
  Menu,
  Dropdown,
  message,
  Skeleton,
} from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import { AiOutlineDelete } from "react-icons/ai";
import { run } from "../helper/funciones";
import {Link} from "react-router-dom";
import { PeticionGET } from "../../config/PeticionGET";
import InfiniteScroll from 'react-infinite-scroll-component';
import './mensajes.css'

export const Mensajes = ({socket,alertas}) => {
const id = localStorage.getItem('uid');
const usuario = PeticionGET(`/${id}`);
 const filtroEmail = alertas.filter( a => a.receptor === usuario?.email );
 
  function handleMenuClick(e) {
    message.info("La notificacion se elimino con exito!!!");
    console.log("click", e);
  }
  const handleCard = async (id) => {
    socket.emit('editar-alerta',id)
    //getAlertas();
  }
const Listareverse= filtroEmail.reverse();



  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item
        key="1"
        icon={<AiOutlineDelete style={{ fontSize: 17 }} />}
        style={{ fontSize: 17 }}
      >
        <span style={{ marginLeft: 10 }}>Elimnar</span>
      </Menu.Item>
    </Menu>
  );
  return (
    <Row>
      <Col xs={24} sm={24} md={24} lg={24} xl={24}>
        
        <Card title={<h2> <b>Notificaciones</b> </h2>}className="contenedor-alerta" >
        <div
  id="scrollableDiv"
  className='scrollableDiv'
  style={{
    height: 400,
    overflow: 'auto',
  }}
>
        <InfiniteScroll
         dataLength={Listareverse.length}
         hasMore={true}
         scrollableTarget="scrollableDiv"
         >
 

          
          <List
            className="demo-loadmore-list"
           
            bordered={false}
            itemLayout="horizontal"
            dataSource={Listareverse}
            renderItem={(item) => (
              
              <List.Item style={{borderBottom:'none'}}
              className= 'lista-alerta-card'
                actions={[
                  <Dropdown overlay={menu}>
                    <Button
                      shape="circle"
                      icon={<EllipsisOutlined style={{ fontSize: 28 }} />}
                      size="large"
                      className="boton-alerta"
                    />
                  </Dropdown>,
                ]}
              >
                <Skeleton avatar title={false} loading={item.loading} active>
               
                  <List.Item.Meta
                    onClick={()=>handleCard(item.id)}
                    className='item-meta'
                    avatar={<Avatar src={item.usuario.imagen} />}
                    title={<Link style={{color:'#7D7D7D'}} to={item.path} >{item.estado==='activa'? <b style={{color:'#000000'}} >{item.info}</b> : item.info}</Link>}
                    description={
                      <Link to={item.path}>
                      <div className="item-alerta" style={{ color: "black" }}>
                              {item.alerta}
                            <p style={{color:'#46a461'}}> hace {run(item.f)}</p>
                            </div>
                      </Link>
                      
                      
                    }
                  />
                </Skeleton>
              </List.Item>
            )} 
          />
           
        </InfiniteScroll>
        </div>
        </Card>
      </Col>
    </Row>
  );
};
