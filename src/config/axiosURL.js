import axios from 'axios';

 const axiosURL= axios.create({

<<<<<<< HEAD
 baseURL:'http://intranet.penalty.com.ar:4000/api'

=======
 baseURL:'http://localhost:4000/api'
 //baseURL:"http://intranet.penalty.com.ar:4000/api"
>>>>>>> 6c1077fe39f2617a0da2d25ee3764f41d34684bf
 })
 
const axiosURLIntranet = axios.create({
baseURL:"http://intranet.penalty.com.ar:4000/api/reportes" 
})
const axiosURLIntranetCobranzas = axios.create({
baseURL:"http://intranet.penalty.com.ar:4000/api/cobranzas" 
})
export{ axiosURL, axiosURLIntranet, axiosURLIntranetCobranzas}