import React,{useContext} from "react";
import { Row, Col, Card, List, Avatar, Button, Menu, Dropdown, message, Skeleton } from "antd";
import { EllipsisOutlined,} from "@ant-design/icons";
import { AiOutlineDelete } from "react-icons/ai";
import "./mensajes.css";
import { UserContext } from "../../contexto/UserContext";

export const Mensajes = () => {
  const {alertas,nuevasAlertas} = useContext(UserContext)

  function handleMenuClick(e) {
    message.info("Click on menu item.");
    console.log("click", e);
  }
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
const N = localStorage.getItem('N')
  return (
    <Row>
    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
    <Card
    title="Notificaciones"
    className="contenedor-alerta"
  >
     <List
      className="demo-loadmore-list"
      itemLayout="horizontal"
      dataSource={alertas}
      renderItem={item => (
        <List.Item
          actions={[<Dropdown overlay={menu}>
            <Button
              shape="circle"
              icon={<EllipsisOutlined style={{ fontSize: 28 }} />}
              size="large"
              className="boton-alerta"
            />
          </Dropdown>]}
        >
          <Skeleton avatar title={false} loading={item.loading} active>
            <List.Item.Meta
              avatar={
                <Avatar src={item.usuario.imagen} />
              }
              title={<a href="https://ant.design">{item.info}</a>}
              description={<div className='item-alerta' style={{color:'black'}}>{item.alerta}</div>}
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
