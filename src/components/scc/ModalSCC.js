import React from "react";
import {
    Row,
    Col,
    Modal,
    Form,
    Input,
    Radio,
  } from "antd";
  import { InputNumber } from 'antd';
const { TextArea } = Input;

export const ModalSCC = ({ visible, onCreate, onCancel }) => {
 
    const [form] = Form.useForm();
    return (
      <Modal
        width={1000}
        visible={visible}
        title="SCC"
        okText="Crear"
        cancelText="Cancel"
        onCancel={onCancel}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              form.resetFields();
              onCreate(values);
            })
            .catch((info) => {
              console.log("Validate Failed:", info);
            });
        }}
      >
        <Form
          form={form}
          layout="inline"
          name="form_in_modal"
       
        >
          <Row gutter={[20, 20]}>
            <Form.Item name="title" label="S.C.C Nro">
              <Input  />
            </Form.Item>
            <Form.Item name="description" label="Cliente">
              <Input type="text" />
            </Form.Item>
            <Form.Item name="description" label="Art">
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name="modifier"
              className="collection-create-form_last-form-item"
            >
              <Radio.Group>
                <Radio value="public">Lista</Radio>
                <Radio value="private">Facturado</Radio>
              </Radio.Group>
            </Form.Item>
            <Col span={24}>
              <Form.Item name="description" label="Obs">
                <TextArea rows={2} />
              </Form.Item>
            </Col>
            <Col span={3}>
              <Form.Item name="title" label="TU">
                <Input  />
              </Form.Item>
            </Col>
            <Col span={3}>
              <Form.Item name="talle1" label="01">
                <Input />
              </Form.Item>
            </Col>
            <Col span={3}>
              <Form.Item name="talle2" label="02">
                <Input />
              </Form.Item>
            </Col>
            <Col span={3}>
              <Form.Item name="talle3" label="03">
                <Input />
              </Form.Item>
            </Col>
            <Col span={3}>
              <Form.Item name="talle4" label="04">
                <Input />
              </Form.Item>
            </Col>
            <Col span={3}>
              <Form.Item name="talle5" label="05">
                <Input />
              </Form.Item>
            </Col>
            <Col span={3}>
              <Form.Item name="s" label="S">
                <Input />
              </Form.Item>
            </Col>
          
            <Col span={3}>
              <Form.Item name="m" label="M">
                <Input />
              </Form.Item>
            </Col>
            <Col span={3}>
              <Form.Item name="m" label="L">
                <Input />
              </Form.Item>
            </Col>
            <Col span={3}>
              <Form.Item name="title1" label="XL">
                <Input />
              </Form.Item>
            </Col>
            <Col span={3}>
              <Form.Item name="title1" label="XXL">
                <Input />
              </Form.Item>
            </Col>
            <Col span={3}>
              <Form.Item name="title1" label="08">
                <Input />
              </Form.Item>
            </Col>
            <Col span={3}>
              <Form.Item name="title1" label="09">
                <Input />
              </Form.Item>
            </Col>
            <Col span={3}>
              <Form.Item name="title1" label="10">
                <Input />
              </Form.Item>
            </Col>
            <Col span={3}>
              <Form.Item name="title1" label="XXX">
                <Input />
              </Form.Item>
            </Col>
          {/*   <Col span={4}>
              <Form.Item name="total" label="Total">
                <Input />
              </Form.Item>
            </Col> */}
          </Row>
          <p>hi word</p>
        </Form>
      </Modal>
    );
  };
