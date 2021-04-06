import React from "react";
import axios from "axios";
import Swal from "sweetalert2";
import emailjs from "emailjs-com";
import { Form, Input, Button, Select, Col, Row, Divider } from "antd";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import "./css/anticipoGasto.css";
export const AnticipoGasto = ({ history }) => {
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
    <Form className="form" labelCol={{ span: 4 }} wrapperCol={{ span: 14 }}>
      <h3 className="titulo">Anticipo de Gastos</h3>
      <Row gutter={[16, 40]}>
        <Col xs={24} sm={12} lg={12}>
          <Select
            size="large"
            showSearch
            style={{ width: 300 }}
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
        </Col>
        <Col xs={24} sm={12} lg={12}>
          <Input
            size="large"
            type="number"
            placeholder="Importe"
            prefix={<FaRegMoneyBillAlt />}
          />
        </Col>

        <Col xs={24} sm={12} lg={24}>
          <Select
            size="large"
            style={{ width: 740 }}
            placeholder="Selecciona un Empleado"
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
          >
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="tom">Tom</Option>
          </Select>
        </Col>
        <Col xs={24} sm={12} lg={24}>
          <Input.TextArea placeholder="Mensaje" />
        </Col>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <Button  htmlType="submit">
            Submit
          </Button>
        </Col>
      </Row>
    </Form>
  );
};
