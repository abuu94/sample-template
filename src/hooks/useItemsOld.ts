import { useState, useEffect } from 'react';

// import { ItemResponse, ItemRequest } from '../types/tItem';

// import { getItems, getItemByID, addItem, editItem, deleteItem } from '../services/itemService'; // Adjust the path to your service file
import { ItemRequest, ItemResponse } from '@/typesSection/tItem';
import { getItems, getItemByID, addItem, editItem, deleteItem } from '@/serviceSection/itemService';

/**
 * Custom hook to manage items.
 * Provides functions to fetch, create, update, and delete items.
 */

export function useItems() {
  const [items, setItems] = useState<ItemResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch items with optional limit and offset
  const fetchItems = async (limit: number = 10, offset: number = 0) => {
    try {
      setLoading(true);
      const data = await getItems(limit, offset);
      setItems(data);
    } catch (err) {
      setError((err as Error).message || 'An error occurred while fetching items');
    } finally {
      setLoading(false);
    }
  };

  // Add a new item
  const createItem = async (item: ItemRequest) => {
    try {
      const newItem = await addItem(item);
      setItems((prevItems) => [...prevItems, newItem]);
    } catch (err) {
      setError((err as Error).message || 'An error occurred while adding the item');
    }
  };

  // Fetch a single item by ID
  const fetchItemById = async (id: number) => {
    try {
      setLoading(true);
      const item = await getItemByID(id);
      return item; // Return the fetched item
    } catch (err) {
      setError((err as Error).message || 'An error occurred while fetching the item');
    } finally {
      setLoading(false);
    }
  };

  // Edit an item by ID
  const updateItem = async (id: number, item: ItemRequest) => {
    try {
      const updatedItem = await editItem(item, id);
      setItems((prevItems) =>
        prevItems.map((i) => (i.id === id ? updatedItem : i))
      );
    } catch (err) {
      setError((err as Error).message || 'An error occurred while updating the item');
    }
  };

  // Delete an item by ID
  const removeItem = async (id: number) => {
    try {
      await deleteItem(id);
      setItems((prevItems) => prevItems.filter((i) => i.id !== id));
    } catch (err) {
      setError((err as Error).message || 'An error occurred while deleting the item');
    }
  };

  // Automatically fetch items when the hook is initialized
  useEffect(() => {
    fetchItems();
  }, []);

  return {
    items,
    loading,
    error,
    fetchItems,
    createItem,
    fetchItemById,
    updateItem,
    removeItem,
  };
}
