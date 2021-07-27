import { axiosURL } from "../../../config/axiosURL"

export const postData= async(url,datos) =>{
return await  axiosURL.post(url,{km:"100"})
}