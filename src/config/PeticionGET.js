import { useState, useEffect } from 'react';
import { axiosURL, axiosURLIntranet, axiosURLIntranetCobranzas } from './axiosURL';
//url global facilita la comunicacion con la api.
 const PeticionGET = (url) => {
  const [peticiones, setPeticiones] = useState([]);
  useEffect(() => {
    const axiosGet = async () => {
      let result = await axiosURL.get(url)
          setPeticiones(result.data)
    }
    axiosGet()
  }, [url])
  return peticiones 
}

const PeticionGETIntranet =(url) =>{
  const [peticionesIntranet, setPeticionesIntranet] = useState([]);
  useEffect(() => {
    const axiosGet = async () => {
      let result = await axiosURLIntranet.get(url)
          setPeticionesIntranet(result.data)
    }
    axiosGet()
  }, [url])

  return peticionesIntranet;
}

const PeticionGETIntranetCobranzas=(url) =>{
  const [peticionesIntranetCobranzas, setPeticionesIntranetCobranzas] = useState([]);
  useEffect(() => {
    const axiosGet = async () => {
      let result = await axiosURLIntranetCobranzas.get(url)
          setPeticionesIntranetCobranzas(result.data)
    }
    axiosGet()
  }, [url])

  return peticionesIntranetCobranzas;
}

export {PeticionGET,PeticionGETIntranet,PeticionGETIntranetCobranzas}