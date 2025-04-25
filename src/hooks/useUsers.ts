import { useState, useEffect } from 'react';
import { UserRequest, UserResponse } from '@/typesSection/tUser'; // Adjust path as needed
import { getUsers, getUserByID, addUser, editUser, deleteUser } from '@/serviceSection/userService'; // Adjust path as needed

/**
 * Custom hook to manage users.
 * Provides functions to fetch, create, update, and delete users.
 */

export function useUsers() {
  const [users, setUsers] = useState<UserResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch users with optional limit and offset
  const fetchUsers = async (limit: number = 100, offset: number = 0) => {
    setError(null); // Reset error state before fetching
    setLoading(true); // Set loading state to true
    try {
      const data = await getUsers(limit, offset);
      setUsers(data);
    } catch (err) {
      setError((err as Error).message || 'An error occurred while fetching users');
    } finally {
      setLoading(false);
    }
  };

  // Add a new user
  const createUser = async (user: UserRequest) => {
    try {
      const newUser = await addUser(user);
      setUsers((prevUsers) => [...prevUsers, newUser]);
      return { success: true, message: 'User created successfully' };
    } catch (err) {
      setError((err as Error).message || 'An error occurred while adding the user');
    }
  };

  // Fetch a single user by ID
  const fetchUserById = async (id: number) => {
    try {
      setLoading(true);
      const user = await getUserByID(id);
      return user; // Return the fetched user
    } catch (err) {
      setError((err as Error).message || 'An error occurred while fetching the user');
    } finally {
      setLoading(false);
    }
  };

  // Edit a user by ID
  const updateUserDetails = async (id: number, user: UserRequest) => {
    try {
      const updatedUser = await editUser(user,id);
      setUsers((prevUsers) =>
        prevUsers.map((u) => (u.id === id ? updatedUser : u))
      );
      return { success: true, message: 'User updated successfully' };
    } catch (err) {
      setError((err as Error).message || 'An error occurred while updating the user');
    }
  };

  // Delete a user by ID
  const removeUser = async (id: number) => {
    try {
      await deleteUser(id);
      setUsers((prevUsers) => prevUsers.filter((u) => u.id !== id));
      return { success: true, message: 'User deleted successfully' };
    } catch (err) {
      setError((err as Error).message || 'An error occurred while deleting the user');
    }
  };

  // Automatically fetch users when the hook is initialized
  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    users,
    loading,
    error,
    fetchUsers,
    createUser,
    fetchUserById,
    updateUserDetails,
    removeUser,
  };
}
