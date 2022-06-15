import {useState,useEffect} from 'react'
import { axiosURL } from '../config/axiosURL';

export const useGet = (url) => {
    const [state, setState] = useState([])
    const [data, setData] = useState([])
    const axiosGet = async () => {
        let  res = await axiosURL.get(url);
        setState(res);
        setData(res.data)
    };
    
    useEffect(() => {
        axiosGet();
      }, []);
      
      return [data,axiosGet,state,setData]
      
      

}
