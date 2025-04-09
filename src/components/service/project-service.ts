import axios from 'axios';
import { Project, ProjectRequest } from '../types/tProject';
const url = 'http://localhost:3000/projects/';
export const getProjects = async()=>{
    const response = (await axios.get(url)).data;
    return response;
}

  
  export const addProject  = async (project:ProjectRequest)=>{
   const response= await axios.post<ProjectRequest>(url,project)
   return response.data;
  };
  
  
  export const getProjectByID = async (id:number)=>{
    const response=await axios.put<Project>(url +id)
    return response.data;
  };
  
  
export const editProject = async (project:ProjectRequest,id:number)=>{
    const response=await axios.put<Project>(url +id,project)
    return response.data;
  };
  
  export const deleteProject =async (id:number)=>{
    const response=await axios.delete<Project>(url+id)
    return response.data;
  };