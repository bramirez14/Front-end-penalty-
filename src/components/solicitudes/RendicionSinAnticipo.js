import React from "react";
import { Form, Input, Button, Row, Select, Divider,Col, Spin,Card} from "antd";
import TextArea from "antd/lib/input/TextArea";
import { Imagen } from "../img/Imagen";
import { VistaImg } from "../rendiciones/VistaImg";
import { css } from "@emotion/react";
import BeatLoader from "react-spinners/BeatLoader";
import {CardImg} from '../rendiciones/CardImg'
import { CardImgResponse } from '../rendiciones/CardImgResponse'
import './css/anticipoGasto.css'
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
  spinner
}) => {
  const override = css`
  display: flex;
height:100px


  
  @media (max-width: 768px) {
    display:flex;
    margin: 70px 220px;
    width:70px;
    
  }
  @media (max-width: 480px) {
    display:flex;
    margin: 100px 120px;
    width:70px;
  }
}
`;
  const { Option } = Select;
console.log(data);
  return (
    <>
    <Card className="formulario-rendicion-crear" style={{padding:20}}>
      <div style={{border:'solid 1px #ddd',padding:20,borderRadius:10,height:'auto'}}>
{ !!spinner?
      <BeatLoader color={'#46a461'}  css={override} size={20} />
  :
  <Row gutter={20}>
        <Col xs={24} sm={24} md={24} lg={12} xl={12}> 
      
         <Form
          onFinish={handleSubmit}
          onChange={handleChange}
          layout="vertical"
          className='formulario'
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
          hasFeedback
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
          hasFeedback
            name="importe"
            rules={[
              {
                required: true,
                message: "ingrese un importe",
              },
            ]}
          >
            <Input name="importe" placeholder="Importe" type='number' />
          </Form.Item>
          <Form.Item name="notas" 
          hasFeedback
          
          >
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

                
            <CardImgResponse
            data={data}
            />
         
        </div>
  }

            <Button className="btn" htmlType="submit" block>
              Guardar
            </Button>
          </Form.Item>
        </Form>
        </Col>

      <Col xs={12} sm={12} md={12} lg={12} xl={12}>
        
      <div className='vista-muestra'>
  
      
     
       
        <CardImg data={data}
        setData={setData}
        {...crearRendicion}
        medio="Medio de pago: "
        pago={state.children}/>
        
      
      
        
        </div>
      </Col>
      </Row>}  
      </div>
    </Card>
    </>
  );
};
