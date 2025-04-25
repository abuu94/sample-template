import { useState, useEffect } from 'react';
import { ProductRequest, ProductResponse } from '@/typesSection/tProduct'; // Adjust the path as needed
import { getProducts, getProductById, addProduct, updateProduct, deleteProduct } from '@/serviceSection/productService'; // Adjust the path as needed

/**
 * Custom hook to manage products.
 * Provides functions to fetch, create, update, and delete products.
 */

export function useProducts() {
  const [products, setProducts] = useState<ProductResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all products with optional limit and offset
  const fetchProducts = async (limit: number = 100, offset: number = 0) => {
    setError(null); // Reset error state before fetching
    setLoading(true); // Set loading state to true
    try {
      const data = await getProducts(limit, offset);
      setProducts(data);
    } catch (err) {
      setError((err as Error).message || 'An error occurred while fetching products');
    } finally {
      setLoading(false);
    }
  };

  // Add a new product
  const createProduct = async (product: ProductRequest) => {
    try {
      const newProduct = await addProduct(product);
      setProducts((prevProducts) => [...prevProducts, newProduct]);
      return { success: true, message: 'Product created successfully' };
    } catch (err) {
      setError((err as Error).message || 'An error occurred while adding the product');
    }
  };

  // Fetch a single product by ID
  const fetchProductById = async (id: number) => {
    try {
      setLoading(true);
      const product = await getProductById(id);
      return product; // Return the fetched product
    } catch (err) {
      setError((err as Error).message || 'An error occurred while fetching the product');
    } finally {
      setLoading(false);
    }
  };

  // Edit a product by ID
  const updateProductDetails = async (id: number, product: ProductRequest) => {
    try {
      const updatedProduct = await updateProduct(id, product);
      setProducts((prevProducts) =>
        prevProducts.map((p) => (p.id === id ? updatedProduct : p))
      );
      return { success: true, message: 'Product updated successfully' };
    } catch (err) {
      setError((err as Error).message || 'An error occurred while updating the product');
    }
  };

  // Delete a product by ID
  const removeProduct = async (id: number) => {
    try {
      await deleteProduct(id);
      setProducts((prevProducts) => prevProducts.filter((p) => p.id !== id));
      return { success: true, message: 'Product deleted successfully' };
    } catch (err) {
      setError((err as Error).message || 'An error occurred while deleting the product');
    }
  };

  // Automatically fetch products when the hook is initialized
  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    loading,
    error,
    fetchProducts,
    createProduct,
    fetchProductById,
    updateProductDetails,
    removeProduct,
  };
}
