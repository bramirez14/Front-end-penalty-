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
export const todosLosClientes = () => async (dispatch) => {
  try {
    const response = await axiosURL.get("/scc/todos/clientes");
    const datos = await response.data;
    dispatch({ type: types.clientes, payload: datos[0] });
  } catch (e) {
    dispatch({ type: "error", error: e.message });
  }
};
export const abrirModal = () => ({ type: types.openModal });
export const cerrarModal = () => ({ type: types.closeModal });

export const inputCambio = (value) => {
  return {
    type: types.active,
    payload: value,
  };
};
export const datoSelec = (file) => ({ type: types.dataSEL, payload: file });

export const editarSCC = (id, data) => async (dispatch) => {
  try {
    const response = await axiosURL.put(`/scc/${id}`, data);
    const datos = await response.data;
    
      dispatch({ type: types.editscc, payload: datos});
    
    return datos
  } catch (e) {
    dispatch({ type: "error", error: e.message });
  }
};
export const pasePedidos = ()=> async (dispatch)=>{
  const response = await axiosURL.post('/scc/agregar/newscc')
  const datos = await response.data;
  dispatch({ type:types.pasePedidos,payload: datos})
  return response;
}

