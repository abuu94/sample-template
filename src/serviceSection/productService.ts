import axios from 'axios';
import { ProductResponse, ProductRequest } from '../typesSection/tProduct'; // Adjust the path as needed

const BASE_URL = 'http://127.0.0.1:8000/products'; // Replace with your API endpoint

// Fetch all products with optional pagination
export const getProducts = async (limit: number = 100, offset: number = 0): Promise<ProductResponse[]> => {
  try {
    const response = await axios.get(`${BASE_URL}?limit=${limit}&offset=${offset}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

// Fetch a single product by ID
export const getProductById = async (id: number): Promise<ProductResponse> => {
  try {
    const response = await axios.get<ProductResponse>(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error);
    throw error;
  }
};

// Add a new product
export const addProduct = async (product: ProductRequest): Promise<ProductResponse> => {
  try {
    const response = await axios.post<ProductResponse>(BASE_URL, product);
    return response.data;
  } catch (error) {
    console.error('Error adding product:', error);
    throw error;
  }
};

// Update an existing product by ID
export const updateProduct = async (id: number, product: ProductRequest): Promise<ProductResponse> => {
  try {
    const response = await axios.put<ProductResponse>(`${BASE_URL}/${id}`, product);
    return response.data;
  } catch (error) {
    console.error(`Error updating product with ID ${id}:`, error);
    throw error;
  }
};

// Delete a product by ID
export const deleteProduct = async (id: number): Promise<{ message: string }> => {
  try {
    const response = await axios.delete<{ message: string }>(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting product with ID ${id}:`, error);
    throw error;
  }
};
