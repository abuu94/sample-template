import NewTable from "@/components/layout/NewTable";
import { addFood, editFood, getFoods } from "@/components/service/food-service";

import { ItemResponse } from "@/components/types/tFood";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { ColumnDef } from "@tanstack/react-table";
import axios from "axios";
import { EditIcon, PlusIcon, TrashIcon, ViewIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

import ViewFoodDialog from "./ViewFoodDialog";
import { DialogProps } from "@radix-ui/react-dialog";

// hapa tuna control form
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Foodname  must be at least 2 characters.",
  }),
  category: z.string().min(2, {
    message: "Category must be at least 2 characters.",
  }),
  calories: z.coerce.number().int().positive(),
});

type FormSchema = z.infer<typeof formSchema>;

// hapo tunatumia zod au yup
// id,name,description, price,quantity,is_registered


export default function FinishedFoodDatatable(  ) {
  const columns = useMemo<ColumnDef<ItemResponse>[]>(
    () => [
      {
        header: "ID",
        // accessorFn: (_, index) => index + 1,
        accessorKey: "id",
      },
      {
        header: " Name",
        accessorKey: "name",
      },
      {
        header: "Description",
        accessorKey: "description",
      },
      {
        header: "Price (Tshs)",
        accessorKey: "price",
      },
      {
        header: "Quantity",
        accessorKey: "quantity",
      },
      {
        header: "Registered",
        accessorKey: "is_registered",
      },
      {
        header: "Actions",
        accessorKey: "actions",
        cell: ({ row }) => (
          <div className="flex space-x-2">
            <button
              onClick={() => handleView(row.original)}
              className="text-blue-500 hover:text-blue-700"
            >
              <ViewIcon className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleEdit(row.original)}
              className="text-blue-500 hover:text-blue-700"
            >
              <EditIcon className="w-5 h-5" />
            </button>
            <button onClick={() => handleDelete(Number(row.original.id))}>
              <TrashIcon className="w-5 h-5" />
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const [food, setFood] = useState<ItemResponse[]>([]);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState<ItemResponse[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [action, setAction] = useState("")
  //view user modal
  const [isViewFoodModalOpen, setisViewFoodModalOpen] = useState(false);
  const [isEditFoodModalOpen, setisEditFoodModalOpen] = useState(false);
  const [foodSelected, setfoodSelected] = useState<ItemResponse>();

  const handleClose = () => {
    setIsModalOpen(false);
    // setisEditFoodModalOpen(false);
  };

  useEffect(() => {
    getFoods().then((foods) => {
      const foodsWithId = foods.map((food: ItemResponse, index: number) => ({
        ...food,
        id: index + 1,
      }));
      setFood(foodsWithId);
      setFilteredData(foodsWithId);
    });
  
  }, []);

  useEffect(() => {
    setFilteredData(
      food.filter((food: ItemResponse) =>
        Object.values(food).some((value) =>
          String(value).toLowerCase().includes(search.toLowerCase())
        )
      )
    );
  }, [search, food]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      category: "",
      calories: 0,
    },
  });

  const onSubmit: SubmitHandler<FormSchema> = async (data) => {
    if(action === "edit"){
      const ab = await editFood(data, foodSelected?.id ?? 0).then((response) => {
          setFood((prevFood) => [...prevFood.filter(f=>f.id!=response.id),response].sort((a, b) =>a.id - b.id));
        setisEditFoodModalOpen(false);
      });
  
    console.log(ab); 
    } else {
      try {
        const newFood = {
          ...data,
          id: food.length ? Math.max(...food.map((f) => Number(f.id))) + 1 : 1,
        };
        const response = await axios.post<ItemResponse>(
          "http://localhost:3000/items",
          newFood
        );
        setFood((prevFood) => [...prevFood, response.data]);
        console.log("Successfully added food:", response.data);
        toast.success("ItemResponse added successfully!");
        handleClose();
        reset();
      } catch (error) {
        console.error("Error adding food:", error);
        toast.error("Failed to add food.");
        handleClose();
        reset();
      }

    }
  };

  const handleView = (food: ItemResponse) => {
    setfoodSelected(food);
    setisViewFoodModalOpen(true);
    console.log("View ItemResponse:", food);
  };

  const handleEdit = (food: ItemResponse) => {
    setAction("edit")
    setfoodSelected(food);
    setisEditFoodModalOpen(true);
    setValue("name",food.name)
    setValue("category",food.category)
    setValue("calories",food.calories)  
    console.log("Edit ItemResponse:", food);
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3000/items/${id}`);
      setFood((prevUser) => prevUser.filter((food) => food.id !== id));
      toast.success("ItemResponse deleted successfully!");
    } catch (error) {
      console.error("Error deleting ItemResponse:", error);
      toast.error("Failed to delete ItemResponse.");
    }
  };

  return (
    <>
      <div className="flex justify-end space-x-2 mb-0">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={handleSearchChange}
          className="border border-gray-300 rounded-md p-2"
        />

        <ViewFoodDialog
          open={isViewFoodModalOpen}
          onOpenChange={() => setisViewFoodModalOpen(false)}
          foodSelected={foodSelected}
        />

        {/* editFoodDialog start */}
        <Dialog
          open={isEditFoodModalOpen}
          onOpenChange={setisEditFoodModalOpen}
        >
          <DialogContent>
            <DialogTitle>Edit ItemResponse</DialogTitle>
            <DialogDescription>
              Fill in the details below to add a new food.
            </DialogDescription>
            <form className="space-y-6">
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  ItemResponse Name
                </label>
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      id="name"
                      type="text"
                      placeholder="Enter Name"
                      className="block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  )}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
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
                      placeholder="Enter Category "
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
                      type="number"
                      placeholder="Enter Calories"
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
                  onClick={handleSubmit(onSubmit)}
                >
                  Save
                </button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
        {/* editFoodDialog end */}

        {/* addFoodDialog start */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <button className="flex bg-blue-500 text-white rounded-md px-4 py-2">
              Add New ItemResponse <PlusIcon className="ml-2" />
            </button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Add New ItemResponse</DialogTitle>
            <DialogDescription>
              Fill in the details below to add a new food.
            </DialogDescription>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  ItemResponse Name
                </label>
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      id="name"
                      type="text"
                      placeholder="Enter Name"
                      className="block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  )}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
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
                      placeholder="Enter Category "
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
                      type="number"
                      placeholder="Enter Calories"
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
                  Add ItemResponse
                </button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
        
         {/* addFoodDialog start    Cisa: */}
         {/* PRTG: NETWORK cONF DATA CNTER  INTERNET SUSTAINABLE      
         */}

      </div>

      <NewTable columns={columns} data={filteredData} />
    </>
  );
}
