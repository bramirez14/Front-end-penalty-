import React from "react";
import { Form, Input, Button, Select, Col, Row,Radio, Divider } from "antd";
import { SelectAnt } from "../inputs/SelectAnt";
import { Titulo } from "../titulos/Titulo";
import { FormAntAguinaldo } from "./helpers/FormAntAguinaldo";
import { FormAntSueldo } from "./helpers/FormAntSueldo";
import { Typography } from 'antd';

const { Title } = Typography;
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
      className='form container'
      onFinish={handleSubmit}
      size="large"
    >
      {APROBACION === "pendiente" && APROBACION !== undefined ? (
            <h4>Ya tenes un anticipo pendiente!!!</h4>
          ) :
          (<Row gutter={10}>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
        <Titulo numero={2} titulo='Anticipo de Sueldo'/>

            <>  
            <Radio.Group name="sueldo" onChange={handleChange} value={sueldo} style={{marginBottom:10}}>
            <Radio value={'Sueldo'}>Anticipo de Sueldo</Radio>
            <Radio value={'Aguinaldo'}>Anticipo de Aguinaldo</Radio>
          </Radio.Group>

            

            {
              sueldo==='Sueldo'?
              <FormAntSueldo handleChange={handleChange} data={data} handleChangeCuotas={handleChangeCuotas} />
              : 
              <FormAntAguinaldo handleChange={handleChange} handleChangeCuotas={handleChangeCuotas} mes={mes} cuotas={cuotas} />
            }

              <Form.Item name="mensaje">
                <Input.TextArea  placeholder="Mensaje" />
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
