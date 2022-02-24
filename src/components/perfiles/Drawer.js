import React from 'react'
import { Col, Row, Drawer} from "antd";

export const Drawers = ({onClose,visible,DatosPersonales,gasto,sueldo,vacaciones}) => {
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
    return (
        <>
        <Drawer
        width={640}
        placement="right"
        closable={false}
        onClose={onClose}
        visible={visible}
        
      >
        <div style={{padding: 40}}>
        <p
          className="site-description-item-profile-p"
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
     {/*    <Divider orientation="left">Solicitudes Realizadas </Divider> */}
       {/* <CardTitle gasto={gasto} sueldo={sueldo} vacaciones={vacaciones}/> */}
       </div>
      </Drawer>
      </>
    )
}
