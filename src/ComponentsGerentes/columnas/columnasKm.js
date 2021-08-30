import React,{useState, useEffect} from 'react'
import { axiosURL } from '../../config/axiosURL';
import Swal from "sweetalert2";
import { AiOutlineDelete } from "react-icons/ai";
import { BsCheck } from "react-icons/bs";
import {
    Input,
    Button,
  } from "antd";
import { HelperMODAL } from '../../helpers/HelperMODAL';
import { colKm } from './destructuracionCol/colKm';
import { PeticionGET } from '../../config/PeticionGET';
import { alerta905, alertaGerencia } from '../helpers/funciones';
export const ColumnasKm = () => {
  const id = localStorage.getItem('uid')
    const N= localStorage.getItem("N");
  const [data, setData] = useState([]);

    const [mensaje, setMensaje] = useState({
        respMensaje: "",
        estado: "",
      });
      const datos=PeticionGET(`/${id}`)
      const usuario905 = PeticionGET(`/allusers`)
      const filtroUsuario905= usuario905.filter(u=>u.nvendedor === '905')
      const filtrodata905 = filtroUsuario905.map(f=> 
      {return{receptor:f.email,emisor:f.gerente.email,
     nombre:`${f.nombre} ${f.apellido}`,
     alerta: 'solicitud aprobada',
     info:'Tenes una operacion de  Km',
     id,
     path:'/vista/rendicion/km'
     }});
      const { TextArea } = Input;
      /** peticion get trae todo los gastos */
      const axiosGet = async () => {
        let result = await axiosURL.get("/todos/kilometros");
        setData(result.data);
      };
      useEffect(() => {
        axiosGet();
      }, []);
     
      const aprobado = async (file) => {
         const obj={
          ...datos,
          ...file,
          msj:mensaje.respMensaje,
          estado:'APROBADO',
          info:'Respuesta de tu rendicion de Kilometro',
          path:'/estado/usuario'
        }
        
       if( N === "902"){
        await alertaGerencia(obj);
        await alerta905(filtrodata905)
        await axiosURL.put(`/km/aprobado/${file.id}`, {
                    ...mensaje,
                    estadoFinal: "aprobado",
                    notificacion: "inactiva",
                    estado: "aprobado",
                    fd: new Date().toLocaleString(),
                  })
       }else{
        await axiosURL.put(`/km/aprobado/${file.id}`, {
                    ...mensaje,
                    estado: "aprobado",
                  });
       }
        setMensaje({ respMensaje: "" });
        axiosGet();
       
        

      };
      const rechazado = async (file) => {
        await axiosURL.put(`/km/rechazado/${file.id}`, {
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
          info:'Respuesta de tu rendicion de Kilometro',
          path:'/estado/usuario'
        }
        alertaGerencia(obj);
      };
      const handleChange = (e) => {
        // para registrar los cambios del formulario
        const { name, value } = e.target;
        setMensaje({ ...mensaje, [name]: value });
      };
      const columnasKm =[
        ...colKm,
          {
            title: N === "902" && "Aprobacion Final",
            dataIndex: "estadoFinal",
            key: "estadoFinal",
            width:N=== "902"?170:0,
              lupa:false,
            render: (estado, file) => {
              const color = () => {
                switch (file.estadoFinal) {
                  case "pendiente":
                    return <h5 style={{ color: '#F79E0B'  }}> pendiente...</h5>;
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
            lupa:false,
            render: (f, fila) => {
              return (
                <>
                {fila.estadoFinal === "aprobado" ||
            fila.estadoFinal === "rechazado" ? (
              ""
            ) : (
              <HelperMODAL
                boton={<BsCheck />}
                title="Aprobacion Ant Km"
                Return="Rechazar"
                Submit="Aprobacion"
                click={() => aprobado(fila)}
                noclick={() => rechazado(fila)}
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
            lupa:false,
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
                  await axiosURL.delete(`/km/borrar/${fila.id}`);
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
      ]
    return[columnasKm,data]
}
