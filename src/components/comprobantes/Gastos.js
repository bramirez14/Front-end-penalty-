import React, { useState } from "react";
import {
  Drawer,
  List,
  Avatar,
  Descriptions,
  Divider,
  Typography 

} from "antd";

import { PdfoImg } from "../../helpers/PdfoImg";
import { numeroConComa } from "../../helpers/funcioneshelpers";
import { PeticionGET } from "../config/PeticionGET";
const { Title } = Typography;
export const Gastos = () => {
  const [gasto, setGasto] = useState([]);
  const [visible, setVisible] = useState(false);
  const showDrawer = (item) => {
    setGasto(item);
    setVisible(true);
  };
  const onClose = () => setVisible(false);
  const GET_gastos= PeticionGET('/gastos')
  
  return (
    <>
      <List
      header={<h2>Lista de Gastos</h2>}
        style={{ margin: "auto", width: 700, backgroundColor:'#ffff',borderRadius:20, }}
        dataSource={GET_gastos}
        bordered
        renderItem={(item) => (
          <List.Item
            key={item.id}
            actions={[
              <a onClick={() => showDrawer(item)} key={`a-${item.id}`}>
                View Profile
              </a>,
            ]}
          >
            <List.Item.Meta
              avatar={<Avatar src={item.usuario.imagen} />}
              title={
                <>
                 <h3>
                  {item.usuario.nombre} {item.usuario.apellido}
                </h3>
                <h3>Rendicion n°: <b>{item.id}</b></h3>
               
                </>
              }
              description={<h4>fecha: <b>{item.fecha}</b></h4>}
            />
          </List.Item>
        )}
      />
      <Drawer width={800} placement="right" onClose={onClose} visible={visible}>
        <div style={{ padding: 40 }}>
        <Divider orientation="left" plain>
          <Title level={3}> {`Informe de Gasto ${gasto.id}`}</Title>
    </Divider>
          <Descriptions  >
            <Descriptions.Item label="Importe">
              <b>${numeroConComa(gasto.importe)}</b>
            </Descriptions.Item>
            <Descriptions.Item label="Fecha">
              <b>{gasto.fecha} </b>
            </Descriptions.Item>
            <Descriptions.Item label="Estado">
              <b>{gasto.estadoFinal}</b>
            </Descriptions.Item>
          </Descriptions>
          <Divider orientation="left" plain>
          <Title level={3}>Rendiciones</Title>
    </Divider>
          <Descriptions bordered>
            {gasto?.rendicion?.map((g) => (
              <>
                <Descriptions.Item label="Importe">
                  ${numeroConComa(g.importe)}
                </Descriptions.Item>
                <Descriptions.Item label="Categoria">
                  {g.categoria}
                </Descriptions.Item>
                <Descriptions.Item label="archivo">
                  {" "}
                  <PdfoImg file={g.archivo} />
                </Descriptions.Item>
              </>
            ))}
          </Descriptions>
        </div>
      </Drawer>
    </>
  );
};
