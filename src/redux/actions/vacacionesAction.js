import { types } from "../types/type"
import { axiosURL } from "../../config/axiosURL";

export const todasLasVacaciones =() => async (dispatch)=>{
    try {
        const response = await axiosURL.get('/vacaciones/todas');
        const datos = await response.data 
        dispatch({ type:types.todasvacaciones, payload: datos })

    } catch (e) {
        dispatch({ type:'error',error:e.message})
    }
}