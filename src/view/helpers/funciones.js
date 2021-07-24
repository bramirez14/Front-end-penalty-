import React,{useState} from 'react'

export const sinAnticipo906=(array) => {
const anticipo= array.filter(c=>c.sinAnticipo==='sin' && c.listo === "Si" && (c.estadoFinal==='aprobado'));
const anticipoFinalizado905= anticipo.filter(c=>c.procesoFinalizado==='Si')   //porceso que finaliza el usuario 905
return anticipoFinalizado905
}
export const conAnticipo906=(array) => {
    const anticipo= array.filter(c=>c.sinAnticipo!=='sin' && (c.estadoFinal==='aprobado') );
      //porceso que finaliza el usuario 905
    return anticipo
    }