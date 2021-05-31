import React, { useContext, useState, useEffect, useRef } from "react";
import { Table, Input, Button, Space, Modal } from "antd";
import { UserContext } from "../contexto/UserContext";
import { SearchOutlined } from "@ant-design/icons";
import { AiOutlineDelete } from "react-icons/ai";
import { BsCheck } from "react-icons/bs";

import axiosURL from "../config/axiosURL";
import Swal from "sweetalert2";
import "./css/aprob.css";

export const AprobacionAntcipoSueldo = () => {
  const [anticipoPendiente, setAnticipoPendiente] = useState();
  const [data, setData] = useState([]);
  const Text = useContext(UserContext);
  const [mensaje, setMensaje] = useState({
    respMensaje: "",
    estado: "",
  });
  const [state, setState] = useState({
    searchText: "",
    searchedColumn: "",
  });
  const { open } = Text;
  const { TextArea } = Input;
  const searchInput = useRef("");
  const axiosGet = async () => {
    let result = await axiosURL.get("/anticipo");
    setData(result.data);
  };
  useEffect(() => {
    axiosGet();
  }, []);

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
    await axiosURL.put(`/anticipo/aprobado/${anticipoPendiente.id}`, {
      ...mensaje,
      estado: "aprobado",
    });
    setVisible(false);
    setMensaje({ respMensaje: "" });
    axiosGet();
  };
  const rechazado = async () => {
    await axiosURL.put(`/anticipo/rechazado/${anticipoPendiente.id}`, {
      ...mensaje,
      estado: "rechazado",
    });
    setVisible(false);
    setMensaje({ respMensaje: "" });
    axiosGet();
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
      title: "Mensaje",
      dataIndex: "mensaje",
      key: "mensaje",
    },
    {
      title: "Estado",
      dataIndex: "estado",
      key: "estado",
      render: (estado,file) =>{
        
        const color =()=>{
          console.log(file.estado);
          switch (file.estado) {
            case 'pendiente':
              return(<h6 style={{color:'yellow'}}> pendiente...</h6> )
              case 'aprobado':
           return (<h6 style={{color:'green'}}> aprobado </h6>)
            default: 
            return(<h6 style={{color:'red'}}> rechazado </h6>)
          }}
       return(
         <>
         {
           color()
         }
         </>
       )
      }

    },
    {
      title: "Acciones",
      dataIndex: "acciones",
      key: "acciones",
      render: (f, fila) => {
        return (
          <>
            <Button className='btn-aprob' onClick={() => showModal(fila)}>
                  <BsCheck/>
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
            await axiosURL.delete(`/borrar/anticipo/${fila.id}`);
            Swal.fire("Borrado!", "Su archivo se borró con exito.", "success");
            axiosGet();
          }
        };
        return <Button className='btn-aprob' onClick={handleDelete}> <AiOutlineDelete/> </Button>;
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
