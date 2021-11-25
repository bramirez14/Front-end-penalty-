import { types } from "../types/type";
import { axiosURL } from "../../config/axiosURL";

export const todasLasSCC = () => async (dispatch) => {
  try {
    const response = await axiosURL.get("/scc/todos/registros");
    const datos = await response.data;
    dispatch({ type: types.scc, payload: datos[0] });
  } catch (e) {
    dispatch({ type: "error", error: e.message });
  }
};
export const todosLosArticulos = () => async (dispatch) => {
  try {
    const response = await axiosURL.get("/scc/todos/articulos");
    const datos = await response.data;
    dispatch({ type: types.art, payload: datos[0] });
  } catch (e) {
    dispatch({ type: "error", error: e.message });
  }
};
export const todasLasTalles = () => async (dispatch) => {
  try {
    const response = await axiosURL.get("/scc/todos/talles");
    const datos = await response.data;
    dispatch({ type: types.talles, payload: datos[0] });
  } catch (e) {
    dispatch({ type: "error", error: e.message });
  }
};
export const abrirModal = () => ({ type: types.openModal });
export const cerrarModal = () => ({ type: types.closeModal });

export const inputCambio = ( value ) =>{
  return ({
  type: types.active,
  payload:value
})};
export const datoSelec = (file) => ({ type: types.dataSEL, payload: file });
export const editarSCC= (id) => async (dispatch) => {
  try {
    const response = await axiosURL.put(`/scc/${id}`);
    const datos = await response.data;
    console.log(datos);
    dispatch({ type: types.editscc, payload: datos });
  } catch (e) {
    res.send(e)
  }
}