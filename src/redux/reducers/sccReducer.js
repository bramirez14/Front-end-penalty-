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
                        console.log(action);
                        let busq =state.scc.map(
                            e => ( e.NROSCC ==action.payload.NROSCC) ? action.payload
                            : e 
                        )
                        return{
                            ...state,
                            scc:busq,
                            response:action.payload
                        }
                        case types.status:
                            console.log({...state.data,...action.payload});
                            return{
                                ...state,
                                data:{...state.data,...action.payload}
                            }
        default:
            return state;

    }

}
