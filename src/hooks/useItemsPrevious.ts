import { useState, useEffect } from 'react';

// import { ItemResponse, ItemRequest } from '../types/tItem';

// import { getItems, getItemByID, addItem, editItem, deleteItem } from '../services/itemService'; // Adjust the path to your service file
import { ItemRequest, ItemResponse } from '@/typesSection/tItem';
import { getItems, getItemByID, addItem, editItem, deleteItem } from '@/serviceSection/itemService';

/**
 * Custom hook to manage items.
 * Provides functions to fetch, create, update, and delete items.
 */

export  function useItems() {
  const [items, setItems] = useState<ItemResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // Fetch items with optional limit and offset
  const fetchItems = async (limit: number = 1000, offset: number = 0) => {
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

  // Automatically fetch items when the hook is initialized
  useEffect(() => {
    fetchItems();
  }, []);

  return {
    items,
    loading,
    error,
    fetchItems,
  
  };
}

export default useItems;
