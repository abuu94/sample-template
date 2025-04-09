

import axios from 'axios';
import { Food, FoodRequest } from '../types/tFood';
const url = 'http://localhost:3000/foods/';
export const getFoods = async()=>{
    const response = (await axios.get(url)).data;
    return response;
}

  
  export const addFood  = async (food:FoodRequest)=>{
   const response= await axios.post<FoodRequest>(url,food)
   return response.data;
  };
  
  
  export const getFoodrByID = async (id:number)=>{
    const response=await axios.put<Food>(url +id)
    return response.data;
  };
  
  
export const editFood = async (food:FoodRequest,id:number)=>{
    const response=await axios.put<Food>(url +id,food)
    return response.data;
  };
  
  export const deleteFood =async (id:number)=>{
    const response=await axios.delete<Food>(url+id)
    return response.data;
  };