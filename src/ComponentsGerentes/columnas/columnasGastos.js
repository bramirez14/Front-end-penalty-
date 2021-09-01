import React, { useState, useEffect,useContext } from "react";
import { Input, Button } from "antd";
import { axiosURL } from "../../config/axiosURL";
import { BsCheck } from "react-icons/bs";
import { HelperMODAL } from "../../helpers/HelperMODAL";
import { AiOutlineDelete } from "react-icons/ai";
import { colGastos } from "./destructuracionCol/colGasto";
import Swal from "sweetalert2";
import { PeticionGET } from "../../config/PeticionGET";
import { alerta902, alerta905, alertaGerencia } from "../helpers/funciones";
import { SocketContext } from "../../context/SocketContext";
import { alerta } from "../../components/solicitudes/helpers/funciones";

export const ColumnasGastos = () => {
const {socket} = useContext(SocketContext);

  const [data, setData] = useState([]);
  const [mensaje, setMensaje] = useState({
    respMensaje: "",
    estado: "",
  });
  const N = localStorage.getItem("N"); // numero de registro
  const id = localStorage.getItem('uid')
  const datosUsuario = PeticionGET(`/${id}`)
  const usuarios= PeticionGET(`/allusers`)
  const filtro902 = usuarios.filter(u=> u.nvendedor==='902')
  const filtro905 = usuarios.filter(u=> u.nvendedor==='905')
  const filtro906 = usuarios.filter(u=> u.nvendedor==='906')

  const { TextArea } = Input;
  const axiosGet = async () => {
    let result = await axiosURL.get("/gastos");
    setData(result.data);
  };
  useEffect(() => {
    axiosGet();
  }, []);
  const handleChange = (e) => {
    // para registrar los cambios del formulario
    const { name, value } = e.target;
    setMensaje({ ...mensaje, [name]: value });
  };
  const aprobado = async (file) => {
    
  // envio usuario 902
  const obj902={
    alerta:mensaje.respMensaje,
    info:`Tenes una aprobacion final`,
    f: new Date().toLocaleString(),
    nombre:`${datosUsuario.nombre} ${datosUsuario.apellido}`,
    estado:'activa',
    path:'/aprobacion/gastos',
    emisor:datosUsuario.email,
    usuarioId:datosUsuario.id,
  }
  //envio usuario quien corresponda
  const obj={
    alerta:mensaje.respMensaje,
    info:`Resolucion de  anticipo de gasto`,
    f: new Date().toLocaleString(),
    msj:mensaje.respMensaje,
    estado:'activa',
    path:'/estado/usuario',
    emisor:datosUsuario.email,
    receptor:file.usuario.email,
    usuarioId:datosUsuario.id,
  }
  //envio usuarios 905
  const obj905={
    alerta:'Aprobado por gerencia',
    info:`Tenes un anticipo de gasto`,
    f: new Date().toLocaleString(),
    estado:'activa',
    path:'/vista/rendicion/gasto',
    emisor:datosUsuario.email,
    usuarioId:datosUsuario.id,
  }
  //envio usuario 906
  const obj906={
    alerta:'Aprobado por gerencia',
    info:`Tenes un anticipo de gasto a pagar`,
    f: new Date().toLocaleString(),
    estado:'activa',
    path:'/pagos/gasto',
    emisor:datosUsuario.email,
    usuarioId:datosUsuario.id,
  }
//condicional de  gerentes
    if(N === "902"){   
      if( file.sinAnticipo ==='sin'){
      socket.emit('alerta-nueva',obj);
       for (const i of filtro905){
        const objNew={...obj905,receptor:i.email}
        socket.emit('alerta-nueva',objNew);
      }

     } else{
      socket.emit('alerta-nueva',obj);
      for (const i of filtro906){
        const objNew={...obj906,receptor:i.email}
        socket.emit('alerta-nueva',objNew);
      }
     }
    await  alertaGerencia(obj);
      await axiosURL.put(`/gasto/aprobado/${file.id}`, {
          ...mensaje,
          estadoFinal: "aprobado",
          notificacion: "inactiva",
          estado: "aprobado",
          fd: new Date().toLocaleString(),
       })}else{
        await axiosURL.put(`/gasto/aprobado/${file.id}`, {
                ...mensaje,
                estado: "aprobado",
              });
          setMensaje({ respMensaje: "" });
          await alerta902(obj902)
      }
    axiosGet();
  };
  const rechazado = async (file) => {
    await axiosURL.put(`/gasto/rechazado/${file.id}`, {
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
      info:`Resolucion de  anticipo de gasto`,
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
 
  const columnasGastos = [

    {
        title: N=== "902"&& 'Aprobacion Final',
        dataIndex: "estadoFinal",
        key: "estadoFinal",
        width:N=== "902"?170:0,
        lupa:false,
        render: (estado, file) => {
          const color = () => {
            switch (file.estadoFinal) {
              case "pendiente":
                return <span style={{ color: '#F79E0B' }}> pendiente...</span>;
              case "aprobado":
                return <span style={{ color: "green" }}> aprobado </span>;
              default:
                return <span style={{ color: "red" }}> rechazado </span>;
            }
          };
          return <h5 style={{marginLeft:20}}>{N=== "902" && color()}</h5>
        },
      },

    {
      title: "Acciones",
      dataIndex: "acciones",
      key: "acciones",
      width: 100,
      lupa:false,
      render: (f, file) => {
        return (
          <>
            {file.estadoFinal === "aprobado" ||
            file.estadoFinal === "rechazado" ? (
              ""
            ) : (
              <HelperMODAL
                boton={<BsCheck />}
                title="Aprobacion Ant Gasto"
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
    ...colGastos,

    {
      title: "Borrar ",
      dataIndex: "borrar ",
      key: "borrar",
      lupa:false,
      width:100,
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
            await axiosURL.delete(`/gasto/borrar/${file.id}`);
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
  

  return [columnasGastos,data]
};
