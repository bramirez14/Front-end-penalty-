import { axiosURL } from "../../config/axiosURL";
import { types } from "../types/type";


export const getTarjetaCredito=() => async (dispatch)=>{
    try {
        const response = await axiosURL.get('/tarjeta/credito');
        const datos = response.data 
        dispatch({ type:types.todastc, payload: datos });

    } catch (e) {
        dispatch({ type:'error',error:e.message})
    }
}
export const  tarjetaCredito=(values,history)=> async (dispatch,getState)=>{
    const datosUsuario = getState().peticiones_GET.usuario;
    try {
        let f = new FormData();
        f.append("file", values.file[0].originFileObj);
        f.append("nombre", datosUsuario.nombre);
        f.append("apellido", datosUsuario.apellido);
        f.append('tarjeta',values.tarjeta);
        f.append('importe',values.importe);
        f.append('nota',values.nota)
        const response = await axiosURL.post('/tarjeta/credito',f);
        const data= response.data;
        dispatch({ type:types.tarjeta_credito,payload: data})
            if (response.data.status === 200) {
          history.push("/perfil");
        }
     
        
    } 
    catch (e) {
    dispatch({ type:'error',error:e.message})
}
}

/* export const todaslasTC = (  tc ) => ({
    type:types.solicitudTC,
    payload: tc
}); */
