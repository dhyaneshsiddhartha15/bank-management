import { BASE_URL } from "../baseEndpoint/baseurl";
import axios from "axios";
export const registerAPI=async (userData)=>{
    const response=await axios.post(`${BASE_URL}/users/register`,{
username:userData?.email,
password:userData?.password,
email:userData?.email,
role:userData?.role,
    },{
withCredentials:true,
    });
    return response?.data;
}
export const loginAPI=async (userData)=>{
    const response=await axios.post(`${BASE_URL}/users/login`,{
email:userData?.email,
password:userData?.password,
    },{
        withCredentials:true,
    });
    return response?.data;
}
export const getUserProfileAPI=async ()=>{
    const response=await axios.get(`${BASE_URL}/users/profile`,{
      withCredentials: true,
    });
    return response?.data;
  };
  export const logoutAPI=async ()=>{
    const response=await axios.post(`${BASE_URL}/users/logout`,{},{
      withCredentials: true,
    });
    return response?.data;
  };