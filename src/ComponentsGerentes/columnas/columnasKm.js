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
export const ColumnasKm = () => {
    const N= localStorage.getItem("N");
  const [data, setData] = useState([]);

    const [mensaje, setMensaje] = useState({
        respMensaje: "",
        estado: "",
      });
      
      const { TextArea } = Input;
      /** peticion get trae todo los gastos */
      const axiosGet = async () => {
        let result = await axiosURL.get("/todos/kilometros");
        setData(result.data);
      };
      useEffect(() => {
        axiosGet();
      }, []);
    
    
    
     
      const aprobado = async (id) => {
        N === "902"
          ? await axiosURL.put(`/km/aprobado/${id}`, {
            ...mensaje,
            estadoFinal: "aprobado",
            notificacion: "inactiva",
            estado: "aprobado",
            fd: new Date().toLocaleString(),
          })
          : await axiosURL.put(`/km/aprobado/${id}`, {
            ...mensaje,
            estado: "aprobado",
          });
        setMensaje({ respMensaje: "" });
        axiosGet();
      };
      const rechazado = async (id) => {
        await axiosURL.put(`/km/rechazado/${id}`, {
          ...mensaje,
          estado: "rechazado",
          notificacion: "inactiva",
          estadoFinal: "rechazado",
          fd: new Date().toLocaleString(),
        });
        setMensaje({ respMensaje: "" });
        axiosGet();
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
                    return <span style={{ color: "yellow" }}> pendiente...</span>;
                  case "aprobado":
                    return <span style={{ color: "green" }}> aprobado </span>;
                  default:
                    return <span style={{ color: "red" }}> rechazado </span>;
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
                click={() => aprobado(fila.id)}
                noclick={() => rechazado(fila.id)}
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
