import { types } from "../types/type";

export const rendicionesReducer =(state={},action)=>{
/* console.log(state,'state');
console.log(action,'action'); */
    switch (action.type) {
        case types.todastc:
            return{
                ...state,
               tc: action.payload
            }
        case types.tarjeta_credito:

            return{
               ...state,
               tc:[ action.payload.result, ...state.tc ]
            }
            
            
        default:
            return state;

    }

}
