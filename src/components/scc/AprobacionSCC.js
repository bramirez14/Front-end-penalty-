import React, { useState, useEffect, useMemo } from "react";
import {
  Button,
  Modal,
  Form,
  Input,
  Radio,
  Col,
  Row,
  Table,
  Tag,
  Result,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  todasLasSCC,
  todosLosArticulos,
  todasLasTalles,
  cerrarModal,
  editarSCC,
} from "../../redux/actions/scc";
import { ColumnaSCC } from "./columnas/columnaSCC";
const { TextArea } = Input;

const CollectionCreateForm = ({
  visible,
  onCreate,
  onCancel,
  loading,
  status,
  setState,
  state,
}) => {
  const total =
    state.CANTPEDT00 +
    state.CANTPEDT01 +
    state.CANTPEDT02 +
    state.CANTPEDT03 +
    state.CANTPEDT04 +
    state.CANTPEDT05 +
    state.CANTPEDT06 +
    state.CANTPEDT07 +
    state.CANTPEDT08 +
    state.CANTPEDT09 +
    state.CANTPEDT10 +
    state.CANTPEDT11 +
    state.CANTPEDT12 +
    state.CANTPEDT13 +
    state.CANTPEDT14;

  const change = (e) => {
    const { value, name } = e.target;
    const newObj = { ...state, [name]: parseInt(value) };
    setState(newObj);
  };
  useEffect(() => {
    const newData = { ...state, CANTPED: total };
    setState(newData);
  }, [total]);
  const [form] = Form.useForm();
  return (
    <Modal
      width={1100}
      visible={visible}
      title="SCC"
      onCancel={onCancel}
      footer={[
        <Button style={{backgroundColor:'#85a5ff'}}>
              PASE A PEDIDOS 
            </Button>,
        <Button key="back" onClick={onCancel}>
              Cancelar
            </Button>,
          <Button
            key="submit"
            loading={loading}
            onClick={() => {
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
            Guardar
          </Button>
      ]}
    >
      {status === 400 ? (
        <Result
          status="warning"
          title="There are some problems with your operation."
        />
      ) : (
        <Form form={form} layout="inline" onChange={change}>
          <Row gutter={[20, 20]}>
            <Form.Item label="S.C.C Nro">
              <Input value={state.NROSCC} />
            </Form.Item>
            <Form.Item label="Cliente">
              <Input value={state.CLIENTE} />
            </Form.Item>
            <Form.Item label="Art">
              <Input value={state.CLIENTE} />
            </Form.Item>

            <Form.Item
              label="Precio"
              className="collection-create-form_last-form-item"
              name="PRECIO"
              rules={[{ required: true, message: 'Por favor seleccion una opcion' }]}
            >
              <Radio.Group>
                <Radio value={state.PRECIOLIST}>
                  {state.PRECIOLIST} <Tag color="magenta"> Lista </Tag>
                </Radio>
                <Radio value={state.PRECFACT}>
                  {state.PRECFACT} <Tag color="gold"> Facturado </Tag>
                </Radio>
              </Radio.Group>
            </Form.Item>

            <Col span={24}>
              <Form.Item name="COMENTARIO" label="Obs">
                <TextArea rows={2} />
              </Form.Item>
            </Col>

            <Col span={3}>
              <Form.Item label="TU">
                <Input name="CANTPEDT00" value={state.CANTPEDT00} min={0} />
              </Form.Item>
            </Col>
            <Col span={3}>
              <Form.Item label="01">
                <Input name="CANTPEDT01" value={state.CANTPEDT01} min={0} />
              </Form.Item>
            </Col>
            <Col span={3}>
              <Form.Item label="02">
                <Input name="CANTPEDT02" value={state.CANTPEDT02} min={0} />
              </Form.Item>
            </Col>
            <Col span={3}>
              <Form.Item label="03">
                <Input name="CANTPEDT03" value={state.CANTPEDT03} min={0} />
              </Form.Item>
            </Col>
            <Col span={3}>
              <Form.Item label="04">
                <Input name="CANTPEDT04" value={state.CANTPEDT04} min={0} />
              </Form.Item>
            </Col>
            <Col span={3}>
              <Form.Item label="05">
                <Input name="CANTPEDT05" value={state.CANTPEDT05} min={0} />
              </Form.Item>
            </Col>
            <Col span={3}>
              <Form.Item label="S">
                <Input name="CANTPEDT06" value={state.CANTPEDT06} min={0} />
              </Form.Item>
            </Col>
            <Col span={3}>
              <Form.Item label="M">
                <Input name="CANTPEDT07" value={state.CANTPEDT07} min={0} />
              </Form.Item>
            </Col>
            <Col span={3}>
              <Form.Item label="L">
                <Input name="CANTPEDT08" value={state.CANTPEDT08} min={0} />
              </Form.Item>
            </Col>
            <Col span={3}>
              <Form.Item label="XL">
                <Input name="CANTPEDT09" value={state.CANTPEDT09} min={0} />
              </Form.Item>
            </Col>
            <Col span={3}>
              <Form.Item label="XXL">
                <Input name="CANTPEDT10" value={state.CANTPEDT10} min={0} />
              </Form.Item>
            </Col>
            <Col span={3}>
              <Form.Item label="08">
                <Input name="CANTPEDT11" value={state.CANTPEDT11} min={0} />
              </Form.Item>
            </Col>
            <Col span={3}>
              <Form.Item label="09">
                <Input name="CANTPEDT12" value={state.CANTPEDT12} min={0} />
              </Form.Item>
            </Col>
            <Col span={3}>
              <Form.Item label="10">
                <Input name="CANTPEDT13" value={state.CANTPEDT13} min={0} />
              </Form.Item>
            </Col>
            <Col span={3}>
              <Form.Item label="XXX">
                <Input name="CANTPEDT14" value={state.CANTPEDT14} min={0} />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item label="Total">
                <Input value={total} min={0} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      )}
    </Modal>
  );
};
export const AprobacionSCC = () => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(200);
  const dispatch = useDispatch();
  const { solicitudControlCalidad, articulos, modal } = useSelector(
    (state) => state
  );
  const todasLasSolicitudes = solicitudControlCalidad.scc;
  console.log(todasLasSolicitudes);
  const visible = modal.openModal;
  const todosLosArt = articulos.art;
  const data = solicitudControlCalidad.data;

  const [datoSelect, setDatoSelect] = useState(data);
  useEffect(() => {
    setDatoSelect(data);
  }, [data]);

  useEffect(() => {
    dispatch(todasLasSCC());
  }, [dispatch]);
  useEffect(() => {
    dispatch(todasLasTalles());
  }, [dispatch]);
  useEffect(() => {
    dispatch(todosLosArticulos());
  }, [dispatch]);

  const buscarNombrePorArt = (art) => {
    const buscarNomArt = todosLosArt?.find((t) => t.NUMERO === art);
    return buscarNomArt?.DESCRIP;
  };
  const onCreate = async (values) => {
     setLoading(true);
    const response= await dispatch(
      editarSCC(datoSelect.NROSCC, {
        ...datoSelect,
        ...values,
        APROBDEP: "S",
        APROBCRED: "S",
        RECHAZADO: "N",
      })
    )
   
   console.log(response);
   if(response.status === 200){
    setTimeout(() => {
     setLoading(false);
   dispatch(cerrarModal());
    }, 3000);
   }else{
     setStatus(response.status)
     setLoading(false);
     
   }
    
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

  return (
    <div>
      <CollectionCreateForm
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          dispatch(cerrarModal());
          setStatus(200)
          
        }}
        loading={loading}
        status={status}
        setState={setDatoSelect}
        state={datoSelect}
      />
      <Table
        size="small"
        bordered
        dataSource={memoizedValue}
        columns={ColumnaSCC()}
        loading={todasLasSolicitudes.length === 0 ? true : false}
      />
    </div>
  );
};

