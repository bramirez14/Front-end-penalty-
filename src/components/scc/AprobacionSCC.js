import React, { useState, useEffect, useMemo } from "react";
import Swal from 'sweetalert2'
import {useNavigate} from 'react-router'
import '../css/inputNumber.css'
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
  Progress,
  Switch,
  InputNumber
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  todasLasSCC,
  todosLosArticulos,
  todasLasTalles,
  cerrarModal,
  editarSCC,
  pasePedidos,
} from "../../redux/actions/scc";
import {ColumnaSCC} from './columnas/ColumnaSCC'
import { SccExcel } from "./excel/SccExcel";
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
                <InputNumber  controls={false} name="CANTPEDT00" value={state.CANTPEDT00} min={0} />
              </Form.Item>
            </Col>
            <Col span={3}>
              <Form.Item label="01">
                <InputNumber controls={false} name="CANTPEDT01" value={state.CANTPEDT01} min={0} />
              </Form.Item>
            </Col>
            <Col span={3}>
              <Form.Item label="02">
                <InputNumber controls={false} name="CANTPEDT02" value={state.CANTPEDT02} min={0} />
              </Form.Item>
            </Col>
            <Col span={3}>
              <Form.Item label="03">
                <InputNumber controls={false} name="CANTPEDT03" value={state.CANTPEDT03} min={0} />
              </Form.Item>
            </Col>
            <Col span={3}>
              <Form.Item label="04">
                <InputNumber controls={false} name="CANTPEDT04" value={state.CANTPEDT04} min={0} />
              </Form.Item>
            </Col>
            <Col span={3}>
              <Form.Item label="05">
                <InputNumber controls={false} name="CANTPEDT05" value={state.CANTPEDT05} min={0} />
              </Form.Item>
            </Col>
            <Col span={3}>
              <Form.Item label="S">
                <InputNumber controls={false} name="CANTPEDT06" value={state.CANTPEDT06} min={0} />
              </Form.Item>
            </Col>
            <Col span={3}>
              <Form.Item label="M">
                <InputNumber controls={false} name="CANTPEDT07" value={state.CANTPEDT07} min={0} />
              </Form.Item>
            </Col>
            <Col span={3}>
              <Form.Item label="L">
                <InputNumber controls={false} name="CANTPEDT08" value={state.CANTPEDT08} min={0} />
              </Form.Item>
            </Col>
            <Col span={3}>
              <Form.Item label="XL">
                <InputNumber controls={false} name="CANTPEDT09" value={state.CANTPEDT09} min={0} />
              </Form.Item>
            </Col>
            <Col span={3}>
              <Form.Item label="XXL">
                <InputNumber controls={false} name="CANTPEDT10" value={state.CANTPEDT10} min={0} />
              </Form.Item>
            </Col>
            <Col span={3}>
              <Form.Item label="08">
                <InputNumber controls={false} name="CANTPEDT11" value={state.CANTPEDT11} min={0} />
              </Form.Item>
            </Col>
            <Col span={3}>
              <Form.Item label="09">
                <InputNumber controls={false} name="CANTPEDT12" value={state.CANTPEDT12} min={0} />
              </Form.Item>
            </Col>
            <Col span={3}>
              <Form.Item label="10">
                <InputNumber controls={false} name="CANTPEDT13" value={state.CANTPEDT13} min={0} />
              </Form.Item>
            </Col>
            <Col span={3}>
              <Form.Item label="XXX">
                <InputNumber controls={false} name="CANTPEDT14" value={state.CANTPEDT14} min={0} />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item label="Total">
                <InputNumber controls={false} value={total} min={0} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      )}
    </Modal>
  );
};
export const AprobacionSCC = () => {
  const [isAprob,setIsAprob] = useState(false)
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(200);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { solicitudControlCalidad, articulos, modal } = useSelector(
    (state) => state
  );
  const todasLasSolicitudes = solicitudControlCalidad.scc;
  console.log(todasLasSolicitudes);
  const listaSCC = todasLasSolicitudes?.filter( t => t.APROBCRED==='S' && t.APROBDEP==='S' &&  t.NROCOMP === null );
  console.log(listaSCC,'LINE 232');
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
  const memoAprobados = useMemo(
    () => todos(todasLasSolicitudes),
    [todasLasSolicitudes]
  );
 const paseAPedidos = async() =>{
const response = await dispatch(pasePedidos()) 
if(response.status===200){
Swal.fire({
  position: 'center',
  icon: 'success',
  title: ' SCC se guardo con exito!',
  showConfirmButton: false,
  timer: 2000
})
navigate('/')
} 
}
console.log(isAprob);
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
      /><Row style={{ marginTop: 20, marginBottom: 20 }}>
          <Col span={24}>   
           <SccExcel data={memoAprobados}/>
          
          </Col>
  
    
        <Col span={24} >
          <Switch
            checkedChildren="Finalizados"
            unCheckedChildren="Pendientes"
            defaultChecked
            onChange={() => setIsAprob(!isAprob)}
            style={{ marginRight: 10 }}
          />
        </Col>
      </Row>
      <Table
        title={()=><Button onClick={()=>paseAPedidos()} >PASE A PEDIDOS</Button>}
        size="small"
        bordered
        dataSource={!isAprob?memoAprobados:todos(listaSCC)}
        columns={ ColumnaSCC()}
        loading={todasLasSolicitudes?.length === 0 ? true : false}
      />
          
    </div>
  );
};

