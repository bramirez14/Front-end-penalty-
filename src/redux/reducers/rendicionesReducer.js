import { types } from "../types/type";

export const rendicionesReducer =(state={},action)=>{

    switch (action.type) {
        case types.tarjeta_credito:
            return{
               ...state,
               tj: action.payload
            }
            
          
        default:
            return state;

    }

}
