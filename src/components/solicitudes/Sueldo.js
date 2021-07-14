import React from "react";
import { Form, Input, Button, Select, Col, Row } from "antd";
import { SelectAnt } from "../inputs/SelectAnt";
import { Titulo } from "../titulos/Titulo";
export const Sueldo = ({
  open,
  handleSubmit,
  APROBACION,
  handleChange,
  importe,
  sueldo,
  handleChangeDev,
  data,
  handleChangeCuotas,
  cuotas,
  mes,
}) => {
  const { Option } = Select;

  return (
    <Form
      className='container agregado'
      onFinish={handleSubmit}
      size="large"
    >
      {APROBACION === "pendiente" && APROBACION !== undefined ? (
            <h4>Ya tenes un anticipo pendiente!!!</h4>
          ) :
          (<Row gutter={10}>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <Titulo titulo="Anticipo de Sueldo" />

          
            <>
              <Form.Item
                name="importe"
                rules={[
                  {
                    required: true,
                    message: "ingrese un importe",
                  },
                ]}
              >
                <Input
                  type="number"
                  placeholder="Importe"
                  name="importe"
                  onChange={handleChange}
                />
              </Form.Item>

              {importe < 3000 ? (
                <Form.Item
                  name="sueldo"
                  rules={[
                    {
                      required: true,
                      message: "seleccione una opcion",
                    },
                  ]}
                >
                  <Select placeholder="Devolucion" onChange={handleChangeDev}>
                    <Option value="Sueldo">Sueldo</Option>
                    <Option value="Aguinaldo">Aguinaldo</Option>
                  </Select>
                </Form.Item>
              ) : (
                <Form.Item name="sueldo">
                  <Input disabled placeholder="Sueldo" />
                </Form.Item>
              )}

              {sueldo === "Sueldo" ? (
                <SelectAnt
                  placeholder="Cuotas"
                  name="cuotas"
                  array={data}
                  mensaje="seleccione una opcion"
                  change={handleChangeCuotas}
                />
              ) : mes > 0 && mes <= 5 ? (
                <Form.Item>
                  <Input name="cuotas" value="1" disabled />
                </Form.Item>
              ) : (
                <Form.Item name="cuotas">
                  <Select name="cuotas" onChange={handleChangeCuotas}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                  </Select>
                </Form.Item>
              )}

              <Form.Item name="mensaje">
                <Input.TextArea name="mensaje" placeholder="Mensaje" />
              </Form.Item>

              <Form.Item>
                <Button className="btn" htmlType="submit" block>
                  Enviar
                </Button>
              </Form.Item>
            </>
          
        </Col>
      </Row>)}
    </Form>
  );
};
