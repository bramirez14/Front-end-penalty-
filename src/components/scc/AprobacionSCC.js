import React, { useState, useEffect, useMemo } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

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
  Switch,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  todasLasSCC,
  todosLosArticulos,
  todasLasTalles,
  cerrarModal,
  editarSCC,
  pasePedidos,
  todosLosClientes,
} from "../../redux/actions/scc";
import { SccExcel } from "./excel/SccExcel";
import { ColumnaSCC } from "./columnas/columnaSCC";
import { axiosURL } from "../../config/axiosURL";
const { TextArea } = Input;

const CollectionCreateForm = ({
  visible,
  onCreate,
  onCancel,
  loading,
  status,
  setState,
  state,
  getAllSccRequests
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
    state.CANTPEDT14+
    state.CANTPED ;
    const totalReal= !total ? state.CANTPED : total 
  const change = (e) => {
    const { value, name } = e.target;
    const newObj = { ...state, [name]: parseInt(value) };
    setState(newObj);
  };

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
                getAllSccRequests();
              })
              .catch((info) => {
              });
          }}
        >
          Guardar
        </Button>,
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
              <Input value={state.NROSCC}  />
            </Form.Item>
            <Form.Item label="Cliente">
              <Input value={state.CLIENTE} />
            </Form.Item>
            <Form.Item label="Artículo">
              <Input value={state.ARTICULO} />
            </Form.Item>

            <Form.Item
              label="Precio"
              className="collection-create-form_last-form-item"
              name="PRECIO"
              rules={[
                { required: true, message: "Por favor seleccion una opcion" },
              ]}
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
              <Form.Item label={state.ALFA01}>
                <Input
                type="number"
                  name="CANTPEDT00"
                  value={state.CANTPEDT00}
                  min={0}
                />
              </Form.Item>
            </Col>
            <Col span={3}>
              <Form.Item label={state.ALFA02}>
                <Input
                type="number"
                  name="CANTPEDT01"
                  value={state.CANTPEDT01}
                  min={0}
                />
              </Form.Item>
            </Col>
            <Col span={3}>
              <Form.Item label={state.ALFA03}>
                <Input
                type="number"
                  name="CANTPEDT02"
                  value={state.CANTPEDT02}
                  min={0}
                />
              </Form.Item>
            </Col>
            <Col span={3}>
              <Form.Item label={state.ALFA04}>
                <Input
                type="number"
                  name="CANTPEDT03"
                  value={state.CANTPEDT03}
                  min={0}
                />
              </Form.Item>
            </Col>
            <Col span={3}>
              <Form.Item label={state.ALFA05}>
                <Input
                type="number"
                  name="CANTPEDT04"
                  value={state.CANTPEDT04}
                  min={0}
                />
              </Form.Item>
            </Col>
            <Col span={3}>
              <Form.Item label={state.ALFA06}>
                <Input
                type="number"
                  name="CANTPEDT05"
                  value={state.CANTPEDT05}
                  min={0}
                />
              </Form.Item>
            </Col>
            <Col span={3}>
              <Form.Item label={state.ALFA07}>
                <Input
                type="number"
                  name="CANTPEDT06"
                  value={state.CANTPEDT06}
                  min={0}
                />
              </Form.Item>
            </Col>
            <Col span={3}>
              <Form.Item label={state.ALFA08}>
                <Input
                type="number"
                  name="CANTPEDT07"
                  value={state.CANTPEDT07}
                  min={0}
                />
              </Form.Item>
            </Col>
            <Col span={3}>
              <Form.Item label={state.ALFA09}>
                <Input
                type="number"
                  name="CANTPEDT08"
                  value={state.CANTPEDT08}
                  min={0}
                />
              </Form.Item>
            </Col>
            <Col span={3}>
              <Form.Item label={state.ALFA10}>
                <Input
                type="number"
                  name="CANTPEDT09"
                  value={state.CANTPEDT09}
                  min={0}
                />
              </Form.Item>
            </Col>
            <Col span={3}>
              <Form.Item label={state.ALFA11}>
                <Input
                type="number"
                  name="CANTPEDT10"
                  value={state.CANTPEDT10}
                  min={0}
                />
              </Form.Item>
            </Col>
            <Col span={3}>
              <Form.Item label={state.ALFA12}>
                <Input
                type="number"
                  name="CANTPEDT11"
                  value={state.CANTPEDT11}
                  min={0}
                />
              </Form.Item>
            </Col>
            <Col span={3}>
              <Form.Item label={state.ALFA13}>
                <Input
                type="number"
                  name="CANTPEDT12"
                  value={state.CANTPEDT12}
                  min={0}
                />
              </Form.Item>
            </Col>
            <Col span={3}>
              <Form.Item label={state.ALFA14}>
                <Input
                type="number"
                  name="CANTPEDT13"
                  value={state.CANTPEDT13}
                  min={0}
                />
              </Form.Item>
            </Col>
            <Col span={3}>
              <Form.Item label={state.ALFA15}>
                <Input
                type="number"
                  name="CANTPEDT14"
                  value={state.CANTPEDT14}
                  min={0}
                />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item label="Total">
                <Input
                type value={state.CANTPED + totalReal} min={0} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      )}
    </Modal>
  );
};
export const AprobacionSCC = () => {
const [dataSCC, setDataSCC] = useState([]);
  const [isAprob, setIsAprob] = useState(false);
  const [loading, setLoading] = useState(false);
const [datosExcel, setDatosExcel] = useState([] );
  const [status, setStatus] = useState(200);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { solicitudControlCalidad, articulos, modal } = useSelector(
    (state) => state
  );

  const todasLasSolicitudes = dataSCC;
  const todasLasSolicitudesOrdenadas  =  todasLasSolicitudes?.sort((a,b) => {
if(b.FECEMISION < a.FECEMISION) return -1
if (b.FECEMISION < a.FECEMISION)  return 1 
return 0

  })

  const getAllSccRequests = async () => {
    try {
      const response = await axiosURL.get("/scc/todos/registros");
      const datos = await response.data[0];
      setDataSCC(datos);
    } catch (e) {}
  };
  useEffect(() => {
    getAllSccRequests();
  }, []);
  const newTodasLasSol = todasLasSolicitudesOrdenadas?.filter(
    (t) =>  !!t.NROCOMP 
  );
  
  const listaSCC = todasLasSolicitudesOrdenadas?.filter(
    (t) =>  !t.NROCOMP && t.RECHAZADO!== 'S'
  );
  const visible = modal.openModal;
  const data = solicitudControlCalidad.data;
  const [datoSelect, setDatoSelect] = useState(data);
  const todosExcel = ( ) => {
    let dataExcel = todasLasSolicitudes?.map((t) => ({
      ...t,
      FECEMISION:t.FECEMISION.split('T')[0],
      FECFACT:t.FECFACT.split('T')[0],
      key: t.NROSCC,

    }));
    setDatosExcel(dataExcel)
  };
  useEffect(() => {
    setDatoSelect(data);
  }, [data]);
  // useEffect(() => {
  //   dispatch(todasLasSCC());
  // }, [dispatch]);
  useEffect(() => {
    dispatch(todasLasTalles());
  }, [dispatch]);
  useEffect(() => {
    dispatch(todosLosArticulos());
  }, [dispatch]);
  useEffect(() => {
    dispatch(todosLosClientes());
  }, [dispatch]);

  const onCreate = async (values) => {
   
    const buscandoNroSCC = todasLasSolicitudes.find(t=> t.NROSCC=== datoSelect.NROSCC)
      const total =
      datoSelect.CANTPEDT00 +
      datoSelect.CANTPEDT01 +
      datoSelect.CANTPEDT02 +
      datoSelect.CANTPEDT03 +
      datoSelect.CANTPEDT04 +
      datoSelect.CANTPEDT05 +
      datoSelect.CANTPEDT06 +
      datoSelect.CANTPEDT07 +
      datoSelect.CANTPEDT08 +
      datoSelect.CANTPEDT09 +
      datoSelect.CANTPEDT10 +
      datoSelect.CANTPEDT11 +
      datoSelect.CANTPEDT12 +
      datoSelect.CANTPEDT13 +
      datoSelect.CANTPEDT14;

if(buscandoNroSCC.CANTPED <= total){

  setLoading(true);
  const response = await dispatch(
    editarSCC(datoSelect.NROSCC, {
      ...datoSelect,
      ...values,
      APROBDEP: "S",
      APROBCRED: "S",
      RECHAZADO: "N",
    })
  );
  if (response.status === 200) {
    setTimeout(() => {
      setLoading(false);
      dispatch(cerrarModal());
    }, 3000);
  } else {
    setStatus(response.status);
    setLoading(false);
  }
}else{
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'La curva de talles no coinciden con el total!',
  })
}
  };
  
