import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Form, Input, Select, Divider,Spin } from "antd";
import { Files } from "../../helpers/Files";
import "../css/boton.css";
import { tarjetaCredito } from "../../redux/actions/rendicionAction";
import { Titulo } from "../titulos/Titulo";
const { Option } = Select;
export const TarjetaCredito = ({ history }) => {
  const [spinner, setSpinner] = useState(false)
  const dispatch = useDispatch();
  const onFinish = (values) =>{ 
    //setSpinner(true)
    dispatch(tarjetaCredito(values, history));
  }

  return (
      <Spin tip='Cargando...' spinning={spinner} className='spinner'>
      <Form name="validate_other" onFinish={onFinish} className="form-complete" size="large" >
      <Titulo titulo=" Tarjeta de credito" />
      <Divider />
      <Form.Item name="importe">
        <Input type="number" placeholder="Importe" />
      </Form.Item>
      <Form.Item name="tarjeta">
        <Select placeholder="Seleccione una tarjeta">
          <Option value="visa">Visa</Option>
          <Option value="American Express">American Express</Option>
          <Option value="otra">Otra</Option>
        </Select>
      </Form.Item>
      <Form.Item name="nota">
        <Input.TextArea placeholder="Nota" />
      </Form.Item>

      <Files />

      <Form.Item>
        <Button type="primary" htmlType="submit" className="boton">
          Guardar
        </Button>
      </Form.Item>
    </Form>
    </Spin>
  );
};
