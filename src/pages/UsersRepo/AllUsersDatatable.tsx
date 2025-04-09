import NewTable from "@/components/layout/NewTable";
import { addUser, editUser, getUsers } from "@/components/service/user-service";

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
import { EditIcon, PlusIcon, TrashIcon, ViewIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
// import ViewFoodDialog from "./ViewFoodDialog";
// import { DialogProps } from "@radix-ui/react-dialog";
// import ViewFoodDialog from "./ViewFoodDialog";
import ViewUserDialog from "./ViewUserDialog";



// hapa tuna control form
const formSchema = z.object({
  firstName:  z.string().min(2, {
      message: "firstName  must be at least 2 characters.",
    }),
      lastName:  z.string().min(2, {
        message: "lastName  must be at least 2 characters.",
      }),
      age: z.coerce.number().int().positive(),
      visits: z.coerce.number().int().positive(),
      progress: z.coerce.number().int().positive(),
      status:  z.string().min(2, {
        message: "status  must be at least 2 characters.",
      }),
      image: z.string().min(2, {
        message: "image  must be at least 2 characters.",
      }),
});

type FormSchema = z.infer<typeof formSchema>;

// hapo tunatumia zod au yup

export default function FinishedFoodDatatable(  ) {
  const columns = useMemo<ColumnDef<User>[]>(
    () => [
      {
        header: "ID",
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

  const [user, setUser] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState<User[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [action, setAction] = useState("")
  //view user modal
  const [isViewUserModalOpen, setisViewUserModalOpen] = useState(false);
  const [isEditUserModalOpen, setisEditUserModalOpen] = useState(false);
  const [userSelected, setuserSelected] = useState<User>();

  const handleClose = () => {
    setIsModalOpen(false);
    // setisEditUserModalOpen(false);
  };

  useEffect(() => {
    getUsers().then((foods) => {
      const usersWithId = foods.map((user: User, index: number) => ({
        ...user,
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

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      age: 0,
      visits: 0,
      progress: 0,
      status: "",
      image:"",
    },
  });

  const onSubmit: SubmitHandler<FormSchema> = async (data) => {
    if(action === "edit"){
      const ab = await editUser(data, userSelected?.id ?? 0).then((response) => {
          setUser((prevFood) => [...prevFood.filter(f=>f.id!=response.id),response].sort((a, b) =>a.id - b.id));
        setisEditUserModalOpen(false);
      });
  
    console.log(ab); 
    } else {
      try {
        const newFood = {
          ...data,
          id: user.length ? Math.max(...user.map((f) => Number(f.id))) + 1 : 1,
        };
        const response = await axios.post<User>(
          "http://localhost:3000/users",
          newFood
        );
        setUser((prevFood) => [...prevFood, response.data]);
        console.log("Successfully added user:", response.data);
        toast.success("User added successfully!");
        handleClose();
        reset();
      } catch (error) {
        console.error("Error adding user:", error);
        toast.error("Failed to add user.");
        handleClose();
        reset();
      }

    }
  };

  const handleView = (user: User) => {
    setuserSelected(user);
    setisViewUserModalOpen(true);
    console.log("View User:", user);
  };



  const handleEdit = (user: User) => {
    setAction("edit")
    setuserSelected(user);
    setisEditUserModalOpen(true);
    setValue("firstName",user.firstName)
    setValue("lastName",user.lastName)
    setValue("age",user.age)  
    setValue("visits",user.visits)
    setValue("progress",user.progress)
    setValue("status",user.status)
    setValue("image",user.image) 
    console.log("Edit User:", user);
  };

 
  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3000/users/${id}`);
      setUser((prevUser) => prevUser.filter((user) => user.id !== id));
      toast.success("Food User deleted successfully!");
      console.error("Success deleting Food User:");

    } catch (error) {
      console.error("Error deleting Food User:", error);
      toast.error("Failed to delete Food User.");
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

        <ViewUserDialog
          open={isViewUserModalOpen}
          onOpenChange={() => setisViewUserModalOpen(false)}
          userSelected={userSelected}
        /> 

        {/* editUserDialog start */}
        <Dialog
          open={isEditUserModalOpen}
          onOpenChange={setisEditUserModalOpen}
        >
          <DialogContent>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>
              Fill in the details below to add a new user.
            </DialogDescription>
            <form className="space-y-6">
            <div className="space-y-2">
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700"
                >
                  User firstName
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
                  User firstName
                </label>
                <Controller
                  name="lastName"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      id="lastName"
                      type="text"
                      placeholder="Enter lastName"
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
                  htmlFor="visits"
                  className="block text-sm font-medium text-gray-700"
                >
                  visits
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
                      type="number"
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
                  htmlFor="status"
                  className="block text-sm font-medium text-gray-700"
                >
                  User status
                </label>
                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      id="status"
                      type="text"
                      placeholder="Enter status"
                      className="block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  )}
                />
                {errors.status && (
                  <p className="text-red-500 text-sm">{errors.status.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="image"
                  className="block text-sm font-medium text-gray-700"
                >
                  User image
                </label>
                <Controller
                  name="image"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      id="image"
                      type="text"
                      placeholder="Enter image"
                      className="block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  )}
                />
                {errors.image && (
                  <p className="text-red-500 text-sm">{errors.image.message}</p>
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
        {/* editUserDialog end */}

        {/* addFoodDialog start */}
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
                  User firstName
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
                  User firstName
                </label>
                <Controller
                  name="lastName"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      id="lastName"
                      type="text"
                      placeholder="Enter lastName"
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
                  htmlFor="visits"
                  className="block text-sm font-medium text-gray-700"
                >
                  visits
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
                      type="number"
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
                  htmlFor="status"
                  className="block text-sm font-medium text-gray-700"
                >
                  User status
                </label>
                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      id="status"
                      type="text"
                      placeholder="Enter status"
                      className="block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  )}
                />
                {errors.status && (
                  <p className="text-red-500 text-sm">{errors.status.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="image"
                  className="block text-sm font-medium text-gray-700"
                >
                  User image
                </label>
                <Controller
                  name="image"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      id="image"
                      type="text"
                      placeholder="Enter image"
                      className="block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  )}
                />
                {errors.image && (
                  <p className="text-red-500 text-sm">{errors.image.message}</p>
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
                  Add User
                </button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
         {/* addFoodDialog start */}
      </div>

      <NewTable columns={columns} data={filteredData} />
    </>
  );
}
