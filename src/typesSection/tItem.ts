// Using type for the Item structure
export type ItemResponse = {
    id?: number; // Optional for new items being created
    name: string;
    description: string; // description?: string;
    price: number;
    quantity: number;
    is_registered: boolean;
  };
  export type ItemRequest = { 
    name: string; 
    description: string;  // description?: string;
    price: number; 
    quantity: number; 
    is_registered: boolean; 
};
  // Using type for the API response structure
  // export type ApiResponse<T> = {
  //   item?: T;
  //   items?: T[];
  //   detail?: string; // For error messages
  // };
  