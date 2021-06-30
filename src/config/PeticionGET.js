import { useState, useEffect } from 'react';
import { axiosURL, axiosURLIntranet } from './axiosURL';


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

export {PeticionGET,PeticionGETIntranet}