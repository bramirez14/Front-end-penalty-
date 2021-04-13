import React, { useState, useContext } from "react";
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
export const AnticipoGasto = ({ history }) => {
  const Text = useContext(UserContext);
  const { open } = Text;
  const { Option } = Select;
  const estadoInicial = {
    uid: "",
    importe: "",
    idPago: "",
    msj: "",
  };
  /** declarando el etado inicial */
  const [gastos, setGastos] = useState(estadoInicial);
  /**Petciones get */
  let pg = PeticionGET("/allusers");
  console.log(pg);
  let pmp = PeticionGET("/mpagos");
  
;
/*fx para guardar anticipo con axios en DB **********/
  const guardarAnticipo = async ( values) => {
    let result = await  axiosURL.post("/mpago", values);
    console.log(result.data);
   /*  if (result.status === 200) {
      history.push("/");
    } */
  };
 
  const onSubmit=  (values) => {
 guardarAnticipo(values)
  };
  console.log(gastos);
  return (
    <div className={!open ? "contenedor" : "contenedor-active"} >
      <Form className="form" onFinish={onSubmit}>
        <Titulo titulo="Anticipo de Gastos" />

        <Row gutter={10}>
          <Col xs={24} sm={12} md={12} lg={12} xl={12}>
            <SelectAnt
              name="uid"
              placeholder="Seleccione un Empleado"
              array={pg}
            />
          </Col>

          <Col xs={24} sm={12} md={12} lg={12} xl={12}>
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
                name="importe"
               value={gastos.importe}
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <Form.Item name='idPago'>
              <Select   name='idPago'  placeholder='Seleccione un medio de pago' className='op'>
                {pmp.map((g) => (
                  <Option  key={g.id} value={g.id} >
                    {g.pago}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <Form.Item name='msj'>
              <Input.TextArea
                name="msj"
                placeholder="Mensaje"
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <Form.Item>
              <Button htmlType="submit" block>
                Submit
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};
