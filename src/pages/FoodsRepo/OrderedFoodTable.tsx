import NewTable from "@/components/layout/NewTable";
import { getFoods } from "@/components/service/food-service";
import { getUsers } from "@/components/service/user-service";
import { User } from "@/components/types/tUser";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Food } from "@/typesSection/tFood";
import { zodResolver } from "@hookform/resolvers/zod";
import { ColumnDef } from "@tanstack/react-table";
import axios from "axios";
import { BombIcon, EditIcon, PlusIcon, TrashIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

// hapa tuna control form 
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Firstame must be at least 2 characters.",
  }),
  category: z.string().min(2, {
    message: "You must enter category name must be at least 2 characters.",
  }),
  calories: z.coerce.number().int().positive(),
});

type FormSchema = z.infer<typeof formSchema>;

// hapo tunatumia zod au yup

export default function OrderedFoodTable() {
    // id: number;
// name: string;
// category: string;
// calories: number;

  const columns = useMemo<ColumnDef<User>[]>(
    () => [
      {
        header: "ID",
        // accessorFn: (_, index) => index + 1,
       accessorKey: 'id',
      },
      {
        header: "Name",
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
      {
        header: "Action",
        accessorKey: "action",
        cell:({row})=>(
            <div className="flex space-x-2">
              
              {/* <button
                onClick={()=> handleView(selectedUser)}
                className="text-blue-500 hover:text-blue-700">
                    <ViewIcon className="w-5 h-5"/>
                </button>
                {selectedUser && <ViewUserDialog user={selectedUser} />} */}


                <button
                onClick={()=>handleEdit(row.original)}
                className="text-blue-500 hover:text-blue-700">
                    <EditIcon className="w-5 h-5"/>
                </button>
                <button
                onClick={()=>handleBlock(Number(row.original.id))}>
                  <BombIcon className="w-5 h-5"/>
                  
                </button>
                <button
                onClick={()=>handleDelete(Number(row.original.id))}>
                    <TrashIcon className="w-5 h-5"/>
                </button>

            </div>

        ),
      },
      
    ],
    []
  );

  const [food, setFood] = useState<Food[]>([]);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState<Food[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClose = () => {
    setIsModalOpen(false);
  };

 
  useEffect(() => {
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

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const { control, handleSubmit, formState: { errors }, reset } = useForm<FormSchema>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        name: "",
        category: "",
        calories: 0,
        
      },
    });


    const onSubmit: SubmitHandler<FormSchema> = async (data) => {
      try {
        const newUser = {
          ...data,
          id: user.length ? Math.max(...user.map((f) => Number(f.id))) + 1 : 1,
        };
  
        const response = await axios.post<User>(
          "http://localhost:3000/users",
          newUser
        ); // Adjust the URL as necessary
        setUser((prevUser) => [...prevUser, response.data]);
        console.log("Successfully added user:", response.data);
  
        toast.success("User added successfully!");
        handleClose();
        reset(); // Reset the form fields
      } catch (error) {
        console.error("Error adding user:", error);
        toast.error("Failed to add user.");
        handleClose();
        reset(); // Reset the form fields
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
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <button className="flex bg-blue-500 text-white rounded-md px-4 py-2">
              Add New Food <PlusIcon className="ml-2" />
            </button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Add New Food</DialogTitle>
            <DialogDescription>
              Fill in the details below to add a new food.
            </DialogDescription>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

          
              <div className="space-y-2">
                <label
                  htmlFor="firstName"
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
                  htmlFor="cayegory"
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
                  <p className="text-red-500 text-sm">{errors.category.message}</p>
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
                  Submit
                </button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <NewTable columns={columns} data={filteredData} />
    </>
  );
}
function handleEdit(original: User): void {
    throw new Error("Function not implemented.");
}

function handleBlock(arg0: number): void {
    throw new Error("Function not implemented.");
}

function handleDelete(arg0: number): void {
    throw new Error("Function not implemented.");
}

