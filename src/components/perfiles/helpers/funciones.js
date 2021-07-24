import {useState,useEffect} from 'react'
import { axiosURL } from '../../../config/axiosURL';

/** funcion de alerta  para anticipo y vacaciones  */
const N = localStorage.getItem("N"); // numero de registro local storage

export const Get =  (url) => {
    //declaramo el estado
   const [state, setState] = useState([])
    useEffect(() => {
    const axiosGet = async () => {
        let {data} = await axiosURL.get(url);// data de DB 
        const dataPendiente= data.filter(d=>d.estado==='pendiente')//filtro por estado pendiente
      /**usuario901 */
    if (N === "901") {
      const filtro = dataPendiente.filter(r=>(r.usuario.departamentoId === 1 || r.usuario.departamentoId === 2));
      setState(filtro);
    }
    /**usuario902 */
    if (N === "902") {
      const filtro = data.filter(r=>(r.usuario.departamentoId === 5 || r.estado=== 'aprobado'));
      setState(filtro);
    }
    /**usuario903*/
    if (N === "903") {
      const filtro = data.filter((r) =>(r.usuario.departamentoId === 3 || r.usuario.departamentoId === 4) );
      setState(filtro);
    }
    }
    axiosGet()
    }, [ url])
      return (state)
};

  export const GetGastosConAnt=(url)=>{
    const [state, setState] = useState([]);
      useEffect(() => {
        const axiosGet = async () => {
            let {data} = await axiosURL.get(url);
            const dataConAnt= data.filter(d=>d.sinAnticipo!=='sin')//filtro gasto con anticipo
        /**usuario901 */
        if (N === "901") {
          const filtro = dataConAnt.filter( (r) => (r.usuario.departamentoId === 1 || r.usuario.departamentoId === 2));
          setState(filtro);
        }
        /**usuario902 */
        if (N === "902") {
          const filtro = dataConAnt.filter( (r) => (r.usuario.departamentoId === 5 || r.estado==='aprobado'));
          setState(filtro);
        }
        /**usuario903 */
        if (N === "903") {
          const filtro = dataConAnt.filter(
            (r) =>(r.usuario.departamentoId === 3|| r.usuario.departamentoId === 4));
          setState(filtro);
        }
        }
        axiosGet()
    }, [url])
    return state
  }
/**opcion para rendicion sin anticipo */
  export const GetGastosSinAnt =(url) =>{
      const [state, setState] = useState([]);
      useEffect(() => {
        const axiosGet = async () => {
            let {data} = await axiosURL.get(url);//data de la DB
            const dataSinAnt= data.filter(d=>d.sinAnticipo==='sin');//filtro sin ant
            const dataListo= dataSinAnt.filter(d=>(d.listo==='Si'));//filtro con ant 
          /**usuario901 */
        if (N === "901") {
          const filtro = dataListo.filter((r) =>(r.usuario.departamentoId === 1 || r.usuario.departamentoId === 2));
          setState(filtro);
        }
          /**usuario902 */
        if (N === "902") {
          const filtro = dataListo.filter((r) =>(r.usuario.departamentoId === 5 || r.estado==='aprobado'));
          setState(filtro);
        }
          /**usuario903*/
        if (N === "903") {
          const filtro = dataListo.filter((r) =>(r.usuario.departamentoId === 3 || r.usuario.departamentoId === 4));
          setState(filtro);
        }
        }
        axiosGet()//llamamos la funcion
    }, [ url])
    return state
  }

  export const muestraPendiente = (array ) => array.filter(d=>d.estadoFinal==='pendiente')//filtramos los ant gasto que son solo estado final = pendiente
