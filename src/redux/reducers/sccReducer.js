import { types } from "../types/type";
const inicialState={
    scc:[],
    abrirModal:false,
    data:{}
}
export const sccReducer =(state=inicialState,action)=>{

    switch (action.type) {
        case types.scc:
            return{
               ...state,
               scc: action.payload
            }
            case types.abrirModal:
            return{
               ...state,
               abrirModal:action.payload
            }
            case types.dataSEL:
                return{
                    ...state,
                    data:action.payload
                }
        default:
            return state;

    }

}
