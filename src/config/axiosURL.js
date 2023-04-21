import axios from 'axios';
// es una instancia de axios 
/*****https://axios-http.com/es/docs/instance *****/ 

 const URL='http://intranet.penalty.com.ar';
//const URL= 'http://localhost'
const PORT='7000'
 const axiosURL= axios.create({

 baseURL:`${URL}:${PORT}/api`
 })
 
const axiosURLIntranet = axios.create({
baseURL:`${URL}:${PORT}/api/reportes`
})
const axiosURLIntranetCobranzas = axios.create({
baseURL:`${URL}:${PORT}/api/cobranzas`
})
export{ axiosURL, axiosURLIntranet, axiosURLIntranetCobranzas}