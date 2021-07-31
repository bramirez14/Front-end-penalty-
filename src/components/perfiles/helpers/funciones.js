import {useState,useEffect} from 'react'
import { axiosURL } from '../../../config/axiosURL';
import { PeticionGET } from '../../../config/PeticionGET';

/** funcion de alerta  para anticipo y vacaciones  */

export const Get =  (url) => {
const N = localStorage.getItem("N"); // numero de registro local storage
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
    }, [ url,N])
      return (state)
};

  export const GetGastosConAnt=(url)=>{
const N = localStorage.getItem("N"); // numero de registro local storage

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
    }, [url,N])
    return state
  }
/**opcion para rendicion sin anticipo */
  export const GetGastosSinAnt =(url) =>{
const N = localStorage.getItem("N"); // numero de registro local storage

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
    }, [ url,N])
    return state
  }

  export const muestraPendiente = (array ) => array.filter(d=>d.estadoFinal==='pendiente')//filtramos los ant gasto que son solo estado final = pendiente

 export const KmPendiente=(url)=> {
  const N = localStorage.getItem("N"); // numero de registro local storage
   const [state, setState] = useState([]);
   useEffect(() => {
    const getKm = async () => {
      const {data} = await axiosURL.get('/todos/kilometros');
      console.log(data);
      const filtradoListo= data.filter(t => t.listo === "Si");
      console.log(filtradoListo);
      const dataPendiente= filtradoListo.filter(d=>d.estado==='pendiente')//filtro por estado pendiente
    console.log(dataPendiente)
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
  getKm();
  },[ url,N])
  
return state

}

export const antSueldo=(url) => {
const getodosAnt= PeticionGET(url);
const filtroAprobacion=getodosAnt.filter(a=>a.estadoFinal==='aprobado')

return (
  <>
    {filtroAprobacion.length > 0 ? (
      <p>Pendiente: {filtroAprobacion.length}</p>
    ) : (
      <p>No hay notificaciones!!!</p>
    )}
  </>
);
}

