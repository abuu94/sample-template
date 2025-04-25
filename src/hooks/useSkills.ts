import { useState, useEffect } from 'react';
import { SkillRequest, SkillResponse } from '@/typesSection/tSkill'; // Adjust the path as needed
import { getSkills, getSkillById, addSkill, updateSkill, deleteSkill } from '@/serviceSection/skillService'; // Adjust the path as needed

/**
 * Custom hook to manage skills.
 * Provides functions to fetch, create, update, and delete skills.
 */

export function useSkills() {
  const [skills, setSkills] = useState<SkillResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch skills with optional limit and offset
  const fetchSkills = async (limit: number = 100, offset: number = 0) => {
    setError(null); // Reset error state before fetching
    setLoading(true); // Set loading state to true
    try {
      const data = await getSkills(limit, offset);
      setSkills(data);
    } catch (err) {
      setError((err as Error).message || 'An error occurred while fetching skills');
    } finally {
      setLoading(false);
    }
  };

  // Add a new skill
  const createSkill = async (skill: SkillRequest) => {
    try {
      const newSkill = await addSkill(skill);
      setSkills((prevSkills) => [...prevSkills, newSkill]);
      return { success: true, message: 'Skill created successfully' };
    } catch (err) {
      setError((err as Error).message || 'An error occurred while adding the skill');
    }
  };

  // Fetch a single skill by ID
  const fetchSkillById = async (id: number) => {
    try {
      setLoading(true);
      const skill = await getSkillById(id);
      return skill; // Return the fetched skill
    } catch (err) {
      setError((err as Error).message || 'An error occurred while fetching the skill');
    } finally {
      setLoading(false);
    }
  };

  // Edit a skill by ID
  const updateSkillDetails = async (id: number, skill: SkillRequest) => {
    try {
      const updatedSkill = await updateSkill(id, skill);
      setSkills((prevSkills) =>
        prevSkills.map((s) => (s.id === id ? updatedSkill : s))
      );
      return { success: true, message: 'Skill updated successfully' };
    } catch (err) {
      setError((err as Error).message || 'An error occurred while updating the skill');
    }
  };

  // Delete a skill by ID
  const removeSkill = async (id: number) => {
    try {
      await deleteSkill(id);
      setSkills((prevSkills) => prevSkills.filter((s) => s.id !== id));
      return { success: true, message: 'Skill deleted successfully' };
    } catch (err) {
      setError((err as Error).message || 'An error occurred while deleting the skill');
    }
  };

  // Automatically fetch skills when the hook is initialized
  useEffect(() => {
    fetchSkills();
  }, []);

  return {
    skills,
    loading,
    error,
    fetchSkills,
    createSkill,
    fetchSkillById,
    updateSkillDetails,
    removeSkill,
  };
}
