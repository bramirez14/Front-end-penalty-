import React, { useState } from "react";
import { useSelector } from "react-redux";
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
const { Title } = Typography;
export const Gastos = () => {
  const [gasto, setGasto] = useState([]);
  const [visible, setVisible] = useState(false);
  const showDrawer = (item) => {
    setGasto(item);
    setVisible(true);
  };
  const onClose = () => setVisible(false);
  const GET_gastos = useSelector((state) => state.peticiones_GET.gastos); //viene de  redux

  return (
    <>
      <List
        style={{ margin: "auto", width: 700 }}
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
                <h4>
                  {item.usuario.nombre} {item.usuario.apellido}
                </h4>
              }
              description={<h4>fecha: {item.fecha}</h4>}
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
