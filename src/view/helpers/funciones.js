import { axiosURL } from "../../config/axiosURL";

export const alerta906 = async(obj) => {
    
    const nuevoObj = {
      alerta: obj.msj,
      info: obj.info,
      nombre:`${obj.nombre} ${obj.apellido}`,
      f: new Date().toLocaleString(),
      emisor:  obj.email,
      receptor: obj.receptor,
      estado:'activa',
      path:obj.path,
      usuarioId:obj.id
    };
    const res = await axiosURL.post("/msg/alerta", nuevoObj);
    return res;


}