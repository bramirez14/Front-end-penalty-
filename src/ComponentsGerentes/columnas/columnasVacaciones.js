import React, { useState, useEffect } from "react";
import { Input, Button } from "antd";
import { axiosURL } from "../../config/axiosURL";
import { BsCheck } from "react-icons/bs";
import { HelperMODAL } from "../../helpers/HelperMODAL";
import { AiOutlineDelete } from "react-icons/ai";
import Swal from "sweetalert2";
import { PeticionGET } from "../../config/PeticionGET";
import { colVacaciones } from "./destructuracionCol/colVacaciones";

var numberFormat = new Intl.NumberFormat("es-ES");

export const ColumnasVacaciones = () => {
  const N = localStorage.getItem("N");
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
  const aprobado = async (id) => {
    N === "902"
      ? await axiosURL.put(`/vacaciones/aprobado/${id}`, {
          ...mensaje,
          estadoFinal: "aprobado",
          notificacion: "inactiva",
          estado: "aprobado",
          fd: new Date().toLocaleString(),
        })
      : await axiosURL.put(`/vacaciones/aprobado/${id}`, {
          ...mensaje,
          estado: "aprobado",
        });
    setMensaje({ respMensaje: "" });
    axiosGet();
  };
  const rechazado = async (id) => {
    await axiosURL.put(`/vacaciones/rechazado/${id}`, {
      ...mensaje,
      estado: "rechazado",
      notificacion: "inactiva",
      estadoFinal: "rechazado",
      fd: new Date().toLocaleString(),
    }); // trabajando
    setMensaje({ respMensaje: "" });
    axiosGet();
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
      lupa: false,
      render: (f, fila) => {
        return (
          <>
            {fila.estadoFinal === "aprobado" ||
            fila.estadoFinal === "rechazado" ? (
              ""
            ) : (
              <HelperMODAL
                boton={<BsCheck />}
                title="Aprobacion Ant Vacaciones"
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
      lupa: false,
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
            await axiosURL.delete(`/vacacion/borrar/${fila.id}`);
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
