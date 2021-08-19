import {useState,useEffect} from 'react'
import { axiosURL } from '../../../config/axiosURL';

    export const lista =  (data) => {
      const N = localStorage.getItem("N"); // numero de registro local storage
              const dataPendiente= data.filter(d=>d.estado==='pendiente')//filtro por estado pendiente
            /**usuario901 */
            let filtro;
          if (N === "901") {
             filtro = dataPendiente.filter(r=>(r.usuario.departamentoId === 1 || r.usuario.departamentoId === 2));
          }
          /**usuario902 */
          if (N === "902") {
             filtro = data.filter(r=>(r.usuario.departamentoId === 5 || r.estado=== 'aprobado'));
          }
          /**usuario903*/
          if (N === "903") {
             filtro = dataPendiente.filter((r) =>(r.usuario.departamentoId === 3 || r.usuario.departamentoId === 4) );
          }
          return filtro
      };
      
      export const getGastosConAnt=(data)=>{
       const N = localStorage.getItem("N"); 
                    const dataConAnt= data.filter(d=>d.sinAnticipo!=='sin');
                  let filtro;
                /**usuario901 */
                if (N === "901") {
                  filtro = dataConAnt.filter( (r) => (r.usuario.departamentoId === 1 || r.usuario.departamentoId === 2));
                }
                /**usuario902 */
                if (N === "902") {
                  filtro = dataConAnt.filter( (r) => (r.usuario.departamentoId === 5 || r.estado==='aprobado'));
                }
                /**usuario903 */
                if (N === "903") {
                  filtro = dataConAnt.filter(
                    (r) =>(r.usuario.departamentoId === 3|| r.usuario.departamentoId === 4));
                }
            return filtro
          }
        /**opcion para rendicion sin anticipo */
          export const getGastosSinAnt =(data) =>{
        const N = localStorage.getItem("N");
        
                    const dataSinAnt= data.filter(d=>d.sinAnticipo==='sin');
                    const dataListo= dataSinAnt.filter(d=>(d.listo==='Si'));
                    let filtro;
                  /**usuario901 */
                if (N === "901") {
                   filtro = dataListo.filter((r) =>(r.usuario.departamentoId === 1 || r.usuario.departamentoId === 2));
                }
                  /**usuario902 */
                if (N === "902") {
                   filtro = dataListo.filter((r) =>(r.usuario.departamentoId === 5 || r.estado==='aprobado'));
                }
                  /**usuario903*/
                if (N === "903") {
                   filtro = dataListo.filter((r) =>(r.usuario.departamentoId === 3 || r.usuario.departamentoId === 4));
                }
            return filtro
        }

        export const kmPendiente=(data)=> {
          const N = localStorage.getItem("N"); // numero de registro local storage
              const filtradoListo= data.filter(t => t.listo === "Si");
              const dataPendiente= filtradoListo.filter(d=>d.estado==='pendiente')//filtro por estado pendiente
              /**usuario901 */
              let filtro;
            if (N === "901") {
               filtro = dataPendiente.filter(r=>(r.usuario.departamentoId === 1 || r.usuario.departamentoId === 2));
            }
            /**usuario902 */
            if (N === "902") {
               filtro = data.filter(r=>(r.usuario.departamentoId === 5 || r.estado=== 'aprobado'));
            }
            /**usuario903*/
            if (N === "903") {
               filtro = data.filter((r) =>(r.usuario.departamentoId === 3 || r.usuario.departamentoId === 4) );
            }
         return filtro
        }
        