import React, { useContext, useState, useEffect, useRef } from "react";
import { Table, Input, Button, Space, Modal } from "antd";
import { UserContext } from "../contexto/UserContext";
import { SearchOutlined } from "@ant-design/icons";
import { AiOutlineDelete } from "react-icons/ai";
import { BsCheck } from "react-icons/bs";

import {axiosURL} from "../config/axiosURL";
import Swal from "sweetalert2";
import "./css/aprob.css";
import {PeticionGET} from "../config/PeticionGET";

export const AprobacionAntcipoSueldo = () => {
  const N = localStorage.getItem("N");// numero de registro 
  const id = localStorage.getItem('uid')
  const [anticipoPendiente, setAnticipoPendiente] = useState();//estado de a fn 
  const [data, setData] = useState([]);
  const Text = useContext(UserContext);// useContext 
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
  const dtos = PeticionGET("/departamentos");// peticion get para traer todos los departamentos 

  /** peticion get trae todo los anticipos  */
  const axiosGet = async () => {
    let result = await axiosURL.get("/anticipo");
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
    N === "902"
      ? await axiosURL.put(`/anticipo/aprobado/${anticipoPendiente.id}`, {
          ...mensaje,
          estadoFinal: "aprobado",
          notificacion: "inactiva",
          estado: "aprobado",
          f:new Date().toLocaleString()
        })
      : await axiosURL.put(`/anticipo/aprobado/${anticipoPendiente.id}`, {
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
      notificacion: "inactiva",
      estadoFinal: "rechazado",
    });
    setVisible(false);
    setMensaje({ respMensaje: "" });
    axiosGet();
  };
  /***** fin modal *****/

  const handleChange = (e) => { // para registrar los cambios del formulario 
    const { name, value } = e.target;
    setMensaje({ ...mensaje, [name]: value });
  };
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
      render:  (estado, file) => {
        const Dto = dtos.find(d=> d.id===file.usuario?.departamentoId)
        const DtoSelect= Dto?.departamento
        return( <span style={{marginLeft:'10px'}}>{DtoSelect}</span>)

      },

      ...getColumnSearchProps("departamento"),
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
      render: (estado, file) => {
        const color = () => {
          switch (file.estado) {
            case "pendiente":
              return <h6 style={{ color: "yellow" }}> pendiente...</h6>;
            case "aprobado":
              return <h6 style={{ color: "green" }}> aprobado </h6>;
            default:
              return <h6 style={{ color: "red" }}> rechazado </h6>;
          }
        };
        return <>{color()}</>;
      },
    },
   
    { 
    
      title: N==='902' && "Aprobacion Final",
      dataIndex: "estadoFinal",
      key: "estadoFinal",
      render: (estado, file) => {
        const color = () => {
          switch (file.estadoFinal) {
            case "pendiente":
              return <h6 style={{ color: "yellow" }}> pendiente...</h6>;
            case "aprobado":
              return <h6 style={{ color: "green" }}> aprobado </h6>;
            default:
              return <h6 style={{ color: "red" }}> rechazado </h6>;
          }
        };
        return <> { N=== '902' && color()}</>;
      },
    },
    {
      title: "Acciones",
      dataIndex: "acciones",
      key: "acciones",
      render: (f, fila) => {
        return (
          <>
             {fila.estadoFinal==='aprobado'|| fila.estadoFinal==='rechazado'? '':
            <Button className="btn-aprob" onClick={() => showModal(fila)}>
            <BsCheck />
          </Button>
          
          }
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
            await axiosURL.delete(`/anticipo/borrar/${fila.id}`);
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

  /**selecion de gerente  recordamos que Cristian Rios da el ok final*/
  const gerentes = () => {
    switch (N) {
      case "901":
        return data.filter(
          (d) =>
            d.usuario.departamentoId === 1 || d.usuario.departamentoId === 2
        ); // aca filtramos por gerente 901 alias Esteban Ramos

      case "902":
        return data.filter(
          (d) => d.usuario.departamentoId === 5 || d.estado === "aprobado"
        ); // aca filtramos por gerente 902 Cristian Ramos

      default:
        return data.filter(
          (d) => d.usuario.departamentoId === 3 || d.usuario.departamentoId === 4
        ); // aca filtramos por gerente 903 Cristian DeSousa

    }
  };

  const datos = gerentes()?.map((f) => {
    return {
      ...f,
      key: f.id,
      nombre: f.usuario.nombre,
      apellido: f.usuario.apellido,
    };
  });

  return (
    <>
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
      </>
  );
};
// falta acomodar  y distribuir en varios estados