import axios from 'axios';
// import { ItemResponse, ItemRequest } from '../types/tItem';
import { ItemResponse, ItemRequest } from '../typesSection/tItem';

const BASE_URL = 'http://127.0.0.1:8000/items';

export const getItems = async (limit: number = 100, offset: number = 0)=> {
  const response = await axios.get(`${BASE_URL}?limit=${limit}&offset=${offset}`);
  return response.data;
};

export const addItem  = async (item:ItemRequest)=>{
    const response= await axios.post<ItemRequest>(BASE_URL,item)
    return response.data;
   }; 
   
export const getItemByID = async (id: number) => {
    const response = await axios.get<ItemResponse>(`${BASE_URL}/${id}`);
    return response.data;
  };
  
export const editItem = async (item:ItemRequest,id:number)=>{
     const response=await axios.put<ItemResponse>(`${BASE_URL}/${id}`,item)
     return response.data;
   };
   
export const deleteItem =async (id:number)=>{
     const response=await axios.delete<ItemResponse>(`${BASE_URL}/${id}`)
     return response.data;
   };
 
  