/*   const memoAprobados = useMemo(
    () => todasLasSolicitudes,
    [todasLasSolicitudes]
  ); */
  const paseAPedidos = async () => {
    const response = await dispatch(pasePedidos());
    if (response.status === 200) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: " SCC se guardo con exito!",
        showConfirmButton: false,
        timer: 2000,
      });
      navigate("/");
    }
  };
  useEffect(() => {todosExcel()},[todasLasSolicitudes])
  return (
    <div>
      <CollectionCreateForm
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          dispatch(cerrarModal());
          setStatus(200);
        }}
        loading={loading}
        status={status}
        setState={setDatoSelect}
        state={datoSelect}
        getAllSccRequests={getAllSccRequests}
      />
     { todasLasSolicitudes?.length === 0 ? '':
      <Row style={{ marginTop: 20, marginBottom: 20 }}>
        <Col span={24}>
          <SccExcel data={datosExcel} />
        </Col>

        <Col span={24}>
          <Switch
            checkedChildren="Finalizados"
            unCheckedChildren="Pendientes"
            defaultChecked
            onChange={() => setIsAprob(!isAprob)}
            style={{ marginRight: 10 }}
          />
        </Col>
      </Row>
      }
      <Table
        title={() => (
          <Button onClick={() => paseAPedidos()}>PASE A PEDIDOS</Button>
        )}
        size="small"
        bordered
        dataSource={!isAprob ? newTodasLasSol: listaSCC}
        columns={ColumnaSCC()}
        loading={todasLasSolicitudes?.length === 0 ? true : false}
        scroll={{ y:400}}
      />
    </div>
  );
};
