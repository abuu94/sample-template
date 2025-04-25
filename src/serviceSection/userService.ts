import axios from 'axios';
// import { UserResponse, UserRequest } from '../types/tUser';
import { UserResponse, UserRequest } from '../typesSection/tUser';

const BASE_URL = 'http://127.0.0.1:8000/users';

export const getUsers = async (limit: number = 100, offset: number = 0)=> {
  const response = await axios.get(`${BASE_URL}?limit=${limit}&offset=${offset}`);
  return response.data;
};

export const addUser  = async (user:UserRequest)=>{
    const response= await axios.post<UserRequest>(BASE_URL,user)
    return response.data;
   }; 
   
export const getUserByID = async (id: number) => {
    const response = await axios.get<UserResponse>(`${BASE_URL}/${id}`);
    return response.data;
  };
  
export const editUser = async (user:UserRequest,id:number)=>{
     const response=await axios.put<UserResponse>(`${BASE_URL}/${id}`,user)
     return response.data;
   };
   
export const deleteUser =async (id:number)=>{
     const response=await axios.delete<UserResponse>(`${BASE_URL}/${id}`)
     return response.data;
   };
 
  






// import axios from 'axios';
// import { UserResponse, UserRequest } from '../typesSection/tUser'; // Adjust the path as needed

// const BASE_URL = 'http://127.0.0.1:8000/users'; // Replace with your API endpoint

// // Fetch all users with optional pagination
// export const getUsers = async (limit: number = 100, offset: number = 0): Promise<UserResponse[]> => {
//   try {
//     const response = await axios.get(`${BASE_URL}?limit=${limit}&offset=${offset}`);
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching users:', error);
//     throw error;
//   }
// };


// // Fetch a single user by ID
// export const getUserById = async (id: number): Promise<UserResponse> => {
//   try {
//     const response = await axios.get<UserResponse>(`${BASE_URL}/${id}`);
//     return response.data;
//   } catch (error) {
//     console.error(`Error fetching user with ID ${id}:`, error);
//     throw error;
//   }
// };

// // Add a new user
// export const addUser = async (user: UserRequest): Promise<UserResponse> => {
//   try {
//     const response = await axios.post<UserResponse>(BASE_URL, user);
//     return response.data;
//   } catch (error) {
//     console.error('Error adding user:', error);
//     throw error;
//   }
// };

// // Update an existing user by ID
// export const updateUser = async (id: number, user: UserRequest): Promise<UserResponse> => {
//   try {
//     const response = await axios.put<UserResponse>(`${BASE_URL}/${id}`, user);
//     return response.data;
//   } catch (error) {
//     console.error(`Error updating user with ID ${id}:`, error);
//     throw error;
//   }
// };

// // Delete a user by ID
// export const deleteUser = async (id: number): Promise<{ message: string }> => {
//   try {
//     const response = await axios.delete<{ message: string }>(`${BASE_URL}/${id}`);
//     return response.data;
//   } catch (error) {
//     console.error(`Error deleting user with ID ${id}:`, error);
//     throw error;
//   }
// };
