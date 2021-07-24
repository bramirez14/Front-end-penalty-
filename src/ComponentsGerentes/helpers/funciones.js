import  { useState,useEffect } from 'react'
import { axiosURL } from '../../config/axiosURL';

export const TodosGastos=(data) => {
const N = localStorage.getItem("N"); // numero de registro
const getGastos =data
const gastosSinAnt= getGastos.filter(d=>d.sinAnticipo=== "sin" && d.listo==='Si');
const gastosConAnt= getGastos.filter(d=>d.sinAnticipo!== "sin");
let usuariosConAnt;
let usuariosSinAnt;
/**Sector 901  */
if(N==='901'){
   usuariosSinAnt= gastosSinAnt.filter( d=> d.usuario.departamentoId === 1 || d.usuario.departamentoId === 2)
   usuariosConAnt= gastosConAnt.filter( d=> d.usuario.departamentoId === 1 || d.usuario.departamentoId === 2)
}
/**Sector 902  */
if(N==='902'){
    usuariosSinAnt= gastosSinAnt.filter( d=> d.usuario.departamentoId === 5 || d.estado === "aprobado")
    usuariosConAnt= gastosConAnt.filter( d=> d.usuario.departamentoId === 5 || d.estado === "aprobado")
}
/**Sector 903 */
if(N==='903'){ 
    usuariosSinAnt= gastosSinAnt.filter( d=> d.usuario.departamentoId === 4 || d.usuario.departamentoId === 3)
   usuariosConAnt= gastosConAnt.filter( d=> d.usuario.departamentoId === 4 || d.usuario.departamentoId === 3)
}
const gastoTotal= [...usuariosSinAnt,...usuariosConAnt]

return gastoTotal
}

export const GetFiltroGerencia=(data)=>{
    const N = localStorage.getItem('N')
    const [state, setState] = useState([]);
     /**selecion de gerente  recordamos que Cristian Rios da el ok final*/
     useEffect(() => {
        const getAxios= async () => {
          const {data} = await axiosURL.get('/anticipo')
            const dataPendiente= data.filter(d=>d.estado==='pendiente')
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
        getAxios();
     },[N])
  return state
}

