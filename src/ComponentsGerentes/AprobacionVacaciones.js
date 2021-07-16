import React, { useContext, useState, useEffect, useRef } from "react";
import { UserContext } from "../contexto/UserContext";
import { Table, Input, Button, Space, Modal} from 'antd';
import { SearchOutlined } from "@ant-design/icons";
import { BsCheck } from "react-icons/bs";
import { AiOutlineDelete } from "react-icons/ai";
import {axiosURL} from "../config/axiosURL";
import Swal from "sweetalert2";
import "./css/aprob.css";
import {PeticionGET} from "../config/PeticionGET";

export const AprobacionVacaciones = () => {
    const Text = useContext(UserContext);
  const { open } = Text;
  const [data, setData] = useState([]);
  const { TextArea } = Input;
  const N = localStorage.getItem("N");// numero de registro 


 const [mensaje, setMensaje] = useState({
    respMensaje: "",
    estado: "",
  });
  const axiosGet = async () => {
    let result = await axiosURL.get('/vacaciones');
    setData(result.data);
  };
  useEffect(() => {
    axiosGet();
  }, []);
/**Declarando el estado */
const [state, setState] = useState({
    searchText: "",
    searchedColumn: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setMensaje({ ...mensaje, [name]: value });
  };
    /**modal*/
    const [vacacionesPendiente  , setVacacionesPendiente  ] = useState()
    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    
    const showModal = (datos) => {
        setVisible(true);
        setVacacionesPendiente(datos);
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
        console.log(vacacionesPendiente.id);
        N === "902"
      ? await axiosURL.put(`/vacaciones/aprobado/${vacacionesPendiente.id}`, {
          ...mensaje,
          estadoFinal: "aprobado",
          notificacion: "inactiva",
          estado: "aprobado",
          f:new Date().toLocaleString()
        })
      : await axiosURL.put(`/vacaciones/aprobado/${vacacionesPendiente.id}`, {
          ...mensaje,
          estado: "aprobado",
        });
        setVisible(false);
        setMensaje({ respMensaje: "" });
        axiosGet();
      };
      const rechazado = async () => {
        await axiosURL.put(`/vacaciones/rechazado/${vacacionesPendiente.id}`,{
          ...mensaje,
          estado: "rechazado",
          notificacion: "inactiva",
          estadoFinal: "rechazado",
        });// trabajando
        setVisible(false);
        setMensaje({ respMensaje: "" });
        axiosGet();
      };
      /**fin modal */



  
  const searchInput = useRef("");
  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
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
          <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
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
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
    onFilterDropdownVisibleChange: visible => {
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

 const  handleReset = clearFilters => {
    clearFilters();
    setState({ searchText: '' });
  };
/**Columnas */
  const columns = [
       {
      title: "N° de solicitud",
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
      title: 'Periodo',
      dataIndex: 'periodo',
      key: 'periodo',
      width: '30%',
      ...getColumnSearchProps('periodo'),
    },
    {
      title: 'Fecha de Solicitud',
      dataIndex: 'fechaSolicitud',
      key: 'fechaSolicitud',
      width: '20%',
      ...getColumnSearchProps('fechaSolicitud'),
    },
    {
        title: 'Fecha Desde',
        dataIndex: 'fechaDesde',
        key: 'fechaDesde',
        width: '20%',
        ...getColumnSearchProps('fechaDesde'),
      },
      {
        title: 'Fecha Hasta',
        dataIndex: 'fechaHasta',
        key: 'fechaHasta',
        width: '20%',
        ...getColumnSearchProps('fechaHasta'),
      },
      {
        title: 'Mensaje',
        dataIndex: 'obs',
        key: 'obs',
        width: '20%',
        ...getColumnSearchProps('obs'),
      },
      {
        title: 'Faltantes',
        dataIndex: 'diasFaltantes',
        key: 'diasFaltantes',
        width: '20%',
        ...getColumnSearchProps('diasFaltantes'),
      },
    {
        title: "Estado",
        dataIndex: "estado",
        key: "estado",
        render: (estado,file) =>{
          
          const color =()=>{
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
              await axiosURL.delete(`/vacaciones/borrar/${fila.id}`);
              Swal.fire("Borrado!", "Su archivo se borró con exito.", "success");
              axiosGet();
            }
          };
          return <Button className='btn-aprob' onClick={handleDelete}> <AiOutlineDelete/> </Button>;
        },
      },
  ];

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
          (d) => d.usuario.departamentoId === 3 || d.estado === "aprobado"
        ); // aca filtramos por gerente 902 Cristian Ramos

      default:
        return data.filter(
          (d) => d.usuario.departamentoId === 4 || d.usuario.departamentoId === 5
        ); // aca filtramos por gerente 903 Cristian DeSousa

    }
  };
  const dtos = PeticionGET("/departamentos");// peticion get para traer todos los departamentos 

  const datos = gerentes()?.map((f) => {
    let buscardtoId = dtos?.find((d) => d.id === f.usuario.departamentoId);//usuario filtrado por dto
    return {
      ...f,
      key: f.id,
      nombre: f.usuario.nombre,
      apellido: f.usuario.apellido,
      departamento: buscardtoId?.departamento,
    };
  });




    return (
      <>
            <Table columns={columns} dataSource={datos} />
            <Modal
        title="Anticipo de Vacaciones"
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
    )
}
