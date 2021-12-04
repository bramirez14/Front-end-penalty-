import { types } from "../types/type";
const inicialState={
    scc:[],
    data:{},
    active:null
}
export const sccReducer =(state=inicialState,action)=>{
    
    console.log(state);
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
                        console.log(busq);
                        return{
                            ...state,
                            scc:busq
                        }
        default:
            return state;

    }

}
