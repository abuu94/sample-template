import axios from 'axios';
import { SkillResponse, SkillRequest } from '../typesSection/tSkill'; // Adjust the path as needed

const BASE_URL = 'http://127.0.0.1:8000/skills'; // Replace with your API endpoint

// Fetch all skills with optional pagination
export const getSkills = async (limit: number = 100, offset: number = 0): Promise<SkillResponse[]> => {
  try {
    const response = await axios.get(`${BASE_URL}?limit=${limit}&offset=${offset}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching skills:', error);
    throw error;
  }
};

// Fetch a single skill by ID
export const getSkillById = async (id: number): Promise<SkillResponse> => {
  try {
    const response = await axios.get<SkillResponse>(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching skill with ID ${id}:`, error);
    throw error;
  }
};

// Add a new skill
export const addSkill = async (skill: SkillRequest): Promise<SkillResponse> => {
  try {
    const response = await axios.post<SkillResponse>(BASE_URL, skill);
    return response.data;
  } catch (error) {
    console.error('Error adding skill:', error);
    throw error;
  }
};

// Update an existing skill by ID
export const updateSkill = async (id: number, skill: SkillRequest): Promise<SkillResponse> => {
  try {
    const response = await axios.put<SkillResponse>(`${BASE_URL}/${id}`, skill);
    return response.data;
  } catch (error) {
    console.error(`Error updating skill with ID ${id}:`, error);
    throw error;
  }
};

// Delete a skill by ID
export const deleteSkill = async (id: number): Promise<{ message: string }> => {
  try {
    const response = await axios.delete<{ message: string }>(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting skill with ID ${id}:`, error);
    throw error;
  }
};
