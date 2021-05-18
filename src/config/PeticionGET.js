import { useState, useEffect } from 'react';

import axiosURL from './axiosURL';

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




export default PeticionGET;