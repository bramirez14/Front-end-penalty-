import React, { useState, useContext } from "react";
import { axiosURL } from "../../config/axiosURL";
import { PeticionGET } from "../../config/PeticionGET";
import { Input, Button } from "antd";
import { AiOutlineDelete } from "react-icons/ai";
import Swal from "sweetalert2";
import { HelperMODAL } from "../../helpers/HelperMODAL";
import { BsCheck } from "react-icons/bs";
import { useGet } from "../../hooks/useGet";
import { colSueldo } from "./destructuracionCol/colSueldo";
import { SocketContext } from "../../context/SocketContext";

export const ColumnasSueldo = () => {
const {socket} = useContext(SocketContext);
  const N = localStorage.getItem("N");
  const id = localStorage.getItem('uid')
  const datosUsuario= PeticionGET(`/${id}`)
  const [mensaje, setMensaje] = useState({
    respMensaje: "",
    estado: "",
  });
  const usuarios= PeticionGET(`/allusers`)
  const filtro902 = usuarios.filter(u=> u.nvendedor==='902')
  const filtro906 = usuarios.filter(u=> u.nvendedor==='906')
  const { TextArea } = Input;
  const [ data,axiosGet] =useGet('/anticipo')
  const aprobado = async (file) => {  
  // envio usuario 902
    const obj902={
    alerta:mensaje.respMensaje,
    info:`Tenes una aprobacion final`,
    f: new Date().toLocaleString(),
    nombre:`${datosUsuario.nombre} ${datosUsuario.apellido}`,
    estado:'activa',
    path:'/aprobacion/sueldo',
    emisor:datosUsuario.email,
    usuarioId:datosUsuario.id,
  }
  //envio usuario quien corresponda
  const obj={
    alerta:mensaje.respMensaje,
    info:`Resolucion de  anticipo de ${file.sueldo} `,
    f: new Date().toLocaleString(),
    msj:mensaje.respMensaje,
    nombre:`${datosUsuario.nombre} ${datosUsuario.apellido}`,
    estado:'activa',
    path:'/estado/usuario',
    emisor:datosUsuario.email,
    receptor:file.usuario.email,
    usuarioId:datosUsuario.id,
  }
  //envio usuarios 906
  const obj906={
    alerta:'Aprobado por gerencia',
    info:`Tenes un anticipo de ${file.sueldo}`,
    f: new Date().toLocaleString(),
    estado:'activa',
    nombre:`${datosUsuario.nombre} ${datosUsuario.apellido}`,
    path:'/pagos/anticipo',
    emisor:datosUsuario.email,
    usuarioId:datosUsuario.id,
  }
//condicional de  gerentes
    if (N === "902") {
      socket.emit('alerta-nueva',obj);
      for (const i of filtro906){
        const objNew={...obj906,receptor:i.email}
        socket.emit('alerta-nueva',objNew);
        }
      await axiosURL.put(`/anticipo/aprobado/${file.id}`, {
        ...mensaje,
        estadoFinal: "aprobado",
        notificacion: "inactiva",
        estado: "aprobado",
        listo: "Si",
        fd: new Date().toLocaleString(),
      });
     
    } else {
      await axiosURL.put(`/anticipo/aprobado/${file.id}`, {
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

  //rechazado
  const rechazado = async (file) => {
    await axiosURL.put(`/anticipo/rechazado/${file.id}`, {
      ...mensaje,
      estado: "rechazado",
      notificacion: "inactiva",
      estadoFinal: "rechazado",
      fd: new Date().toLocaleString(),
    });
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
    // para registrar los cambios del formulario
    const { name, value } = e.target;
    setMensaje({ ...mensaje, [name]: value });
  };

  const columnasSueldo = [
    ...colSueldo,
    {
      title: N === "902" ? "Aprobacion Final":'',
      dataIndex: "estadoFinal",
      key: "estadoFinal",
      width:N=== "902"?120:0,
      render: (estado, file) => {
        const color = () => {
          switch (file.estadoFinal) {
            case "pendiente":
              return <h5 style={{ color:'#F79E0B'  }}> pendiente...</h5>;
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
      width:100,
      render: (f, file) => {
        return (
          <>
            {file.estadoFinal === "aprobado" ||
            file.estadoFinal === "rechazado" ? (
              ""
            ) : (
              <HelperMODAL
                boton={<BsCheck />}
                title="Aprobacion Ant Sueldo"
                Return="Rechazar"
                Submit="Aprobacion"
                click={() => aprobado(file)}
                noclick={() => rechazado(file)}
                className="btn-aprob"
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
      width:100,
      render: (f, file) => {
        const handleDelete = async () => {
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
            await axiosURL.delete(`/anticipo/borrar/${file.id}`);
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

  return [columnasSueldo, data];
};
