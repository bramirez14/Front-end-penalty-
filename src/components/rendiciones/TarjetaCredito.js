import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Form, Input, Select, Divider,Spin,DatePicker } from "antd";
import { Files } from "../../helpers/Files";
import "../css/boton.css";
import { tarjetaCredito } from "../../redux/actions/rendicionAction";
import { Titulo } from "../titulos/Titulo";
import { useNavigate } from "react-router";
import { useGet } from "../../hooks/useGet";
const { Option } = Select;
export const TarjetaCredito = () => {
  const navigate= useNavigate();
  const [spinner, setSpinner] = useState(false)
  const dispatch = useDispatch();
  const onFinish = async (values) =>{ 
    setSpinner(true)
    const response = await dispatch(tarjetaCredito(values, navigate));
    if (response.data.status === 200) {
      navigate("/perfil");
     }
  }
  const dateFormat = 'DD/MM/YYYY';
  const [getAllCreditCard ]= useGet('medios/pagos/tarjeta/credito');
  return (
      <Spin tip='Cargando...' spinning={spinner} className='spinner'>
      <Form name="validate_other" onFinish={onFinish} className="form-complete" size="large" >
      <Titulo titulo=" Tarjeta de credito" />
      <Divider />
      <Form.Item
      name='fecha'
                  rules={[
                    {
                      required: true,
                      message: "ingrese una fecha",
                    },
                  ]}
                >
                  <DatePicker
                    name="fecha"
                    style={{ width: "100%" }}
                    placeholder="fecha"

                    format={dateFormat}
                  />
                </Form.Item>
      <Form.Item name="importe">
        <Input type="number" placeholder="Importe" />
      </Form.Item>
      <Form.Item name="tarjeta">
        <Select placeholder="Seleccione una tarjeta">
          { getAllCreditCard.map(c=>(
            <Option value={c.tarjeta} key={c.id}>{ c.tarjeta}</Option>
          ))

          }
          
       
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
