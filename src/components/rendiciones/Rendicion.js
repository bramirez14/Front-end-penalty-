import React, { useState, useEffect } from "react";
import { Form, Input, Button, Select, Col, Row, Checkbox, Modal,Divider } from "antd";
import "./css/createRendicion.css";
import axiosURL from "../../config/axiosURL";
import { Tabla } from "./Tabla";
import { securedBrowserCache } from 'secured-browser-storage';
import { PeticionJWT } from "../../auth/PeticionJWT";
import { Titulo } from "../titulos/Titulo";

export const Rendicion = ({ history }) => {
  const id = securedBrowserCache.getItem('uid')
let peticionToken= PeticionJWT()

/*   const [rendicion, setRendicion] = useState({
    usuarioId: "",
    responsable: "",
    fecha: new Date().toLocaleDateString(),
    responsable: "",
  }); */
  //const { fecha, usuarioId } = rendicion;
  const [usuario, setUsuario] = useState([]);
  useEffect(() => {
    const getPK = async () => {
      let res = await axiosURL.get(`/${id}`);
      setUsuario(res.data);
    };
    getPK();


  }, []);

  const responsable = (departamento) => {
    let responsable;
    switch (departamento) {
      case "Sistema" || "Logistica":
        responsable = "Esteban Ramos";
        break;
      case "Administracion" || "Marketing":
        responsable = "Cristian De Sousa";
        break;
      default:
        responsable = "Cristian Rios";
        break;
    }
    return responsable;
  };
  return (
    <Form layout="vertical">
      <Row>
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={24}
          xl={24}
          xxl={24}
         
        >
         
           <Titulo titulo='Rendicion de Gastos'/>

              <h3>Empleado: {peticionToken.nombre}, {peticionToken.apellido}</h3>
            
          
          <Divider/>
        </Col>
    

      {/*   <Col
          xs={24}
          sm={24}
          md={12}
          lg={12}
          xl={12}
          xxl={12}
          style={{
            borderBottom: "solid 1px rgba(92, 99, 105, 0.5)",
            borderTop: "solid 1px rgba(92, 99, 105, 0.5)",
          }}
        >
          <div style={{ marginTop: "10px" }}>
            <h6>
              {" "}
              <b>Fecha:</b> {new Date().toLocaleDateString()}{" "}
            </h6>

            <h6>
              <b>Email:</b> {usuario.email}
            </h6>
            <h6>
              <b>Departamento:</b> {usuario.departamento?.departamento}
            </h6>
            <h6>
              <b>Responsable:</b>{" "}
              {responsable(usuario.departamento?.departamento)}
            </h6>
          </div>
        </Col> */}
      </Row>

      <Row>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <Tabla usuario={usuario.gasto} setUsuario={setUsuario} />
        </Col>
      </Row>
      {/* <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12} offset={18}>
        <Form.Item>
          <Button>Submit</Button>
        </Form.Item>
      </Col> */}
    </Form>
  );
};
