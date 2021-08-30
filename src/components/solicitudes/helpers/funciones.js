import { axiosURL } from "../../../config/axiosURL"

export const postData= async(url,datos) =>{
return await  axiosURL.post(url,{km:"100"})
}

export const alerta = async (obj) =>{
  console.log(obj);
        const mailEmpleado = obj.email;
        const mailGerente = obj.gerente.email;
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