import { types } from "../types/type";

const initialState = {
    openModal: false,
}
export const abrirCerrarModalReducer =(state= initialState, action)=>{
    switch (action.type) {
        case types.openModal:
            return{
               
               openModal:true
            }
            
            case types.closeModal:
            return{
               
               openModal:false
            }
        default:
            return state;

    }

}
