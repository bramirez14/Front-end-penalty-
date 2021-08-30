import React, { useState, useEffect } from "react";
import { Input, Button } from "antd";
import { axiosURL } from "../../config/axiosURL";
import { BsCheck } from "react-icons/bs";
import { HelperMODAL } from "../../helpers/HelperMODAL";
import { AiOutlineDelete } from "react-icons/ai";
import { colGastos } from "./destructuracionCol/colGasto";
import Swal from "sweetalert2";
import { PeticionGET } from "../../config/PeticionGET";
import { alerta905, alertaGerencia } from "../helpers/funciones";

export const ColumnasGastos = () => {
  const [data, setData] = useState([]);
  const [mensaje, setMensaje] = useState({
    respMensaje: "",
    estado: "",
  });
  const N = localStorage.getItem("N"); // numero de registro
  const id = localStorage.getItem('uid')
  const datos = PeticionGET(`/${id}`)
  const usuario905 = PeticionGET(`/allusers`)
  const filtroUsuario905= usuario905.filter(u=>u.nvendedor === '905')
  const filtrodata905 = filtroUsuario905.map(f=> 
  {return{receptor:f.email,emisor:f.gerente.email,
 nombre:`${f.nombre} ${f.apellido}`,
 alerta: 'solicitud aprobada',
 info:'Tenes una operacion de  Gasto',
 id,
 path:'/vista/rendicion/gasto'
 }});
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
    
    const obj={
      ...datos,
      ...file,
      msj:mensaje.respMensaje,
      estado:'APROBADO',
      info:'Respuesta de tu rendicion de Gasto',
      path:'/estado/usuario'
    }
    if(N === "902")
   {   
      
     if( file.sinAnticipo ==='sin'){
       await alerta905(filtrodata905)
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
      ...datos,
      ...file,
      msj:mensaje.respMensaje,
      estado:'RECHAZADO',
      info:'Respuesta de tu rendicion de Gasto',
      path:'/estado/usuario'
    }
    alertaGerencia(obj)
  };
 
  const columnasGastos = [
    ...colGastos,
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
