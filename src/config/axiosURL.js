import axios from 'axios';

 const axiosURL= axios.create({


 //baseURL:'http://localhost:4000/api/users'
 baseURL:'http://intranet.penalty.com.ar:4000/api/users'

 

});

export default axiosURL;