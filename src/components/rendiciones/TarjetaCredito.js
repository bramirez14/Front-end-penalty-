import React, { useState } from "react";
import {useDispatch,useSelector} from "react-redux"
import { Button, Form, Row, Col,Input,Select } from "antd";
import { Files } from "../../helpers/Files";
import { axiosURL } from "../../config/axiosURL";
import { PeticionGET } from "../../config/PeticionGET";
import '../css/boton.css'
import { tarjetaCredito } from "../../redux/actions/rendicionAction";
const { Option } = Select;
export const TarjetaCredito = ({ history }) => {
  const id = localStorage.getItem("uid");
  const get = PeticionGET(`/${id}`);
const   dispatch= useDispatch();
  const onFinish = async (values) => {
    console.log("Success:", values);
   const resp= dispatch(tarjetaCredito(values,history))
    console.log(await resp);
  

  };
  return (
    <Form  name="validate_other" onFinish={onFinish} className='form-complete' >
      <Form.Item name='importe'>
      <Input type='text' placeholder='Importe'/>
        </Form.Item>
      <Form.Item name='tarjeta'>
      <Select placeholder="Seleccione una tarjeta">
          <Option value="visa">Visa</Option>
          <Option value="American Express">American Express</Option>
          <Option value="otra">Otra</Option>
        </Select>
      </Form.Item>

      <Files />

      <Form.Item>
        <Button type="primary" htmlType="submit" className='boton'>
          Guardar
        </Button>
      </Form.Item>
    </Form>
  );
};
