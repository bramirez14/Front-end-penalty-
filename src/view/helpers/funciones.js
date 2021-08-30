import { axiosURL } from "../../config/axiosURL";

export const alerta906 = async(obj) => {
    console.log(obj);
    const mailEmpleado = obj.usuario.email;
    const mailGerente = obj.mailGerente;
    const nuevoObj = {
      alerta: obj.msj,
      info: obj.info,
      nombre:`${obj.nombre} ${obj.apellido}`,
      f: new Date().toLocaleString(),
      emisor: mailEmpleado,
      receptor: mailGerente,
      estado:'activa',
      path:obj.path,
      usuarioId:obj.id
    };
    const res = await axiosURL.post("/msg/alerta", nuevoObj);
    return res;


}