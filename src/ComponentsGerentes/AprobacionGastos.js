import React, { useState, useEffect, useRef } from "react";
import {
  Table,
  Input,
  Button,
  Space,
  Modal,
  Switch,
  Radio,
  Form,
  Row,
  Col,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { AiOutlineDelete } from "react-icons/ai";
import { BsCheck } from "react-icons/bs";
import { Card, Avatar } from "antd";
import { axiosURL } from "../config/axiosURL";
import Swal from "sweetalert2";
import "./css/aprob.css";
import { PeticionGET } from "../config/PeticionGET";
import { TodosGastos } from "./helpers/funciones";
const expandable = {
  expandedRowRender: (record) => <p>{record.description}</p>,
};
export const AprobacionGastos = () => {
  const N = localStorage.getItem("N"); // numero de registro
  const [gastoPendiente, setGastoPendiente] = useState(); //estado de a fn
  const [data, setData] = useState([]);
  const [mensaje, setMensaje] = useState({
    respMensaje: "",
    estado: "",
  });
  const [state, setState] = useState({
    searchText: "",
    searchedColumn: "",
  });
  const [ste, setSte] = useState({
    bordered: false,
    expandable,
    rowSelection: {},
    hasData: true,
  });
  const { TextArea } = Input;
  const searchInput = useRef("");
  /** peticion get trae todo los gastos */
  const axiosGet = async () => {
    let result = await axiosURL.get("/gastos");
    setData(result.data);
  };
  useEffect(() => {
    axiosGet();
  }, []);
  /***** modal ******/
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showModal = (datos) => {
    setVisible(true);
    setGastoPendiente(datos);

  };
  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };
  const handleCancel = () => {
    setVisible(false);
  };
  /**seleccion de check */
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
  };
  /**fin seleccion de check */
  const aprobado = async () => {
    N === "902"
      ? await axiosURL.put(`/gasto/aprobado/${gastoPendiente.id}`, {
        ...mensaje,
        estadoFinal: "aprobado",
        notificacion: "inactiva",
        estado: "aprobado",
        f: new Date().toLocaleString(),
      })
      : await axiosURL.put(`/gasto/aprobado/${gastoPendiente.id}`, {
        ...mensaje,
        estado: "aprobado",
      });
    setVisible(false);
    setMensaje({ respMensaje: "" });
    axiosGet();
  };
  const rechazado = async () => {
    await axiosURL.put(`/gasto/rechazado/${gastoPendiente.id}`, {
      ...mensaje,
      estado: "rechazado",
      notificacion: "inactiva",
      estadoFinal: "rechazado",
    });
    setVisible(false);
    setMensaje({ respMensaje: "" });
    axiosGet();
  };
  /***** fin modal *****/

  const handleChange = (e) => {
    // para registrar los cambios del formulario
    const { name, value } = e.target;
    setMensaje({ ...mensaje, [name]: value });
  };
  const dtos = PeticionGET("/departamentos"); // peticion get para traer todos los departamentos

  /***** table *****/
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setState({
                searchText: selectedKeys[0],
                searchedColumn: dataIndex,
              });
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
          .toString()
          .toLowerCase()
          .includes(value.toLowerCase())
        : "",
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput, 100);
      }
    },
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setState({ searchText: "" });
  };
  /**Fin tabla */
  const formaDepago = PeticionGET("/mpagos");
  const columns = [
    {
      title: "N° de anticipo",
      dataIndex: "id",
      key: "id",
      ...getColumnSearchProps("id"),
    },
    {
      title: "Nombre",
      dataIndex: "nombre",
      key: "nombre",
      ...getColumnSearchProps("nombre"),
    },
    {
      title: "Apellido",
      dataIndex: "apellido",
      key: "apellido",
      ...getColumnSearchProps("apellido"),
    },
    {
      title: "Departamento",
      dataIndex: "departamento",
      key: "departamento",
      render: (estado, file) => {
        const Dto = dtos.find((d) => d.id === file.usuario?.departamentoId);
        const DtoSelect = Dto?.departamento;
        return <span style={{ marginLeft: "10px" }}>{DtoSelect}</span>;
      },
    },
    {
      title: "Forma de Pago",
      dataIndex: "formapagoId",
      key: "formapagoId",
      render: (state, file) => {
        const buscarMediodePago = formaDepago.find(
          (f) => f.id === file.formapagoId
        );
        const pago = buscarMediodePago?.pago;
        return <span>{pago}</span>;
      },
      ...getColumnSearchProps("formapagoId"),
    },

    {
      title: "Importe",
      dataIndex: "importe",
      key: "importe",
    },
    {
      title: "Devolucion",
      dataIndex: "importerendido",
      key: "importerendido",
      render: (state, file) => (
        <>
          {file.importe < file.importerendido ? (
            <p style={{ color: "red" }}> {file.importerendido} </p>
          ) : (
            <p style={{ color: "green" }}>{file.importerendido} </p>
          )}
        </>
      ),
    },
    {
      title: "Fecha de Solicitud",
      dataIndex: "fecha",
      key: "fecha",
      ...getColumnSearchProps("fecha"),
    },
    {
      title: "Mensaje",
      dataIndex: "notas",
      key: "mensaje",
    },
    {
      title: "Sin Anticipo",
      dataIndex: "sinAnticipo",
      key: "sinAnticipo",
    },

    {
      title: "Estado",
      dataIndex: "estado",
      key: "estado",
      render: (estado, file) => {
        const color = () => {
          switch (file.estado) {
            case "pendiente":
              return <p style={{ color: "yellow" }}> pendiente...</p>;
            case "aprobado":
              return <p style={{ color: "green" }}> aprobado </p>;
            default:
              return <p style={{ color: "red" }}> rechazado </p>;
          }
        };
        return <>{color()}</>;
      },
    },

    {
      title: N === "902" && "Aprobacion Final",
      dataIndex: "estadoFinal",
      key: "estadoFinal",
      render: (estado, file) => {
        const color = () => {
          switch (file.estadoFinal) {
            case "pendiente":
              return <p style={{ color: "yellow" }}> pendiente...</p>;
            case "aprobado":
              return <p style={{ color: "green" }}> aprobado </p>;
            default:
              return <p style={{ color: "red" }}> rechazado </p>;
          }
        };
        return <> {N === "902" && color()}</>;
      },
    },
    {
      title: "Acciones",
      dataIndex: "acciones",
      key: "acciones",
      render: (f, fila) => {
        return (
          <>
            <Button className="btn-aprob" onClick={() => showModal(fila)}>
              
              {
                fila.estadoFinal==='aprobado'?'':<BsCheck />
              }
              
            </Button>
          </>
        );
      },
    },
    {
      title: "Borrar ",
      dataIndex: "borrar ",
      key: "borrar",
      render: (f, fila) => {
        const handleDelete = async () => {
          console.log("me clickeaste para borrar");
          let resultado = await Swal.fire({
            title: "¿Estás seguro?",
            text: "¡No podrás revertir esto!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Borrar",
          });
          if (resultado.isConfirmed) {
            await axiosURL.delete(`/gastos/borrar/${fila.id}`);
            Swal.fire("Borrado!", "Su archivo se borró con exito.", "success");
            axiosGet();
          }
        };
        return (
          <Button className="btn-aprob" onClick={handleDelete}>
            <AiOutlineDelete />
          </Button>
        );
      },
    },
  ];
  /****** fin de table *****/


