import React, { useState } from "react";
import { Col, Row, List, Avatar, Card, Tag } from "antd";
import { axiosURL } from "../../config/axiosURL";
import { Drawers } from "./Drawer";
import "./css/listaUsuarios.css";
export const ListaUsuarios = ({ lista }) => {
  const [visible, setVisible] = useState(false);
  const [DatosPersonales, setDatosPersonales] = useState({});
  const [gasto, setGasto] = useState([]);
  const [sueldo, setSueldo] = useState([]);
  const [vacaciones, setVacaciones] = useState([]);

  const TodosLosUsuarios = lista;
  console.log(TodosLosUsuarios);
  const showDrawer = async (id) => {
    console.log(id);
    const acum = [];
    /**Sector gastos */
    let e = TodosLosUsuarios.find((q) => q.id === id);
    const egasto = e.gasto?.map((g) => g.id);
    for (let i = 0; i < egasto?.length; i++) {
      const P = await axiosURL(`./gastos/${egasto[i]}`);
      acum.push(P.data);
      setGasto(acum);
    }
    acum.map((a) => {
      return {
        importe: a.importe,
      };
    });
    setSueldo(e.anticipo);
    setVacaciones(e.vacacion);

    setDatosPersonales(e);
    setVisible(true);
    /** Fin sector gastos */
  };
  // console.log(DatosPersonales);
  const onClose = () => setVisible(false);
  /**Selecion de Colores para conectado*/



  return (
    <>
      <Row gutter={[20, 20]} style={{ marginTop: 20 }}>
        {/* <CardAprobaciones/> */}
        <Col xs={24} sm={24} md={24} lg={15} xl={15}>
          <Card title="Usuarios">
            <div className="lista-usuarios">
              <List
                itemLayout="horizontal"
                dataSource={TodosLosUsuarios}
                renderItem={(item) => (
                  <List.Item
                    actions={[
                      <a onClick={() => showDrawer(item.id)} key={item.id}>
                        <Tag color="green">perfil</Tag>
                      </a>,
                    ]}
                  >
                    <List.Item.Meta
                      avatar={<Avatar src={item.imagen} />}
                      title={
                        <>
                          {item.nombre} {item.apellido}
                        </>
                      }
                      description={item.email}
                    />
                  </List.Item>
                )}
              />
            </div>
          </Card>
        </Col>
      </Row>
      <Drawers
        onClose={onClose}
        visible={visible}
        DatosPersonales={DatosPersonales}
        gasto={gasto}
        sueldo={sueldo}
        vacaciones={vacaciones}
      />
    </>
  );
};
