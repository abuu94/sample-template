// import axios from 'axios';
// // import { User } from '../types/tUser';

// const url = 'http://localhost:3000/users';


// export const getUsers = async () => {
//   const response = (await axios.get(url)).data;
//   console.log(response);
  
//   return response;
// };

// export const addUser = async (user:User)=>{
//   await axios.post(url,user)
// }

import axios from 'axios';
const url = 'http://localhost:3000/foods';
export const getFoods = async()=>{
    const response = (await axios.get(url)).data;
    return response
}