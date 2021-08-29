import { axiosURL } from "../../../config/axiosURL"

export const postData= async(url,datos) =>{
return await  axiosURL.post(url,{km:"100"})
}

export const alerta = async (datosUsuario,msj,nombre) =>{
        const mailEmpleado = datosUsuario.email;
        const mailGerente = datosUsuario.gerente.email;
        const nuevoObj = {
          alerta: msj,
          info: nombre,
          nombre:`${datosUsuario.nombre} ${datosUsuario.apellido}`,
          f: new Date().toLocaleString(),
          emisor: mailEmpleado,
          receptor: mailGerente,
          estado:'activa',
          usuarioId:datosUsuario.id
        };
        const res = await axiosURL.post("/msg/alerta", nuevoObj);
        return res;
}