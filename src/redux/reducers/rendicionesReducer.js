import { types } from "../types/type";

export const rendicionesReducer = (state = {}, action) => {

  switch (action.type) {
    case types.todastc:
      return {
        ...state,
        tc: action.payload,
      };
    case types.tarjeta_credito:
      return {
        ...state,
        tc: [action.payload.result, ...state.tc],
      };

 /*    case types.addCreditCard:
      return {
        ...state,
        creditCard: [action.payload.result, ...state.creditCard],
      };
    case types.addPaymentMethod:
      return {
        ...state,
        paymentMethod: [action.payload.result, ...state.paymentMethod],
      }; */

    default:
      return state;
  }
};
