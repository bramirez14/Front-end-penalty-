import {
  Form,
  Input,
  Button,
  Row,
  Select,
  Divider,
  Col,
  Spin
} from "antd";
import TextArea from "antd/lib/input/TextArea";
//import "./css/anticipoGasto.css";
import "../css/form.css";
import { Files } from "../../helpers/Files";
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
  spinner,
}) => {
  const { Option } = Select;
  return (
    <>
   <Spin tip="Cargando..." spinning={spinner} className='spinner'>
        <Form
          onFinish={handleSubmit}
          onChange={handleChange}
          layout="vertical"
          className="form-complete"
        >
          <h3 style={{ textAlign: "center", marginLeft: "40px" }}>
            Agregar Rendicion
            <Button
              className="btn-rendicion"
              onClick={handleBack}
              style={{ marginLeft: 20 }}
            >
              X
            </Button>
          </h3>
          <Divider />
          <Row gutter={10}>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
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
                <Select
                  placeholder="Categoria"
                  onChange={selectChangeCategoria}
                >
                  {categorias.map((c) => (
                    <Option key={c.id} value={c.categoria}>
                      {c.categoria}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
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
                  placeholder=" Medio de pago"
                  onChange={selectChangePago}
                >
                  {getFpago.map((g) => (
                    <Option key={g.id} value={g.categoria}>
                      {g.pago}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
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
                <Input  placeholder="Importe" type="number" />
              </Form.Item>
              <Form.Item name="nota" hasFeedback>
                <TextArea
                  placeholder="Nota"
                  autoSize={{ minRows: 2, maxRows: 6 }}
                />
              </Form.Item>

              <Files obli={crearRendicion.categoria==='Peajes'?true:false}/>
              <Form.Item>
                <Button className="btn" htmlType="submit" block>
                  Guardar
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
        </Spin>
      
    </>
  );
};
