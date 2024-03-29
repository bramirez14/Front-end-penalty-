import { getTarjetaCredito } from "../actions/rendicionAction";
import {
  getKm,
  getSueldo,
  getVacaciones,
  getGastos,
  getUsuario,
 
} from "../actions/states";

export const getState = (dispatch) => {
  const id = localStorage.getItem("uid");

  dispatch(getSueldo());
  dispatch(getVacaciones());
  dispatch(getGastos());
  dispatch(getKm());
  dispatch(getUsuario(id));
  
  dispatch(getTarjetaCredito());
};
