import { types } from "../types/type";

export const clientesReducer =(state={},action)=>{

    switch (action.type) {
        case types.clientes:
            return{
               ...state,
               clientes: action.payload
            }
            
        default:
            return state;

    }
 
}