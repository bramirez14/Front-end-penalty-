import React, { useState } from "react";
import { Col, Row, Drawer, List, Avatar, Divider} from "antd";
import PeticionGET from "../../config/PeticionGET";
import axiosURL from "../../config/axiosURL";
import { CardTitle } from "./CardTitle";

export const ListaUsuarios = ({lista}) => {
  const [visible, setVisible] = useState(false);
  const [DatosPersonales, setDatosPersonales] = useState({});
  const [gasto, setGasto] = useState([]);
  const [sueldo, setSueldo] = useState([])
  const [vacaciones, setVacaciones] = useState([])
  const {
    email,
    imagen,
    tipousuario,
    categoria,
    nvendedor,
    fechaContratacion,
    departamento,
    cel,
  } = DatosPersonales;
  const TodosLosUsuarios = lista

  const showDrawer = async (id) => {
    console.log(id);
    const acum =[];
    /**Sector gastos */
    let e = TodosLosUsuarios.find((q) => q.id === id);
    const egasto=e.gasto?.map(g=>g.id);
    for (let i = 0; i < egasto?.length; i++) {
      const P= await axiosURL(`./gastos/${egasto[i]}`)
     acum.push(P.data)
      setGasto(acum)
    }
   acum.map(a=> {return{
    importe:a.importe

   }})
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
          {" "}
          <b>Si</b>{" "}
        </span>
      );
    } else {
      return (
        <span style={{ color: "red" }}>
          {" "}
          <b>No</b>{" "}
        </span>
      );
    }
  };

  return (
    <>
      <Row style={{ marginTop: 20 }}>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <List bordered className="lista">
            {TodosLosUsuarios?.map((q, i) => (
              <>
                <List.Item
                  key={q.id}
                  actions={[
                    <a onClick={(id) => showDrawer(q.id)} key={q.id}>
                      View Profile
                    </a>,
                  ]}
                >
                  <List.Item.Meta
                    key={q.id}
                    avatar={<Avatar src={q.imagen} />}
                    title={
                      <a href="https://ant.design/index-cn">
                        {q.nombre} {q.apellido}
                      </a>
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
        </Col>
      </Row>

      <Drawer
        width={640}
        placement="right"
        closable={false}
        onClose={onClose}
        visible={visible}
      >
        <p
          className="site-description-item-profile-p"
          style={{ marginTop: 40 }}
        >
          Datos del Usuario
        </p>
        <Row>
          <Col span={24}>
            <img
              src={imagen}
              alt=""
              style={{
                width: 200,
                height: 200,
                marginBottom: 20,
                borderRadius: 20,
              }}
            />
          </Col>

          <Col span={12}>
            <p>
              {" "}
              <b>Nombre</b>: {DatosPersonales.nombre}
            </p>
          </Col>

          <Col span={12}>
            <p>
              {" "}
              <b>Apellido</b>: {DatosPersonales.apellido}{" "}
            </p>
          </Col>

          <Col span={12}>
            <p>
              <b>Tipo de usuario</b>: {tipousuario}
            </p>
          </Col>

          <Col span={12}>
            <p>
              <b>Email</b>: {email}
            </p>
          </Col>

          <Col span={12}>
            <p>
              <b>Fecha de Contratacion</b>: {fechaContratacion}
            </p>
          </Col>
          <Col span={12}>
            <p>
              <b>Categoria </b>: {categoria}
            </p>
          </Col>
          <Col span={12}>
            <p>
              <b>N de vendedor </b>: {nvendedor}
            </p>
          </Col>
          <Col span={12}>
            <p>
              <b>Departamento </b>: {departamento?.departamento}
            </p>
          </Col>
          <Col span={12}>
            <p>
              <b>Cel</b>: {cel}
            </p>
          </Col>
          <Col span={12}>
            <p>
            

            </p>
          </Col>
        </Row>
        <Divider orientation="left">Solicitudes Realizadas </Divider>

       
       <CardTitle gasto={gasto} sueldo={sueldo} vacaciones={vacaciones}/>
      </Drawer>
    </>
  );
};
