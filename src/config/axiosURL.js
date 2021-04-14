import axios from 'axios';

 const axiosURL= axios.create({

<<<<<<< HEAD
 baseURL:'http://localhost:4000/api/users'
 //baseURL:'http://intranet.penalty.com.ar:4000/api/users'
=======
 baseURL:'http://intranet.penalty.com.ar:4000/api/users'
>>>>>>> cc43ae0e6b1791a276fb5820f11f871ab63af922

 

});

export default axiosURL;