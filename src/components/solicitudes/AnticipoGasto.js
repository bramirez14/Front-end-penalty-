import React, { useState, useContext } from "react";
import Swal from "sweetalert2";
import { Form, Input, Button, Select, Col, Row,  } from "antd";
import "./css/anticipoGasto.css";
import { UserContext } from "../../contexto/UserContext";
import { axiosURL } from "../../config/axiosURL";
import { PeticionGET } from "../../config/PeticionGET";
import { Titulo } from "../titulos/Titulo";
import { alerta } from "./helpers/funciones";


export const AnticipoGasto = ({ history }) => {
  //Peticion get para saber cuando vence el localStorage
  const id = localStorage.getItem("uid");
  const { Option } = Select;

  /** declarando el etado inicial */
  const [gastos, setGastos] = useState({
    notas: "",
    importe: "",
    fecha: new Date().toLocaleDateString(),
    categoria: "",
    usuarioId: id,
    formapagoId: "",
  });
  const { fecha, usuarioId } = gastos;
  /**Petciones get */
  let datosUsuario = PeticionGET(`/${id}`);
  let cantidadDeAntGastos = datosUsuario.gasto?.length;
  let pmp = PeticionGET("/mpagos");

  const handleAlert = () => {
    Swal.fire({
      title: "Solicitud enviada",
      text: "Se aprobara en un plazo de 24hs y se mostrarar en la seccion de Rendiciones, gracias por la espera.",
      imageUrl:"https://www.brazilianfootwear.com/assets/shared/marca/logo/19170a70b1da4a6813e39c8981517486.jpg",
      imageWidth: 300,
      imageHeight: 200,
      imageAlt: "penalty",
    });
  };
  /*fx para guardar anticipo con axios en DB **********/

  const onSubmit = async (values) => {
    handleAlert();
    const obj={ 
    ...datosUsuario,
    msj:values.notas,
    info:`Tenes un anticipo de Gasto`,
    path:'/aprobacion/gastos'
    
    }
   const{data} = await alerta(obj)

    let result = await axiosURL.post("/mpago", {
      ...values,
      fecha,
      usuarioId,
      estado: "pendiente",
      estadoFinal: "pendiente",
      f: new Date().toLocaleString(),
      alertaId: data?.alertaCreada?.id
    });
    if (result.status === 200) {
      history.push("/");
    }
  };
 


  return (
    <Form className='form container' onFinish={onSubmit} size="large">
      <Row gutter={10}>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <Titulo numero={2} titulo="Anticipo de Gasto" />
          <Form.Item
            hasFeedback
            rules={[
              {
                required: true,
                message: "Por favor ingres un importe!",
              },
            ]}
            name="importe"
          >
            <Input type="number" placeholder="Importe" />
          </Form.Item>

          <Form.Item
            hasFeedback
            rules={[
              {
                required: true,
                message: "Por favor ingrese un medio de pago!",
              },
            ]}
            name="formapagoId"
          >
            <Select placeholder="Seleccione un medio de pago" className="op">
              {pmp.map((g) => (
                <Option key={g.id} value={g.id}>
                  {g.pago}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="notas">
            <Input.TextArea placeholder="Nota" />
          </Form.Item>

          <Form.Item>
            <Button className="btn" htmlType="submit" block>
              Enviar
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};
