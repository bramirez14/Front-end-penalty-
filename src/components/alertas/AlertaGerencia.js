import React,{ useState,useEffect} from 'react'
import { Get, GetGastosConAnt, GetGastosSinAnt, KmPendiente } from '../perfiles/helpers/funciones';
import { Link } from "react-router-dom";
import { Badge, Button } from "antd";
import { FaBell } from "react-icons/fa";
import "./alerta.css";
import { PeticionGET } from '../../config/PeticionGET';
import io from "socket.io-client";

import { getGastosConAnt, getGastosSinAnt, kmPendiente, lista } from './helpers/funciones';
export const AlertaGerencia = () => {
  const [listaSueldo, setListaSueldo] = useState([]);
  const [listaVacaciones, setListaVacaciones] = useState([]);
  const [listaGasto, setListaGasto] = useState([]);
  const [listaKm, setListaKm] = useState([]);
//secto socket 
useEffect(() => {
  const socket =  io.connect( "http://localhost:4000",{ 
  transports: ['websocket'],
  autoConnect: true,
  forceNew: true,})
  //console.log(socket);
  socket.on('lista-sueldo', (data)=> { 
    console.log(data);
    setListaSueldo(data)
  });
  socket.on('lista-vacaciones',(data)=>{
 console.log(data);
 setListaVacaciones(data)
  });
  socket.on('lista-gastos',(data)=>{
    console.log(data);
 setListaGasto(data);

     });

  socket.on('lista-km',(data)=>{
  console.log(data);
  setListaKm(data)
    });
 
}, []);

//const anticipos = Get('/anticipo'); 
const anticipos= lista(listaSueldo);
console.log(anticipos);
const vacaciones = lista(listaVacaciones); 
const gastosConAnt= getGastosConAnt(listaGasto); 
const  gastosSinAnt= getGastosSinAnt(listaGasto); 
const km= kmPendiente(listaKm);
/**Sector respuesta */
const id= localStorage.getItem('uid');
const { anticipo,gasto,vacacion,kilometro } = PeticionGET(`/${id}`);
const filtroAnt = anticipo?.filter((a) => a.fd!==null);
const filtroGasto = gasto?.filter((a) => a.fd!==null);
const filtroVacacion = vacacion?.filter((a) => a.fd!==null);
const filtrokilometro= kilometro?.filter((a) => a.fd!==null)

const  respuesta= (filtroAnt,filtroGasto,filtrokilometro,filtroVacacion===undefined )?undefined:[...filtroAnt,...filtroGasto,...filtroVacacion,...filtrokilometro]
const todosgtes= respuesta===undefined?undefined:[...anticipos,...vacaciones,...gastosConAnt,...gastosSinAnt,...km,...respuesta]
const filtroInactiva= todosgtes?.filter(t=>t.notificacion ==='inactiva')
console.log(filtroInactiva);
//console.log(todosgtes);
return (
  <Button /* onClick={openNotification} */ className="boton-campana">
        <Link to="/mensajes">
       
          <Badge count={filtroInactiva?.length}>
            <span className="head-example" />
            <FaBell className="icon-campana" />
          </Badge>
       
      </Link>
      </Button>
    )
}
