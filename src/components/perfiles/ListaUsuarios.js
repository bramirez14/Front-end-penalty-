import React, { useState } from "react";
import { Col, Row, List, Avatar,Card } from "antd";
import { axiosURL } from "../../config/axiosURL";
import { Link } from "react-router-dom";
import { Drawers } from "./Drawer";
import { CardEstado } from "./CardEstado";
import './css/listaUsuarios.css'
import { CardAprobaciones } from "./CardAprobaciones";
export const ListaUsuarios = ({ lista }) => {
  const [visible, setVisible] = useState(false);
  const [DatosPersonales, setDatosPersonales] = useState({});
  const [gasto, setGasto] = useState([]);
  const [sueldo, setSueldo] = useState([]);
  const [vacaciones, setVacaciones] = useState([]);

  const TodosLosUsuarios = lista;

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
  const SelecionColores = (conectado) => {
    if (conectado === "SI") {
      return (
        <span style={{ color: "green" }}>
          
          <b>Si</b>
        </span>
      );
    } else {
      return (
        <span style={{ color: "red" }}>
          
          <b>No</b>
        </span>
      );
    }
  };
 

  return (
    <>
      <Row gutter={20} style={{ marginTop: 20 }}>
        <Col xs={15} sm={15} md={15} lg={15} xl={15}>
          <Card>
          <div className='lista-usuarios'>
            <List bordered className="lista">
              {TodosLosUsuarios?.map((q, i) => (
                <>
                  <List.Item
                    key={q.id}
                    actions={[
                      <Link onClick={() => showDrawer(q.id)} key={q.id}>
                        Ver Perfil
                      </Link>,
                    ]}
                  >
                    <List.Item.Meta
                      key={q.id}
                      avatar={<Avatar src={q.imagen} />}
                      title={<>
                          {q.nombre} {q.apellido}
                          </>
                      }
                      description={q.email}
                    />
                    <span className="conectado">
                      Conectado: {SelecionColores(q.conectado)}
                    </span>
                  </List.Item>
                </>
              ))}
            </List>
          </div>
          </Card>
         
        </Col>
        
        <CardAprobaciones/>
       

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
