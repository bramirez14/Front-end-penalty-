import React from "react";
import { Form, Input, Button, Row, Select, Divider,Col } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { Imagen } from "../img/Imagen";
import { VistaImg } from "../rendiciones/VistaImg";

export const RendicionSinAnticipo = ({
  handleSubmit,
  handleChange,
  estilo,
  handleBack,
  selectChangeCategoria,
  categorias,
  selectChangePago,
  getFpago,
  notas,
  setData,
  data,
  setCrearRendicion,
  crearRendicion,
  handleDelete,
  state,
}) => {
  const { Option } = Select;
console.log(data);
  return (
    <>
      <Row>
        <Col xs={24} sm={24} md={24} lg={8} xl={8}> 
         <Form
          onFinish={handleSubmit}
          onChange={handleChange}
          layout="vertical"
          className="formulario-rendicion-crear"
          {...estilo}
          size="large"
        >
          <h3 style={{ textAlign: "center", marginLeft: "40px" }}>
            Agregar Rendicion
            <Button className="btn-rendicion" onClick={handleBack} style={{marginLeft:20}}>
              X
            </Button>
          </h3>
          <Divider />
          <Form.Item
            name="categoria"
            rules={[
              {
                required: true,
                message: "ingrese un categoria",
              },
            ]}
          >
            <Select placeholder="Categoria" onChange={selectChangeCategoria}>
              {categorias.map((c) => (
                <Option key={c.id} value={c.categoria}>
                  {c.categoria}
                </Option>
              ))}
            </Select>
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
            <Select
              placeholder="Seleccione un medio de pago"
              name="formapagoId"
              onChange={selectChangePago}
            >
              {getFpago.map((g) => (
                <Option key={g.id} value={g.categoria}>
                  {g.pago}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="importe"
            rules={[
              {
                required: true,
                message: "ingrese un importe",
              },
            ]}
          >
            <Input name="importe" placeholder="Importe" />
          </Form.Item>
          <Form.Item name="notas">
            <TextArea
              name="notas"
              value={notas}
              placeholder="Nota"
              autoSize={{ minRows: 2, maxRows: 6 }}
            />
          </Form.Item>

          <Imagen
            setData={setData}
            setState={setCrearRendicion}
            state={crearRendicion}
          />

          <Form.Item>
            {/**imagen modo cel y ipad  */}{
              data.length> 0 &&
          <div className='img-muestra'> 
        <div className="custom-file-preview " >
          {data?.length === 0 ? (
            <h2 className='sector'>Imagen</h2>
          ) : (
            <div
              className="prev-img"
            >
              <span className="prev-img" onClick={handleDelete}>
                &times;
              </span>
              <img src={data[0].src} />
            </div>
          )}
        </div>
    </div>}

            <Button className="btn" htmlType="submit" block>
              Guardar
            </Button>
          </Form.Item>
        </Form>
        </Col>
      <Col xs={16} sm={16} md={16} lg={16} xl={16}>
      <div className='vista-muestra'>
        <VistaImg
          data={data}
          setData={setData}
          handleDelete={handleDelete}
          {...crearRendicion}
          medio="Medio de pago: "
          pago={state.children}
        />
        </div>
      </Col>
        
      </Row>
    </>
  );
};
