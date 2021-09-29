import React, { useState, useEffect,useContext } from "react";
import { Input, Button } from "antd";
import { axiosURL } from "../../config/axiosURL";
import { BsCheck } from "react-icons/bs";
import { HelperMODAL } from "../../helpers/HelperMODAL";
import { AiOutlineDelete } from "react-icons/ai";
import Swal from "sweetalert2";
import { PeticionGET } from "../../config/PeticionGET";
import { colVacaciones } from "./destructuracionCol/colVacaciones";
import { alerta902, alertaGerencia } from "../helpers/funciones";
import { SocketContext } from "../../context/SocketContext";

var numberFormat = new Intl.NumberFormat("es-ES");

export const ColumnasVacaciones = () => {
const {socket} = useContext(SocketContext);

  const N = localStorage.getItem("N");
  const id = localStorage.getItem('uid')
  const datosUsuario= PeticionGET(`/${id}`)
  const usuarios= PeticionGET(`/allusers`)
  const filtro902 = usuarios.filter(u=> u.nvendedor==='902')
  const [data, setData] = useState([]);
  const { TextArea } = Input;

  const [mensaje, setMensaje] = useState({
    respMensaje: "",
    estado: "",
  });
  const axiosGet = async () => {
    let result = await axiosURL.get("/vacaciones");
    setData(result.data);
  };
  useEffect(() => {
    axiosGet();
  }, []);
  const aprobado = async (file) => {
    // envio usuario 902
    const obj902={
      alerta:mensaje.respMensaje,
      info:`Tenes una aprobacion final`,
      f: new Date().toLocaleString(),
      nombre:`${datosUsuario.nombre} ${datosUsuario.apellido}`,
      estado:'activa',
      path:'/aprobacion/vacaciones',
      emisor:datosUsuario.email,
      usuarioId:datosUsuario.id,
    }
    //envio usuario quien corresponda
    const obj={
      alerta:mensaje.respMensaje,
      info:`Resolucion  de tus  vacaciones`,
      f: new Date().toLocaleString(),
      msj:mensaje.respMensaje,
      estado:'activa',
      path:'/estado/usuario',
      emisor:datosUsuario.email,
      receptor:file.usuario.email,
      usuarioId:datosUsuario.id,
    }
    //validacion de gerencia
    if(N === "902"){    
    socket.emit('alerta-nueva',obj);
    await axiosURL.put(`/vacaciones/aprobado/${file.id}`, {
          ...mensaje,
          estadoFinal: "aprobado",
          notificacion: "inactiva",
          estado: "aprobado",
          fd: new Date().toLocaleString(),
        })}else{
      await axiosURL.put(`/vacaciones/aprobado/${file.id}`, {
                ...mensaje,
                estado: "aprobado",
              });
              for (const i of filtro902){
                const objNew={...obj902,receptor:i.email}
                socket.emit('alerta-nueva',objNew);
                }
        }
    setMensaje({ respMensaje: "" });
    axiosGet();
  };
  const rechazado = async (file) => {
    await axiosURL.put(`/vacaciones/rechazado/${file.id}`, {
      ...mensaje,
      estado: "rechazado",
      notificacion: "inactiva",
      estadoFinal: "rechazado",
      fd: new Date().toLocaleString(),
    }); // trabajando
    setMensaje({ respMensaje: "" });
    axiosGet();
    const obj={
      alerta:mensaje.respMensaje,
      info:`Resolucion de  anticipo de ${file.sueldo} `,
      f: new Date().toLocaleString(),
      msj:mensaje.respMensaje,
      estado:'activa',
      path:'/estado/usuario',
      emisor:datosUsuario.email,
      receptor:file.usuario.email,
      usuarioId:datosUsuario.id,
    }
   socket.emit('alerta-nueva',obj);

  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setMensaje({ ...mensaje, [name]: value });
  };
  const columnasVacaciones = [
    ...colVacaciones,
  
    {
      title: N === "902" && "Aprobacion Final",
      dataIndex: "estadoFinal",
      key: "estadoFinal",
      width: N === "902" ? 150 : 0,
      lupa: false,
      render: (estado, file) => {
        const color = () => {
          switch (file.estadoFinal) {
            case "pendiente":
              return <h5 style={{ color: '#F79E0B' }}> pendiente...</h5>;
            case "aprobado":
              return <h5 style={{ color: "green" }}> aprobado </h5>;
            default:
              return <h5 style={{ color: "red" }}> rechazado </h5>;
          }
        };
        return <> {N === "902" && color()}</>;
      },
    },
      {
        title: "Acciones",
        dataIndex: "acciones",
        key: "acciones",
        width: 100,
        lupa: false,
        render: (f, file) => {
          return (
            <>
              {file.estadoFinal === "aprobado" ||
              file.estadoFinal === "rechazado" ? (
                ""
              ) : (
                <HelperMODAL
                  boton={<BsCheck />}
                  title="Aprobacion Ant Vacaciones"
                  Return="Rechazar"
                  Submit="Aprobacion"
                  click={() => aprobado(file)}
                  noclick={() => rechazado(file)}
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
                </HelperMODAL>
              )}
            </>
          );
        },
      },
    
    {
      title: "Borrar ",
      dataIndex: "borrar ",
      key: "borrar",
      width: 100,
      lupa: false,
      render: (f, file) => {
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
            await axiosURL.delete(`/vacacion/borrar/${file.id}`);
            Swal.fire("Borrado!", "Su archivo se borró con exito.", "success");
            axiosGet();
          }
        };
        return (
          <Button className="btn-aprob" onClick={handleDelete}>
            {" "}
            <AiOutlineDelete />{" "}
          </Button>
        );
      },
    },
  ];

  return [columnasVacaciones, data];
};