// TodosGastos viene de helpers
  const datos = TodosGastos(data)?.map((f) => {
    return {
      ...f,
      key: f.id,
      nombre: f.usuario.nombre,
      apellido: f.usuario.apellido,
      description: (
        <Row gutter={[10, 10]}>
          {f.rendicion.map((r) => (
            <>
              <Col xs={6} sm={4} md={4} lg={4} xl={4}>
                <Card
                  style={{
                    width: 200,
                    border: "solid 2px #ddd",
                    height: "auto",
                  }}
                >
                  <img
                    style={{ width: 100, height: 100 }}
                    alt="example"
                    src={r.imagen}
                  />
                  <p>
                    <b>Fecha:</b> {r.fecha}
                  </p>
                  <p>
                    <b>Categoria:</b> {r.categoria}
                  </p>
                  <p>
                    <b>Importe:</b> ${r.importe}
                  </p>
                  <p>
                    <b>Nota:</b> {r.notas}
                  </p>
                </Card>
              </Col>
            </>
          ))}
        </Row>
      ),
    };
  });

  /**agregado de tabla */

  const handleToggle = (prop) => (enable) => {
    setSte({ ...ste, [prop]: enable });
  };

  const handleExpandChange = (enable) => {
    console.log(enable);
    setSte({ ...ste, expandable: enable ? expandable : undefined });
  };

  const handleRowSelectionChange = (enable) => {
    console.log(enable);
    setSte({
      ...ste,
      rowSelection: enable
        ? {
          onChange: (selectedRowKeys, selectedRows) => {
            console.log(
              `selectedRowKeys: ${selectedRowKeys}`,
              "selectedRows: ",
              selectedRows
            );
          },
        }
        : undefined,
    });
  };

  const handleYScrollChange = (enable) => {
    setSte({ ...ste, yScroll: enable });
  };
  const handleXScrollChange = (e) => {
    setSte({ ...ste, xScroll: e.target.value });
  };

  const { xScroll, yScroll } = ste;

  const scroll = {};
  if (yScroll) {
    scroll.y = 450;
  }
  if (xScroll) {
    scroll.x = "100vw";
  }

  const tableColumns = columns.map((item) => ({
    ...item,
    ellipsis: ste.ellipsis,
  }));
  if (xScroll === "fixed") {
    tableColumns[0].fixed = true;
    tableColumns[tableColumns.length - 1].fixed = "right";
  }
  /**fin de agregado  */
  return (
    <>
      <Form
        layout="inline"
        className="components-table-demo-control-bar"
        style={{ marginBottom: 16 }}
      >
        <Form.Item label="Bordered">
          <Switch checked={ste.bordered} onChange={handleToggle("bordered")} />
        </Form.Item>
        <Form.Item label="Expandable">
          <Switch checked={!!ste.expandable} onChange={handleExpandChange} />
        </Form.Item>
        <Form.Item label="Checkbox">
          <Switch
            checked={!!ste.rowSelection}
            onChange={handleRowSelectionChange}
          />
        </Form.Item>
        <Form.Item label="Fixed Header">
          <Switch checked={!!yScroll} onChange={handleYScrollChange} />
        </Form.Item>
        <Form.Item label="Table Scroll">
          <Radio.Group value={xScroll} onChange={handleXScrollChange}>
            <Radio.Button value={undefined}>Unset</Radio.Button>
            <Radio.Button value="scroll">Scroll</Radio.Button>
            <Radio.Button value="fixed">Fixed Columns</Radio.Button>
          </Radio.Group>
        </Form.Item>
      </Form>
      <Table
        {...ste}
        columns={tableColumns}
        dataSource={ste.hasData ? datos : null}
        scroll={scroll}
      //rowSelection={{ ...rowSelection}}
      />
      <Modal
        title="Anticipo de Sueldo"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={rechazado}>
            Rechazado
          </Button>,
          <Button key="submit" type="primary" onClick={aprobado}>
            Aprobado
          </Button>,
        ]}
      >
        <section>
          <TextArea
            name="respMensaje"
            rows={4}
            placeholder="Mensaje para el empleado"
            onChange={handleChange}
            value={mensaje.respMensaje}
          />
        </section>
      </Modal>
    </>
  );
};
