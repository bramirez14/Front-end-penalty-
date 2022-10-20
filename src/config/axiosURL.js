import axios from 'axios';
// es una instancia de axios 
/*****https://axios-http.com/es/docs/instance *****/   
 const axiosURL= axios.create({

 baseURL:"http://localhost:7000/api"

 })
 
const axiosURLIntranet = axios.create({
baseURL:"http://intranet.penalty.com.ar:7000/api/reportes" 
})
const axiosURLIntranetCobranzas = axios.create({
baseURL:"http://intranet.penalty.com.ar:7000/api/cobranzas" 
})
export{ axiosURL, axiosURLIntranet, axiosURLIntranetCobranzas}