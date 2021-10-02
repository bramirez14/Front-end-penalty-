import React,{useState,useEffect} from 'react'
import { Switch } from 'antd';
export const SwitchComponet = ({datos,data,setData}) => {
    const N = localStorage.getItem('N');
    const [state, setState] = useState(true);
    
    const retorno=async() =>{
        let filtroPendientes;
        let filtroFinalizados
    if(N=== '902'){
        
        filtroPendientes= datos.filter( d=> d.estadoFinal==='pendiente');
        filtroFinalizados= datos.filter( d=> d.estadoFinal==='aprobado' ||  d.estado==='rechazado');
            if(state===true){
           setData(filtroFinalizados)
           
            }else{
             setData(filtroPendientes)
            }
    }else{
    filtroPendientes= datos.filter( d=> d.estado==='pendiente');
    filtroFinalizados= datos.filter( d=> d.estado==='aprobado' ||  d.estado==='rechazado');
    if(state===true){
        setData(filtroFinalizados)
        }else{
        setData(filtroPendientes)
        }
    }
}
useEffect(() => retorno(),[state])
    
    return (
        <Switch checkedChildren="pendientes" unCheckedChildren="finalizados" defaultChecked onChange={()=> setState(!state)} />
    )
}
