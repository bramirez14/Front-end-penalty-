import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import emailjs from "emailjs-com";
import { Form, Input, Button, Select, Col, Row, Divider } from "antd";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import "./css/anticipoGasto.css";
import { UserContext } from "../../contexto/UserContext";
import axiosURL from "../../config/axiosURL";
import PeticionGET from "../../config/PeticionGET";
import { Titulo } from "../titulos/Titulo";
import { SelectAnt } from "../inputs/SelectAnt";
import { securedBrowserCache } from 'secured-browser-storage';


export const AnticipoGasto = ({ history }) => {
    //Peticion get para saber cuando vence el localStorage
  const id = securedBrowserCache.getItem('uid')
    const [tokenEstado, setTokenEstado] = useState({});
    console.log(tokenEstado);
    const { nombre, apellido } = tokenEstado;
    useEffect(() => {
      const cargarUsuario = async () => {
        let datosJWT = await axiosURL.get("/check", {
          headers: { token: tokenStorage },
        });
        setTokenEstado(datosJWT.data);
      };
      cargarUsuario();
    }, []);  
  let tokenStorage = JSON.parse(localStorage.getItem("token"));


  const Text = useContext(UserContext);
  const { open } = Text;
  const { Option } = Select;

  /** declarando el etado inicial */
  const [gastos, setGastos] = useState({
    notas:'',
    importe: "",
    fecha:new Date().toLocaleDateString(),
    categoria:'',
    usuarioId:id,
    formapagoId:''
  });
  const {fecha,usuarioId}=gastos
  /**Petciones get */
  let pg = PeticionGET(`/${id}`);
  let cantidadDeAntGastos=pg.gasto?.length
  console.log(cantidadDeAntGastos);
  let pmp = PeticionGET("/mpagos");
  
;
/*fx para guardar anticipo con axios en DB **********/
  const guardarAnticipo = async ( values) => {
    const v={...values,fecha,usuarioId}
    let result = await  axiosURL.post("/mpago", v);
    if (result.status === 200) {
      history.push("/");
    }
  };
 
  const onSubmit=  (values) => {
 guardarAnticipo(values)
  };
  return (
    <div className={!open ? "contenedor" : "contenedor-active"} >
      <Form className="form" onFinish={onSubmit}>
      <Row gutter={10}>
      <Col xs={24} sm={24} md={24} lg={24} xl={24}>

        <Titulo titulo="Anticipo de Gastos" />
</Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <h3> {nombre}, {apellido}</h3>
          </Col>

          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <Form.Item
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Por favor ingres un importe!",
                },
              ]}
              name='importe'
            >
              <Input
                type="number"
                placeholder="Importe"
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <Form.Item  hasFeedback
              rules={[
                {
                  required: true,
                  message: "Por favor ingrese un medio de pago!",
                },
              ]} name='formapagoId'>
              <Select     placeholder='Seleccione un medio de pago' className='op'>
                {pmp.map((g) => (
                  <Option  key={g.id} value={g.id} >
                    {g.pago}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <Form.Item name='notas'>
              <Input.TextArea
                placeholder="Nota"
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <Form.Item>
              <Button className='btn' htmlType="submit" block>
                Enviar
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};
