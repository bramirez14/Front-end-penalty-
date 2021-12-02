import { types } from "../types/type";

export const articulosReducer =(state={},action)=>{

    switch (action.type) {
        case types.art:
            return{
               ...state,
               art: action.payload
            }
            
        default:
            return state;

    }

}