import { axiosURL } from "../../../config/axiosURL"
import { PeticionGET } from "../../../config/PeticionGET";

export const postData= async(url,datos) =>{
return await  axiosURL.post(url,{km:"100"})
}
