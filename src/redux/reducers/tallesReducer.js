import { types } from "../types/type";

export const tallesReducer =(state={},action)=>{

    switch (action.type) {
        case types.talles:
            return{
               ...state,
               talle: action.payload
            }
            
        default:
            return state;

    }

}