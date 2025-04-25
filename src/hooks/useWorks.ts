import { useState, useEffect } from 'react';
import { WorkRequest, WorkResponse } from '@/typesSection/tWork'; // Adjust the path as needed
import { getWorks, getWorkById, addWork, updateWork, deleteWork } from '@/serviceSection/workService'; // Adjust the path as needed

/**
 * Custom hook to manage works.
 * Provides functions to fetch, create, update, and delete works.
 */

export function useWorks() {
  const [works, setWorks] = useState<WorkResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all works with optional limit and offset
  const fetchWorks = async (limit: number = 100, offset: number = 0) => {
    setError(null); // Reset error state before fetching
    setLoading(true); // Set loading state to true
    try {
      const data = await getWorks(limit, offset);
      setWorks(data);
    } catch (err) {
      setError((err as Error).message || 'An error occurred while fetching works');
    } finally {
      setLoading(false);
    }
  };

  // Add a new work
  const createWork = async (work: WorkRequest) => {
    try {
      const newWork = await addWork(work);
      setWorks((prevWorks) => [...prevWorks, newWork]);
      return { success: true, message: 'Work created successfully' };
    } catch (err) {
      setError((err as Error).message || 'An error occurred while adding the work');
    }
  };

  // Fetch a single work by ID
  const fetchWorkById = async (id: number) => {
    try {
      setLoading(true);
      const work = await getWorkById(id);
      return work; // Return the fetched work
    } catch (err) {
      setError((err as Error).message || 'An error occurred while fetching the work');
    } finally {
      setLoading(false);
    }
  };

  // Edit a work by ID
  const updateWorkDetails = async (id: number, work: WorkRequest) => {
    try {
      const updatedWork = await updateWork(id, work);
      setWorks((prevWorks) =>
        prevWorks.map((w) => (w.id === id ? updatedWork : w))
      );
      return { success: true, message: 'Work updated successfully' };
    } catch (err) {
      setError((err as Error).message || 'An error occurred while updating the work');
    }
  };

  // Delete a work by ID
  const removeWork = async (id: number) => {
    try {
      await deleteWork(id);
      setWorks((prevWorks) => prevWorks.filter((w) => w.id !== id));
      return { success: true, message: 'Work deleted successfully' };
    } catch (err) {
      setError((err as Error).message || 'An error occurred while deleting the work');
    }
  };

  // Automatically fetch works when the hook is initialized
  useEffect(() => {
    fetchWorks();
  }, []);

  return {
    works,
    loading,
    error,
    fetchWorks,
    createWork,
    fetchWorkById,
    updateWorkDetails,
    removeWork,
  };
}
