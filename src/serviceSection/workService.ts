import axios from 'axios';
import { WorkResponse, WorkRequest } from '../typesSection/tWork'; // Adjust the import path as needed

const BASE_URL = 'http://127.0.0.1:8000/works'; // Replace with your API endpoint

// Fetch all works with optional pagination
export const getWorks = async (limit: number = 100, offset: number = 0): Promise<WorkResponse[]> => {
  try {
    const response = await axios.get(`${BASE_URL}?limit=${limit}&offset=${offset}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching works:', error);
    throw error;
  }
};

// Fetch a single work by ID
export const getWorkById = async (id: number): Promise<WorkResponse> => {
  try {
    const response = await axios.get<WorkResponse>(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching work with ID ${id}:`, error);
    throw error;
  }
};

// Add a new work
export const addWork = async (work: WorkRequest): Promise<WorkResponse> => {
  try {
    const response = await axios.post<WorkResponse>(BASE_URL, work);
    return response.data;
  } catch (error) {
    console.error('Error adding work:', error);
    throw error;
  }
};

// Update an existing work by ID
export const updateWork = async (id: number, work: WorkRequest): Promise<WorkResponse> => {
  try {
    const response = await axios.put<WorkResponse>(`${BASE_URL}/${id}`, work);
    return response.data;
  } catch (error) {
    console.error(`Error updating work with ID ${id}:`, error);
    throw error;
  }
};

// Delete a work by ID
export const deleteWork = async (id: number): Promise<{ message: string }> => {
  try {
    const response = await axios.delete<{ message: string }>(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting work with ID ${id}:`, error);
    throw error;
  }
};
