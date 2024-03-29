import React from 'react'
import { PeticionGET } from '../../../config/PeticionGET';

export const Listo = ({url}) => {
    const get = PeticionGET(url);
    const filtroRendicionTerminada = get.filter((g) => (g.estadoFinal==='aprobado' && g.listo === "Si") && (g.procesoFinalizado!=='Si' ));
    return (
      <>
        {filtroRendicionTerminada.length > 0 ? (
          <p>Pendiente: {filtroRendicionTerminada.length}</p>
        ) : (
          <p>No hay notificaciones!!!</p>
        )}
      </>
    );
};

export const PagoAntSueldo=()=>{
    const get = PeticionGET("/anticipo");
    const filtroAntAprobado= get.filter(q =>( q.estadoFinal==='aprobado' && q.procesoFinalizado==='Si')  && q.pagoRealizado!=='Si');
    return(
      <>
       {filtroAntAprobado.length > 0 ? (
          <p>Pendiente: {filtroAntAprobado.length}</p>
        ) : (
          <p>No hay notificaciones!!!</p>
        )}
      </>
    )
  }
  export const PagoAntGasto=()=>{
    const get = PeticionGET("/gastos");
    const getconAnt=get.filter(f=> f.sinAnticipo!=='sin' && f.estadoFinal==='aprobado' )
    const getsinAnt=get.filter(f=> f.sinAnticipo==='sin' && f.estadoFinal==='aprobado' )
    const getsinAntListo=getsinAnt.filter(f=> f.procesoFinalizado === "Si");
    
    
    const getantTotal=[...getsinAntListo,...getconAnt];
    
    const getTotalMuestra = getantTotal.filter(d=>d.pagoRealizado!=='Si');

    return(
      <>
       {getTotalMuestra.length > 0 ? (
          <p>Pendiente: {getTotalMuestra.length}</p>
        ) : (
          <p>No hay notificaciones!!!</p>
        )}
      </>
    )
  }
  export const PagosKm =()=> {
    const get=PeticionGET('/todos/kilometros');
    const filtroAprobacion= get.filter(q=> q.estadoFinal==='aprobado' && q.procesoFinalizado==='Si');
    const getTotalMuestra = filtroAprobacion.filter(d=>d.procesoPagar!=='Si');
    return(
      <>
       {filtroAprobacion.length > 0 ? (
          <p>Pendiente: {getTotalMuestra.length}</p>
        ) : (
          <p>No hay notificaciones!!!</p>
        )}
      </>
    )
  }