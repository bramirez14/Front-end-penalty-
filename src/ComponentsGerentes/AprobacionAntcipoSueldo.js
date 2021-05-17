import React, { useContext, useState, useEffect, useRef } from "react";
import { UserContext } from "../contexto/UserContext";
import { Table, Input, Button, Space, Modal } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import "./css/aprob.css";
import PeticionGET from "../config/PeticionGET";
import axiosURL from "../config/axiosURL";

export const AprobacionAntcipoSueldo = () => {
  const [data, setData] = useState([])
  const [anticipoPendiente, setAnticipoPendiente] = useState();
  const Text = useContext(UserContext);
  const { open } = Text;
  const { TextArea } = Input;
  const searchInput = useRef("");
  const [mensaje, setMensaje] = useState({
    respMensaje: "",
    estado: "",
  });
  const [state, setState] = useState({
    searchText: "",
    searchedColumn: "",
  });
  const axiosGet = async () => {
    let result = await axiosURL.get('/anticipo')
        setData(result.data)
  }
  useEffect(() => {
    axiosGet()
  }, [])

  /**modal*/
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showModal = (datos) => {
    setVisible(true);
    setAnticipoPendiente(datos);
  };
  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
  };
  const aprobado = async () => {
    await axiosURL.put(`/anticipo/aprobado/${anticipoPendiente.id}`,{...mensaje,estado:'aprobado'});
    setVisible(false);
    setMensaje({ respMensaje: "" });
    axiosGet()

  
  };
  const rechazado = async () => {
   await axiosURL.put(`/anticipo/rechazado/${anticipoPendiente.id}`, {...mensaje,estado:'rechazado'});
    setVisible(false);
    setMensaje({ respMensaje: "" });
    axiosGet()
  }; 
  /**fin modal */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setMensaje({ ...mensaje, [name]: value });
  };
  /*table*/
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
  const columns = [
  {  title: "N° de anticipo",
      dataIndex: "id",
      key: "anticipo",
      ...getColumnSearchProps("anticipo"), 
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
      title: "Devolucion",
      dataIndex: "sueldo",
      key: "sueldo",
      ...getColumnSearchProps("sueldo"),
    },
    {
      title: "Cuotas",
      dataIndex: "cuotas",
      key: "cuotas",
    
    },
    {
      title: "Importe",
      dataIndex: "importe",
      key: "importe",

    },
    {
      title: "Fecha de Solicitud",
      dataIndex: "fecha",
      key: "fecha",
      ...getColumnSearchProps("fecha"),
    },
    {
      title: "Estado",
      dataIndex: "estado",
      key: "estado",
    },
    {
      title: "Acciones",
      dataIndex: "acciones",
      key: "acciones",
      render: (f, fila) => {
        return (
          <>
            <Button type="primary" onClick={() => showModal(fila)}>
              solicitu
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
           await axiosURL.delete(
            `/borrar/anticipo/${fila.id}`
          );
          axiosGet();
        };
        return <Button onClick={handleDelete}>Delete</Button>;
      },
    },
  ];
  const datos = data?.map((f, i) => {
    return {
      ...f,
      key: f.id,
      nombre: f.usuario.nombre,
      apellido: f.usuario.apellido,
    };
  });

  return (
    <div className={!open ? "contenedor-aprob" : "contenedor-aprob-active"}>
      <Table columns={columns} dataSource={datos} />
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
    </div>
  );
};
