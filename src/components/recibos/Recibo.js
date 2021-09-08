import React from 'react'
import { Steps, Button, message } from 'antd';
import './recibo.css'
import { TablaIngresos } from './TablaIngresos';
import { ClienteRecibo } from './ClienteRecibo';
import { TablaLiquidacion } from './TablaLiquidacion';


export const Recibo = () => {
  return( 
    <>
    <ClienteRecibo/>
    <TablaIngresos/>
    <TablaLiquidacion/>
    </>
    );
}
