import React,{useState, useEffect, useContext} from 'react'
import { axiosURL } from '../../config/axiosURL';
import Swal from "sweetalert2";
import { AiOutlineDelete } from "react-icons/ai";
import { BsCheck } from "react-icons/bs";
import {
    Input,
    Button,
    Row,
    Col,
    Card,
} from "antd";
import { HelperMODAL } from '../../helpers/HelperMODAL';
import { colKm } from './destructuracionCol/colKm';
import { PeticionGET } from '../../config/PeticionGET';
import { SocketContext } from '../../context/SocketContext';

export const ColumnasKm = () => {
  const {socket} = useContext(SocketContext)
  const id = localStorage.getItem('uid')
  const N= localStorage.getItem("N");
  const [data, setData] = useState([]);

    const [mensaje, setMensaje] = useState({
        respMensaje: "",
        estado: "",
      });
      const datosUsuario=PeticionGET(`/${id}`)
      const usuarios= PeticionGET(`/allusers`)
      const filtro902 = usuarios.filter(u=> u.nvendedor==='902');
      const filtro905 = usuarios.filter(u=> u.nvendedor==='905');
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
        //envio usuario 902
        const obj902={
          alerta:mensaje.respMensaje,
          info:`Tenes una aprobacion final`,
          f: new Date().toLocaleString(),
          nombre:`${datosUsuario.nombre} ${datosUsuario.apellido}`,
          estado:'activa',
          path:'/aprobacion/km',
          emisor:datosUsuario.email,
          usuarioId:datosUsuario.id,
        }
        //envio usuario quien corresponda
        const obj={
          alerta:mensaje.respMensaje,
          info:`Resolucion de  anticipo de km`,
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
          path:'/vista/rendicion/Km',
          emisor:datosUsuario.email,
          usuarioId:datosUsuario.id,
        }
      
      //condicional de  gerentes
        
       if( N === "902"){
         socket.emit('alerta-nueva',obj)
         for (const i of filtro905){
          const objNew={...obj905,receptor:i.email}
          socket.emit('alerta-nueva',objNew);
        }

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
                  for (const i of filtro902){
                    const objNew={...obj902,receptor:i.email}
                    socket.emit('alerta-nueva',objNew);
                    }
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
            render: (f, fila) => {
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
          {
            dataIndex: "rendiciones ",
            key: "rendiciones",
            width:140,
            render: (f, file) => {
              
              
              return (
               <HelperMODAL boton='Rendiciones' longModal='1000px'>
                  <Row gutter={[10, 10]}>
                  {file.rendicionKm.map((r) => (
            <>
              <Col xs={6} sm={6} md={6} lg={6} xl={6}>
                <Card
                  style={{
                    width: 200,
                    border: "solid 2px #ddd",
                    height: "auto",
                  }}
                >
                  <p>
                    <b>Fecha:</b> {r.fechaSelect}
                  </p>
                  <p>
                    <b> Km Inicial:</b> {r.KmI}
                  </p>
                  
                  <p>
                    <b>Km Final:</b> {r.KmF}
                  </p>
                  <p>
                    <b>Km Recorrido :</b> {r.KmRecorrido}
                  </p>
                  <p>
                    <b>Nota :</b> {r.nota}
                  </p>
                  <p>
                    <b>Importe :</b> ${r.importe}
                  </p>
                </Card>
              </Col>
            </>
          ))}
              </Row>
               </HelperMODAL>        );
            },
      
          },
      ]
    return[columnasKm,data]
}
