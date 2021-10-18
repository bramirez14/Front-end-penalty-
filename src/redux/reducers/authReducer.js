import { types } from "../types/type";

export const authReducer =(state={},action)=>{
    console.log(action,18);

    switch (action.type) {
        case types.login:
            return{
                uid:action.payload.uid,
                name:action.payload.displayName
            }
            
            case types.axiosget:
                return{
                    estaod:action.payload
                }
                case types.error:
                    return{
                       error: action.error,
                    }
    
        default:
            return state;

    }

}

