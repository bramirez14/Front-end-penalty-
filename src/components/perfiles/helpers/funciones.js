import {useState,useEffect} from 'react'
import { axiosURL } from '../../../config/axiosURL';

/** funcion de alerta  para anticipo y vacaciones  */
const N = localStorage.getItem("N"); // numero de registro local storage

export const Get =  (url) => {
    //declaramos los estados
   const [state, setState] = useState([])
    useEffect(() => {
    const axiosGet = async () => {
        let {data} = await axiosURL.get(url);
        const op1= data.filter(u=> u.estadoFinal === "pendiente" && u.estado==='aprobado' &&
    (u.usuario.departamentoId === 1 || u.usuario.departamentoId === 2))
    
    const op2 = data.filter(d=>d.estadoFinal=== "pendiente" && d.estado==='aprobado' &&
    (d.usuario.departamentoId === 3|| d.usuario.departamentoId === 4))
  
    const op3 = data.filter(d=>d.estado === "pendiente" && d.usuario.departamentoId===5)

    const unirOp=[...op1,...op2,...op3]
    if (N === "901") {
      const filtro = data.filter(
        (r) =>
         ( r.estado === "pendiente" ) &&
          (r.usuario.departamentoId === 1 || r.usuario.departamentoId === 2)
      );
      setState(filtro);
    }
    if (N === "902") {
      const filtro = unirOp
      setState(filtro);
     
    }
    if (N === "903") {
      const filtro = data.filter(
        (r) =>
        ( r.estado === "pendiente" ) &&
          (r.usuario.departamentoId === 4 || r.usuario.departamentoId === 5)
      );
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
            const dataConAnt= data.filter(d=>d.sinAnticipo!=='sin')

            const op1= dataConAnt.filter(u=> (u.listo!=='Si'&& u.estado==='aprobado') &&
        (u.usuario.departamentoId === 1 || u.usuario.departamentoId === 2))
        
        const op2 = dataConAnt.filter(d=>( d.listo!=='Si'&& d.estado==='aprobado') &&
        (d.usuario.departamentoId === 3|| d.usuario.departamentoId === 4))
      
        const op3 = dataConAnt.filter(d=>(d.estado === "pendiente" && d.listo!=='Si') && d.usuario.departamentoId===5)
    
        const unirOp=[...op1,...op2,...op3]
        if (N === "901") {
          const filtro = dataConAnt.filter(
            (r) =>
              r.listo!=='Si' &&
              (r.usuario.departamentoId === 1 || r.usuario.departamentoId === 2)
          );
          setState(filtro);
        }
        if (N === "902") {
          const filtro = unirOp
          setState(filtro);
        }
        if (N === "903") {
          const filtro = dataConAnt.filter(
            (r) =>
            r.listo!=='Si' &&
              (r.usuario.departamentoId === 4 || r.usuario.departamentoId === 5)
          );
          setState(filtro);
        }
        
        }
        axiosGet()
    }, [url])
    console.log(state);
    return state
  }
/**opcion para rendicion sin anticipo */
  export const GetGastosSinAnt =(url) =>{
      const [state, setState] = useState([]);
      useEffect(() => {
        const axiosGet = async () => {
            let {data} = await axiosURL.get(url);
            const dataSinAnt= data.filter(d=>d.sinAnticipo==='sin')
            const op1= dataSinAnt.filter(u=> (u.listo==='Si'&& u.estado==='aprobado') &&
        (u.usuario.departamentoId === 1 || u.usuario.departamentoId === 2))
        
        const op2 = dataSinAnt.filter(d=>( d.listo==='Si'&& d.estado==='aprobado') &&
        (d.usuario.departamentoId === 3|| d.usuario.departamentoId === 4))
      
        const op3 = dataSinAnt.filter(d=>(d.estado === "pendiente" && d.listo==='Si') && d.usuario.departamentoId===5)
    
        const unirOp=[...op1,...op2,...op3]
        if (N === "901") {
          const filtro = dataSinAnt.filter(
            (r) =>
              r.listo==='Si' &&
              (r.usuario.departamentoId === 1 || r.usuario.departamentoId === 2)
          );
          setState(filtro);
        }
        if (N === "902") {
          const filtro = unirOp
          setState(filtro);
        }
        if (N === "903") {
          const filtro = dataSinAnt.filter(
            (r) =>
            r.listo==='Si'  &&
              (r.usuario.departamentoId === 4 || r.usuario.departamentoId === 5)
          );
          setState(filtro);
        }
        
        }
        axiosGet()
    }, [ url])
    console.log(state);
    return state
  }
  export const muestraPendiente = (array ) =>{
if(N==='901'|| N ==='903'){
    const estadoFinalPendiente= array.filter(d=>d.estadoFinal==='pendiente');
return(estadoFinalPendiente)
}
if(N==='902'){
  const estadoPendiente= array.filter(d=>d.estado==='pendiente');
return(estadoPendiente)

}
  }
