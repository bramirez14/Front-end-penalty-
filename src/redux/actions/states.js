import { axiosURL } from "../../config/axiosURL";
import { types } from "../types/type"
// son las acciones que hacen los reducers

export const getSueldo=()=> async(dispatch) =>{
try {
    const response = await axiosURL.get('/anticipo');
    const datos = await response.data 
    dispatch({ type:types.sueldo, payload: datos })
} catch (e) {
    dispatch({ type: 'error', error: e.message })
    console.log(e)
}

}
export const getVacaciones =() => async (dispatch)=>{
    try {
        const response = await axiosURL.get('/vacaciones');
        const datos = await response.data 
        dispatch({ type:types.vacaciones, payload: datos })

    } catch (e) {
        dispatch({ type:'error',error:e.message})
    }
}

export const getGastos=() => async (dispatch)=>{
    try {
        const response = await axiosURL.get('/gastos');
        const datos = await response.data 
        dispatch({ type:types.gastos, payload: datos })

    } catch (e) {
        dispatch({ type:'error',error:e.message})
    }
}

export const getKm =() => async (dispatch)=>{
    try {
        const response = await axiosURL.get('/todos/kilometros');
        const datos = await response.data 
        dispatch({ type:types.km, payload: datos })

    } catch (e) {
        dispatch({ type:'error',error:e.message})
    }
}
export const getUsuario =(id) => async (dispatch)=>{
    try {
        const response = await axiosURL.get(`/${id}`);
        const datos = response.data 
        dispatch({ type:types.usuario, payload: datos })

    } catch (e) {
        dispatch({ type:'error',error:e.message})
    }
}
export const getTarjetaCredito=() => async (dispatch)=>{
    try {
        const response = await axiosURL.get('/tarjeta/credito');
        const datos = response.data 
        dispatch({ type:types.tjc, payload: datos });

    } catch (e) {
        dispatch({ type:'error',error:e.message})
    }
}
