import React, { useState } from "react";
import { PeticionGET } from "../../config/PeticionGET";
import { Card, Collapse, Button, Avatar, Row, Col } from "antd";
import { axiosURL } from "../../config/axiosURL";

const tabList = [
  {
    key: "Gasto",
    tab: "Gasto",
  },
  {
    key: "Vacaciones",
    tab: "Vacaciones",
  },
];

const { Panel } = Collapse;
const { Meta } = Card;
export const Verificacion = () => {
  const [rendicion, setRendicion] = useState([]);
  const [state, setState] = useState({
    key: "Gasto",
    noTitleKey: "app",
  });
  const onTabChange = (key, type) => {
    console.log(key, type);
    setState({ [type]: key });
  };

  const getGastos = PeticionGET("/gastos");
  const filtroListo = getGastos.filter((f) => f.listo === "Si");

  const gastoVerificado = async (id) => {
    console.log(id);
    let resp = await axiosURL.put(`/verficacion/gasto/${id}`, {
      aprobacion: "Si",
    });
    console.log(resp.data);
  };

  const style = {
    marginLeft: "10px",
  };

  const contentList = {
    Gasto: (
      <Collapse>
        {filtroListo.map((m) => (
          <>
            <Panel
              header={
                <>
                  <span style={style}>
                    {<Avatar src={m.usuario.imagen} />}
                  </span>
                  <span style={style}># {m.id},</span>
                  <span style={style}>
                    <b>Nombre: </b>
                    {m.usuario.nombre}
                  </span>
                  <span>{m.usuario.apellido},</span>
                  <span style={style}>
                    <b>Fecha de solicitud:</b> {m.fecha},
                  </span>
                  <span style={style}>
                    <b>Importe:</b> ${m.importe}
                  </span>
                  <span style={{ marginLeft: "10px", color: "#52c41a" }}>
                    <b> {m.aprobacion === "Si" && "Completado!!"}</b>
                  </span>
                </>
              }
              key={m.id}
            >
              <Row gutter={20}>
                {m.rendicion.map((mm) => (
                  <>
                    <Col xs={6} sm={6} md={6} lg={6} xl={6}>
                      <Card
                        style={{
                          width: 200,
                          height: 320,
                          border: "solid 2px #ddd",
                        }}
                        cover={
                          <img
                            alt="example"
                            src={mm.imagen}
                            alt="No hay imagen"
                            style={{
                              borderRadius: "10px",
                              width: 200,
                              height: 150,
                            }}
                          />
                        }
                      >
                        <Meta
                          title={mm.categoria}
                          description={
                            <>
                              <p>fecha: {mm.fecha}</p>
                              <p>importe: ${mm.importe}</p>
                            </>
                          }
                        />
                      </Card>
                    </Col>
                  </>
                ))}
              </Row>
              {m.aprobacion === "Si" ? (
                "Completado"
              ) : (
                <Button
                  onClick={() => gastoVerificado(m.id)}
                  style={{ marginTop: 20 }}
                >
                  Ok
                </Button>
              )}
            </Panel>
          </>
        ))}
      </Collapse>
    ),
    Vacaciones: <p>En Contruccion!!!</p>,
  };

  return (
    <>
      <Card
        style={{ width: "100%" }}
        title="Verificaciones"
        tabList={tabList}
        activeTabKey={state.key}
        onTabChange={(key) => {
          onTabChange(key, "key");
        }}
      >
        {contentList[state.key]}
      </Card>
    </>
  );
};
