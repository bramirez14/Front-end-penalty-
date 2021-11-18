import { types } from "../types/type"
import { axiosURL } from "../../config/axiosURL";

export const todasLasSCC =() => async (dispatch)=>{
    try {
        const response = await axiosURL.get('/scc/todos/registros');
        const datos = await response.data 
        dispatch({ type:types.scc, payload: datos })

    } catch (e) {
        dispatch({ type:'error',error:e.message})
    }
}
export const todosLosArticulos = () => async (dispatch)=>{
    try {
        const response = await axiosURL.get('/scc/todos/articulos');
        const datos = await response.data 
        console.log(datos);
        dispatch({ type:types.art, payload: datos[0] })
    } catch (e) {
        dispatch({ type:'error',error:e.message})
        
    }
}