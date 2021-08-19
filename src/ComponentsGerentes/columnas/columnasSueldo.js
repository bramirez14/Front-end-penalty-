import React, { useState, useEffect } from "react";
import { axiosURL } from "../../config/axiosURL";
import { PeticionGET } from "../../config/PeticionGET";
import { Input, Button } from "antd";
import { AiOutlineDelete } from "react-icons/ai";
import Swal from "sweetalert2";
import { HelperMODAL } from "../../helpers/HelperMODAL";
import { BsCheck } from "react-icons/bs";
import { useGet } from "../../hooks/useGet";
import { colSueldo } from "./destructuracionCol/colSueldo";

export const ColumnasSueldo = () => {
  const N = localStorage.getItem("N");
  const [mensaje, setMensaje] = useState({
    respMensaje: "",
    estado: "",
  });
  const { TextArea } = Input;
const [ data,axiosGet] =useGet('/anticipo')
  const aprobado = async (id) => {
    if (N === "902") {
      await axiosURL.put(`/anticipo/aprobado/${id}`, {
        ...mensaje,
        estadoFinal: "aprobado",
        notificacion: "inactiva",
        estado: "aprobado",
        listo: "Si",
        fd: new Date().toLocaleString(),
      });
    } else {
      console.log("soy usuario distiton de 902");
      await axiosURL.put(`/anticipo/aprobado/${id}`, {
        ...mensaje,
        estado: "aprobado",
      });
    }
    setMensaje({ respMensaje: "" });
    axiosGet();
  };
  const rechazado = async (id) => {
    await axiosURL.put(`/anticipo/rechazado/${id}`, {
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

  const columnasSueldo = [
   ...colSueldo,
    {
      title: N === "902" ? "Aprobacion Final":'',
      dataIndex: "estadoFinal",
      key: "estadoFinal",
      width:N=== "902"?150:0,
      lupa:false,
      render: (estado, file) => {
        const color = () => {
          switch (file.estadoFinal) {
            case "pendiente":
              return <h5 style={{ color: "yellow" }}> pendiente...</h5>;
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
      lupa:false,
      width:100,
      render: (f, fila) => {
        return (
          <>
            {fila.estadoFinal === "aprobado" ||
            fila.estadoFinal === "rechazado" ? (
              ""
            ) : (
              <HelperMODAL
                boton={<BsCheck />}
                title="Aprobacion Ant Sueldo"
                Return="Rechazar"
                Submit="Aprobacion"
                click={() => aprobado(fila.id)}
                noclick={() => rechazado(fila.id)}
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
      lupa:false,
      width:100,
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

  return [columnasSueldo, data];
};
