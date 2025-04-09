import NewTable from "@/components/layout/NewTable";
import { getUsers } from "@/components/service/user-service";
import { User } from "@/components/types/tUser";
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
import { PlusIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

// hapa tuna control form 
const formSchema = z.object({
  firstName: z.string().min(2, {
    message: "Firstame must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Lastname must be at least 2 characters.",
  }),
  age: z.coerce.number().int().positive(),
  visits: z.coerce.number().int().positive(),
  progress: z.coerce.number().int().positive(),
  status: z.string().min(2,{
    message: "Status must be either Married or Unmarried.",
  })
 
});

type FormSchema = z.infer<typeof formSchema>;

// hapo tunatumia zod au yup

export default function OrderedFoodDatatable() {
  const columns = useMemo<ColumnDef<User>[]>(
    () => [
      {
        header: "ID",
        // accessorFn: (_, index) => index + 1,
       accessorKey: 'id',
      },
      {
        header: "First Name",
        accessorKey: "firstName",
      },
      {
        header: "Last Name",
        accessorKey: "lastName",
      },
      {
        header: "Age",
        accessorKey: "age",
      },
      {
        header: "Visits",
        accessorKey: "visits",
      },
      {
        header: "Progress",
        accessorKey: "progress",
      },
      {
        header: "Status",
        accessorKey: "status",
      },
    ],
    []
  );

  const [user, setUser] = useState<User[]>([]);
  
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState<User[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClose = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
      // console.log(errors);
      
      getUsers().then((users) => {
        const usersWithId = users.map((food:User, index:number) => ({
          ...food,
          id: index + 1,
        }));
        setUser(usersWithId);
        setFilteredData(usersWithId);
      });
    }, []);
  

  useEffect(() => {
    setFilteredData(
      user.filter((user: User) =>
        Object.values(user).some((value) =>
          String(value).toLowerCase().includes(search.toLowerCase())
        )
      )
    );
  }, [search, user]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const { control, handleSubmit, formState: { errors }, reset } = useForm<FormSchema>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        firstName: "",
        lastName: "",
        age: 0,
        visits:0,
        progress:0,
        status: ""
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
              Add New User <PlusIcon className="ml-2" />
            </button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Add New User</DialogTitle>
            <DialogDescription>
              Fill in the details below to add a new user.
            </DialogDescription>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

          
              <div className="space-y-2">
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700"
                >
                 First Name
                </label>
                <Controller
                  name="firstName"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      id="firstName"
                      type="text"
                      placeholder="Enter firstName"
                      className="block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  )}
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm">{errors.firstName.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700"
                >
                 Last Name
                </label>
                <Controller
                  name="lastName"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      id="lastName"
                      type="text"
                      placeholder="Enter lastName "
                      className="block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  )}
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm">{errors.lastName.message}</p>
                )}
              </div>

  
       <div className="space-y-2">
                <label
                  htmlFor="age"
                  className="block text-sm font-medium text-gray-700"
                >
                  Age
                </label>
                <Controller
                  name="age"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      id="age"
                      type="number"
                      placeholder="Enter age"
                      className="block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  )}
                />
                {errors.age && (
                  <p className="text-red-500 text-sm">
                    {errors.age.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="progress"
                  className="block text-sm font-medium text-gray-700"
                >
                  Progress
                </label>
                <Controller
                  name="progress"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      id="progress"
                      placeholder="Enter progress"
                      className="block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  )}
                />
                {errors.progress && (
                  <p className="text-red-500 text-sm">
                    {errors.progress.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="visits"
                  className="block text-sm font-medium text-gray-700"
                >
                  Visits
                </label>
                <Controller
                  name="visits"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      id="visits"
                      type="number"
                      placeholder="Enter visits"
                      className="block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  )}
                />
                {errors.visits && (
                  <p className="text-red-500 text-sm">
                    {errors.visits.message}
                  </p>
                )}
              </div>
           <div className="space-y-2">
                <label
                  htmlFor="status"
                  className="block text-sm font-medium text-gray-700"
                >
                  Status
                </label>
                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      id="status"
                      type="text"
                      placeholder="Enter user status"
                      className="block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  )}
                />
                {errors.status && (
                  <p className="text-red-500 text-sm">
                    {errors.status.message}
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

      <NewTable columns={columns} data={filteredData} />
    </>
  );
}
