import { types } from '../types/type';

export const getReducer = (state={},action) => {
    switch (action.type) {
        case types.sueldo:
            return{ 
              ...state,
              sueldo: action.payload
          };
        case types.gastos:
          return{ 
            ...state,
            gastos: action.payload
        };
        case types.km:
          return{ 
            ...state,
            km: action.payload
        };
        case types.vacaciones:
          return{ 
            ...state,
            vaca: action.payload
        };
        case types.usuario:
          return{ 
            ...state,
            usuario: action.payload
        };
        case types.error:
          return {
            error: action.error,
          };
          case types.tjc:
            return {
              ...state,
              tarjeta_credito: action.payload
            };
      
        default:
          return state;
      }
}
