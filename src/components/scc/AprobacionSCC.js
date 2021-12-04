import React, { useState, useEffect, useMemo } from "react";
import { Button, Modal, Form, Input, Radio, Col, Row, Table, Tag } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  todasLasSCC,
  todosLosArticulos,
  todasLasTalles,
  abrirModal,
  cerrarModal,
  inputCambio,
  editarSCC,
} from "../../redux/actions/scc";
import { ColumnaSCC } from "./columnas/ColumnaSCC";
import { axiosURL } from "../../config/axiosURL";
import { useForm } from "../../hooks/useForm";

const { TextArea } = Input;

const CollectionCreateForm = ({ visible, onCreate, onCancel }) => {
  const [state, setState] = useState();

  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.solicitudControlCalidad);
  const total= (data.CANTPEDT00+data.CANTPEDT01+data.CANTPEDT02+data.CANTPEDT03+data.CANTPEDT04+data.CANTPEDT05+data.CANTPEDT06+data.CANTPEDT07+data.CANTPEDT08+data.CANTPEDT09+data.CANTPEDT10+data.CANTPEDT11+data.CANTPEDT12+data.CANTPEDT13+data.CANTPEDT14)

  const change = (e) => {
    const { value, name } = e.target;
      //    console.log([name] + "=" + value);
    const newObj = { ...data, [name]: parseInt(value)};
    dispatch(inputCambio(newObj));
  };
  useEffect(() => {
    const newData= {...data,CANTPED:total}
    dispatch(inputCambio(newData));
  }, [total])
  const [form] = Form.useForm();
  return (
    <Modal
      width={1000}
      visible={visible}
      title="SCC"
      okText="Guardar"
      cancelText="Cancelar"
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
      <Form form={form} layout="inline"  onChange={change}>
        <Row gutter={[20, 20]}>
          <Form.Item label="S.C.C Nro">
            <Input value={data.NROSCC} />
          </Form.Item>
          <Form.Item label="Cliente">
            <Input  value={data.CLIENTE} />
          </Form.Item>
          <Form.Item label="Art">
            <Input  value={data.CLIENTE}  />
          </Form.Item>

          <Form.Item
            label="Precio"
            className="collection-create-form_last-form-item"
            name='PRECIO'
          >
            <Radio.Group >
              <Radio value={data.PRECIOLIST}>{data.PRECIOLIST}  <Tag color="magenta"> Lista </Tag> </Radio>
              <Radio value={data.PRECFACT}>{data.PRECFACT}    <Tag color="gold"> Facturado </Tag></Radio>
            </Radio.Group>
          </Form.Item>

         

          <Col span={24}>
            <Form.Item name="COMENTARIO" label="Obs">
              <TextArea rows={2} />
            </Form.Item>
          </Col>
         
          <Col span={3}>
            <Form.Item label="TU">
              <Input  name="CANTPEDT00" value={data.CANTPEDT00} min={0} />
            </Form.Item>
          </Col>
          <Col span={3}>
            <Form.Item  label="01">
              <Input  name="CANTPEDT01" value={data.CANTPEDT01} min={0}/>
            </Form.Item>
          </Col>
          <Col span={3}>
            <Form.Item  label="02">
              <Input  name="CANTPEDT02" value={data.CANTPEDT02} min={0} />
            </Form.Item>
          </Col>
          <Col span={3}>
            <Form.Item  label="03">
              <Input name="CANTPEDT03" value={data.CANTPEDT03} min={0}/>
            </Form.Item>
          </Col>
          <Col span={3}>
            <Form.Item  label="04">
              <Input name="CANTPEDT04" value={data.CANTPEDT04} min={0}/>
            </Form.Item>
          </Col>
          <Col span={3}>
            <Form.Item  label="05">
              <Input name="CANTPEDT05" value={data.CANTPEDT05} min={0}/>
            </Form.Item>
          </Col>
          <Col span={3}>
            <Form.Item  label="S">
              <Input name="CANTPEDT06" value={data.CANTPEDT06} min={0}/>
            </Form.Item>
          </Col>
          <Col span={3}>
            <Form.Item  label="M">
              <Input name="CANTPEDT07" value={data.CANTPEDT07} min={0}/>
            </Form.Item>
          </Col>
          <Col span={3}>
            <Form.Item  label="L">
              <Input name="CANTPEDT08" value={data.CANTPEDT08} min={0}/>
            </Form.Item>
          </Col>
          <Col span={3}>
            <Form.Item  label="XL">
              <Input name="CANTPEDT09" value={data.CANTPEDT09} min={0}/>
            </Form.Item>
          </Col>
          <Col span={3}>
            <Form.Item  label="XXL">
              <Input name="CANTPEDT10" value={data.CANTPEDT10} min={0}/>
            </Form.Item>
          </Col>
          <Col span={3}>
            <Form.Item  label="08">
              <Input name="CANTPEDT11" value={data.CANTPEDT11} min={0}/>
            </Form.Item>
          </Col>
          <Col span={3}>
            <Form.Item  label="09">
              <Input name="CANTPEDT12" value={data.CANTPEDT12} min={0}/>
            </Form.Item>
          </Col>
          <Col span={3}>
            <Form.Item  label="10">
              <Input name="CANTPEDT13" value={data.CANTPEDT13} min={0}/>
            </Form.Item>
          </Col>
          <Col span={3}>
            <Form.Item  label="XXX">
              <Input name="CANTPEDT14" value={data.CANTPEDT14} min={0}/>
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item  label="Total">
              <Input value={total} min={0} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};
export const AprobacionSCC = () => {

  const dispatch = useDispatch();
  const { solicitudControlCalidad, articulos, modal } = useSelector(
    (state) => state
  );
  const todasLasSolicitudes = solicitudControlCalidad.scc;
//  console.log(todasLasSolicitudes);
  const visible = modal.openModal;
  const todosLosArt = articulos.art;
  const data= solicitudControlCalidad.data
  useEffect(() => {
    dispatch(todasLasSCC());
  }, []);
  useEffect(() => {
    dispatch(todasLasTalles());
  }, []);
  useEffect(() => {
    dispatch(todosLosArticulos());
  }, [dispatch]);

  const buscarNombrePorArt = (art) => {
    const buscarNomArt = todosLosArt?.find((t) => t.NUMERO === art);
    return buscarNomArt?.DESCRIP;
  };
  const onCreate =(values) => {
    console.log(values);
  dispatch(editarSCC(data.NROSCC,{...data,...values}));
    dispatch(cerrarModal());
  console.log({...data,...values}) 
  //console.log(data.NROSCC);
    
};

  const todos = (array) => {
    return array?.map((t) => ({
      ...t,
      Descrip: buscarNombrePorArt(t.ARTICULO),
      key: t.NROSCC,
    }));
  };
  const memoizedValue = useMemo(
    () => todos(todasLasSolicitudes),
    [todasLasSolicitudes]
  );
  //console.log(memoizedValue)

  return (
    <div>
      <CollectionCreateForm
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          //setVisible(false);
          dispatch(cerrarModal());
        }}
      />
      <Table
        size="small"
        bordered
        dataSource={memoizedValue}
        columns={ColumnaSCC()}
      />
    </div>
  );
};



//UPDATE `intranetpenalty`.`usuarios` SET `password` = '\'$2b$10$I25nfnkbXvSZj9dlIzU0DugZXW6Iycn/f5vIZEKv3SsxPlWY9vOIG\'' WHERE (`id` = '21');