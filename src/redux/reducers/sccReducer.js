import { types } from "../types/type";
const inicialState={
    scc:[],
    data:{},
    active:null
}
export const sccReducer =(state=inicialState,action)=>{
    switch (action.type) {
        case types.scc:
            return{
               ...state,
               scc: action.payload
            }
          
            case types.dataSEL:
                return{
                    ...state,
                    data:action.payload
                }
                case types.active:
                    return {
                        ...state,
                        data:action.payload
                    }
                    case types.editscc:
                        return{
                            ...state,
                            scc:state.scc.map(
                                e => ( e.NROSCC === action.payload.NROSCC) ? action.payload : e // modificar para editar 
                            )
                        }
        default:
            return state;

    }

}
