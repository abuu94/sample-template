export type ProductResponse = {
  id?: number; // Optional for new pr being created
  product_name: string; // The name of the product
  description?: string; // Optional description of the product
  price: number; // The price of the product
  image?: string; // Optional URL or path to the product image
  comments?: string; // Optional comments about the product
  user_id: number; // Foreign key referencing the User (from User type)
};
export type ProductRequest = {
  product_name: string; // The name of the product
  description?: string; // Optional description of the product
  price: number; // The price of the product
  image?: string; // Optional URL or path to the product image
  comments?: string; // Optional comments about the product
  user_id: number; // Foreign key referencing the User (from User type)
};
