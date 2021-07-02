import React,{useState,useEffect} from 'react'
import Swal from "sweetalert2";
import { axiosURL } from '../../config/axiosURL';
import { PeticionGET } from '../../config/PeticionGET';

export const EstadoUsuario = () => {
    const [vacaciones, setVacaciones] = useState([]);
    const [sueldo, setSueldo] = useState([]);
    const [gasto, setGasto] = useState([]);
    //vamos a ver las vacaciones tomadas en el ano; y cuantas les falta 
    const id= localStorage.getItem('uid');
    const fechActual= new Date().getMonth();
    const anoActual= new Date().getFullYear();
    const get= async()=>{
        let resp= await axiosURL(`/${id}`);
        const advertencia = resp.data.vacacion?.filter(v=>v.diasFaltantes>0 && fechActual===11 && anoActual===v.periodo );
        const diasFaltantes= advertencia[0]?.diasFaltantes;
        const periodo= advertencia[0]?.periodo;
        //avisar en que debe tomarse todas las vacaciones antes de fin de ano;
         if(advertencia?.length>0){
            Swal.fire({
                title: `Tenes vacaciones pendiente del periodo ${periodo} y dias faltantes ${diasFaltantes}`,
                showClass: {
                  popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                  popup: 'animate__animated animate__fadeOutUp'
                }
              })
         }
         setVacaciones(resp.data.vacacion);
         setSueldo(resp.data.anticipo);
         setGasto(resp.data.gasto);
     }
 useEffect(() => {
     get();
 }, [])
    

 const mpagos= (pago)=>{
    switch (pago) {
        case 1:
            return 'Efectivo'
        case 2: 
            return 'Tarjeta de Credito'
        case 3: 
                return 'Tarjeta de Debito'
        default:
            return 'Tarjeta Recargable'
    } 
    }

    
    //mirar sus anticipos de sueldo pendiente;
    //mirar sus anticipos de sueldo rechazado;
    //mirar sus anticipos de sueldo aprobados;
    //anticipos de gasto aprobados ,pendiente y rechazado;
    //anticipos aprobado ver tmb cuando llevo rendido;
  
    return (
        <div  className='container' >
        <h2>Vacaciones</h2>
            {
                vacaciones?.map(v=>(
                    <div style={{marginTop:'40px',border:'solid 1px #ddd'}}>
                    <p>periodo: {v.periodo}</p>
                    <p>fecha Desde:{v.fechaDesde}</p>
                    <p> fecha Hasta: {v.fechaHasta}</p>
                    <p> fecha Solicitud: {v.fechaSolicitud}</p>
                    <p>Dias Faltantes: {v.diasFaltantes}</p>
                    <p>Mensaje de gerencia: {v.respMensaje}</p>
                    <p> Estado: {v.estadoFinal}</p>
                    </div>
                ))

               
            }
        <h2>Sueldo</h2>
            {
                 sueldo?.map(s=>(
                    <div style={{marginTop:'40px',border:'solid 1px #ddd'}} >
                        <p>Fechas de Solicitud{s.fecha}</p>
                        <p>Medio de pago:{s.Sueldo}</p>
                        <p>Importe{s.importe}</p>
                        <p>Mensaje de gerencia:{s.respMensaje}</p>
                        <p>Estado: {s.estadoFinal}</p>

                    </div>
                    
                    ))
            }
        <h2>Gasto</h2>
        {
             gasto.map(d=>(
                    <div style={{marginTop:'40px',border:'solid 1px #ddd'}} >
                         <p>Fechas de Solicitud: {d.fecha}</p>
                         <p>Importe: {d.importe}</p>
                        <p>Medio de acreditacion: { mpagos(d.formapagoId)}</p>
                       
                        <p>Estado: {d.estadoFinal}</p>

                    </div>
                    
                    ))
            }
        
        </div>
    )
}
