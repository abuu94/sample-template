import React, { useState, useEffect, useMemo } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { PlusIcon } from "lucide-react";
import { Food } from "./typesSection/tFood";
import { ColumnDef } from "@tanstack/react-table";
import { getFoods } from "./serviceSection/food-service";
import NewTableSearchAdded from "./components/layout/NewTableSearchAdded";
import { Card, CardHeader, CardContent } from "./components/ui/card";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  category: z.string().min(2, {
    message: "Category must be at least 2 characters.",
  }),
  calories: z.coerce.number().int().positive()
 
});

type FormSchema = z.infer<typeof formSchema>;

const AppFoodWithForm: React.FC = () => {
  const columns = useMemo<ColumnDef<Food>[]>(
    () => [
      {
        header: "ID",
        // accessorFn: (_, index) => index + 1,
        accessorKey: "id",
      },
      {
        header: "Food Name",
        accessorKey: "name",
      },
      {
        header: "Category",
        accessorKey: "category",
      },
      {
        header: "Calories",
        accessorKey: "calories",
      },
    ],
    []
  );
  const [food, setFood] = useState<Food[]>([]);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState<Food[]>([]);

   const { control, handleSubmit, formState: { errors }, reset } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      category: "",
      calories: 0,
    },
  });

  useEffect(() => {
    // console.log(errors);
    
    getFoods().then((foods) => {
      const foodsWithId = foods.map((food:Food, index:number) => ({
        ...food,
        id: index + 1,
      }));
      setFood(foodsWithId);
      setFilteredData(foodsWithId);
    });
  }, []);

  useEffect(() => {
    setFilteredData(
      food.filter((food: Food) =>
        Object.values(food).some((value) =>
          String(value).toLowerCase().includes(search.toLowerCase())
        )
      )
    );
  }, [search, food]);

    const [isModalOpen, setIsModalOpen] = useState(false);


  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

 
  const onSubmit: SubmitHandler<FormSchema> = async (data) => {
    try {
      const newFood = { ...data, id: food.length ? Math.max(...food.map(f => f.id)) + 1 : 1 };
      const response = await axios.post<Food>('http://localhost:3000/foods', newFood); // Adjust the URL as necessary
      setFood((prevFood) => [...prevFood, response.data]);
      console.log('Successfull adding food:', response.data);

      toast.success('Food added successfully!');
      handleClose();
      reset(); // Reset the form fields
    } catch (error) {
      console.error('Error adding food:', error);
      toast.error('Failed to add food.');
      handleClose();
      reset(); // Reset the form fields


    }
  };

  return (
    <>
    
     <div className="App p-4">
     <Card title="User Table">
                  <CardHeader className="flex justify-between items-left">
                  
                          <ToastContainer/>
                        <div className="flex justify-end space-x-2 mb-0">
                            <input
                              type="text"
                              placeholder="Search..."
                              value={search}
                              onChange={handleSearchChange}
                              className="border border-gray-300 rounded-md p-2"
                            />
                            <Dialog
                              open={isModalOpen}
                              onOpenChange={setIsModalOpen}
                            >
                              <DialogTrigger asChild>
                                <button className="flex bg-blue-500 text-white rounded-md px-4 py-2">
                                  Add Food <PlusIcon className="ml-2" />
                                </button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogTitle>Add New Food</DialogTitle>
                                <DialogDescription>
                                  Fill in the details below to add a new food
                                  item.
                                </DialogDescription>
                                <form
                                  onSubmit={handleSubmit(onSubmit)}
                                  className="space-y-6"
                                >
                                  <div className="space-y-2">
                                    <label
                                      htmlFor="name"
                                      className="block text-sm font-medium text-gray-700"
                                    >
                                      Name
                                    </label>
                                    <Controller
                                      name="name"
                                      control={control}
                                      render={({ field }) => (
                                        <input
                                          {...field}
                                          id="name"
                                          type="text"
                                          placeholder="Enter food name"
                                          className="block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        />
                                      )}
                                    />
                                    {errors.name && (
                                      <p className="text-red-500 text-sm">
                                        {errors.name.message}
                                      </p>
                                    )}
                                  </div>
                                  <div className="space-y-2">
                                    <label
                                      htmlFor="category"
                                      className="block text-sm font-medium text-gray-700"
                                    >
                                      Category
                                    </label>
                                    <Controller
                                      name="category"
                                      control={control}
                                      render={({ field }) => (
                                        <input
                                          {...field}
                                          id="category"
                                          type="text"
                                          placeholder="Enter food category"
                                          className="block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        />
                                      )}
                                    />
                                    {errors.category && (
                                      <p className="text-red-500 text-sm">
                                        {errors.category.message}
                                      </p>
                                    )}
                                  </div>
                                  <div className="space-y-2">
                                    <label
                                      htmlFor="calories"
                                      className="block text-sm font-medium text-gray-700"
                                    >
                                      Calories
                                    </label>
                                    <Controller
                                      name="calories"
                                      control={control}
                                      render={({ field }) => (
                                        <input
                                          {...field}
                                          id="calories"
                                          
                                          placeholder="Enter calories"
                                          className="block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        />
                                      )}
                                    />
                                    {errors.calories && (
                                      <p className="text-red-500 text-sm">
                                        {errors.calories.message}
                                      </p>
                                    )}
                                  </div>
                                  <div className="flex justify-end space-x-2 mt-4">
                                    <button
                                      type="button"
                                      onClick={handleClose}
                                      className="bg-gray-500 text-white rounded-md px-4 py-2"
                                    >
                                      Cancel
                                    </button>
                                    <button
                                      type="submit"
                                      className="bg-blue-500 text-white rounded-md px-4 py-2"
                                    >
                                      Add Food
                                    </button>
                                  </div>
                                </form>
                              </DialogContent>
                            </Dialog>
                          </div>
                   
                  </CardHeader>
                  <CardContent>
                    <NewTableSearchAdded
                      columns={columns}
                      data={filteredData}
                    />
                  </CardContent>
                </Card>
    </div> 
    
    
    </>
  );
};

export default AppFoodWithForm;
