import React, { useContext } from "react";
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
import "./mensajes.css";
import { UserContext } from "../../contexto/UserContext";
import { run } from "../helper/funciones";
import {Link} from "react-router-dom";
import { axiosURL } from "../../config/axiosURL";
import { PeticionGET } from "../../config/PeticionGET";

export const Mensajes = () => {
  const { alertas, nuevasAlertas } = useContext(UserContext);
console.log(alertas);
const id = localStorage.getItem('uid');
const usuario = PeticionGET(`/${id}`);
 const filtroEmail = alertas.filter( a => a.receptor === usuario?.email );

  function handleMenuClick(e) {
    message.info("La notificacion se elimino con exito!!!");
    console.log("click", e);
  }
  const handleCard = async(id) => {
    console.log(id);
    await axiosURL.put(`/msg/alerta/${id}`)
    nuevasAlertas();
  }
 // /vista/rendicion/gasto
 const N = localStorage.getItem('N');
/*  let filtro905= (N==='905')?
    filtro.map(f=> {return{

    }})
   */



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
          <List
            className="demo-loadmore-list"
            bordered={false}
            itemLayout="horizontal"
            dataSource={filtroEmail}
            renderItem={(item) => (
              <List.Item style={{borderBottom:'none'}}
              className= {item.estado === 'activa'? 'lista-alerta-card':'list-inactiva'}
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
                    title={<Link to={item.path} >{item.info}</Link>}
                    description={
                      <>
                      <div className="item-alerta" style={{ color: "black" }}>
                      
                        {item.alerta}
                       <p style={{color:'#46a461'}}> hace {run(item.f)}</p>
                      </div>
                      </>
                    }
                  />
                </Skeleton>
              </List.Item>
            )}
          />
        </Card>
      </Col>
    </Row>
  );
};
