import React, {useContext} from "react";
import axios from "axios";
import Swal from "sweetalert2";
import emailjs from "emailjs-com";
import { Form, Input, Button, Select, Col, Row, Divider } from "antd";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import "./css/anticipoGasto.css";
import { UserContext } from "../../contexto/UserContext";
export const AnticipoGasto = ({ history }) => {
    const Text=useContext(UserContext)
    const {open}=Text

  const { Option } = Select;
  function onChange(value) {
    console.log(`selected ${value}`);
    console.log("changed", value);
  }

  function onBlur() {
    console.log("blur");
  }

  function onFocus() {
    console.log("focus");
  }

  function onSearch(val) {
    console.log("search:", val);
  }
 

  return (
    <div className={!open?'contenedor':'contenedor-active'}>
    <Form className='form' >
      <h3 className="titulo">Anticipo de Gastos</h3>
      <Row gutter={[16, 20]}>
        <Col xs={24} sm={12} lg={12}>
        <Form.Item
        name="empledo"
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please select your country!',
          },
        ]}
      >
          <Select
          
           className='select-empleado'
            size="large"
            showSearch
            placeholder="Selecciona un Empleado"
            optionFilterProp="children"
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            onSearch={onSearch}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="tom">Tom</Option>
          </Select>
          </Form.Item>
        </Col>
        
        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
        <Form.Item
        name="importe"
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Por favor ingres un importe!',
          },
        ]}
      >
          <Input
            size="large"
            type="number"
            placeholder="Importe"
            prefix={<FaRegMoneyBillAlt />}
          />
          </Form.Item>
        </Col>

        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
        <Form.Item
        name="pago"
        
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please select your country!',
          },
        ]}
      >
          <Select
          className='select-medios-pago'
            size="large"
            placeholder="Selecciona un Empleado"
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
          >
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="tom">Tom</Option>
          </Select>
          </Form.Item>  
        </Col>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
        <Form.Item>
          <Input.TextArea placeholder="Mensaje" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            
        <Form.Item
      
      >
        <Button  htmlType="submit"  block>
          Submit
        </Button>
      </Form.Item>
        </Col>
      </Row>
    </Form>
    </div>
  );
};
