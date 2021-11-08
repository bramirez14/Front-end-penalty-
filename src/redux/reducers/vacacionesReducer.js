import { types } from "../types/type";

export const vacacionesReducer =(state={},action)=>{

    switch (action.type) {
        case types.todasvacaciones:
            return{
               ...state,
               vacaciones: action.payload
            }
        default:
            return state;

    }

}