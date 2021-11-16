import { types } from "../types/type";

export const sccReducer =(state={},action)=>{

    switch (action.type) {
        case types.scc:
            return{
               ...state,
               scc: action.payload
            }
        default:
            return state;

    }

}