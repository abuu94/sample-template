

import axios from 'axios';
import { User, UserRequest } from '../types/tUser';
const url = 'http://localhost:3000/users/';
export const getUsers = async()=>{
    const response = (await axios.get(url)).data;
    return response;
}

  
  export const addUser  = async (user:UserRequest)=>{
   const response= await axios.post<UserRequest>(url,user)
   return response.data;
  };
  
  
  export const getUserByID = async (id:number)=>{
    const response=await axios.put<User>(url +id)
    return response.data;
  };
  
  
export const editUser = async (user:UserRequest,id:number)=>{
    const response=await axios.put<User>(url +id,user)
    return response.data;
  };
  
  export const deleteUser =async (id:number)=>{
    const response=await axios.delete<User>(url+id)
    return response.data;
  };

  // export const deleteFood =async (id:number)=>{
  //   const response=await axios.delete<Food>(url+id)
  //   return response.data;
  // };