import NewTable from "@/components/layout/NewTable";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useUsers } from "@/hooks/useUsers"; // Use the hook instead of directly importing fetchUsers
import { UserRequest, UserResponse } from "@/typesSection/tUser";
import { zodResolver } from "@hookform/resolvers/zod";
import { ColumnDef } from "@tanstack/react-table";
import {
  EditIcon,
  TrashIcon,
  ViewIcon,
  RefreshCwIcon,
  PlusIcon,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ViewFoodDialog from "./ViewUserDialog";

const formSchema = z.object({
  fullname: z.string().min(2, {
    message: "Name  must be at least 2 characters.",
  }),
  urole: z.string().min(2, {
    message: "Role must be at least 2 characters.",
  }),
  region: z.string().min(2, {
    message: "Role must be at least 2 characters.",
  }),
  disability: z.string().min(2, {
    message: "disability must be at least 2 characters.",
  }),
  levelofeducation: z.string().min(2, {
    message: "levelofeducation must be at least 2 characters.",
  }),

  username: z.string().min(2, {
    message: "Role must be at least 2 characters.",
  }),
  pwd: z.string().min(2, {
    message: "pwd must be at least 2 characters.",
  }),
  created: z.string().min(2, {
    message: "created must be at least 2 characters.",
  }),
  status: z.string().min(2, {
    message: "Role must be at least 2 characters.",
  }),
  phonenumber: z.string().min(2, {
    message: "pwd must be at least 2 characters.",
  }),
  picture: z.string().min(2, {
    message: "picture must be at least 2 characters.",
  }),
  street: z.string().min(2, {
    message: "Role must be at least 2 characters.",
  }),
  income: z.string().min(2, {
    message: "pwd must be at least 2 characters.",
  }),
  email: z.string().min(2, {
    message: "email must be at least 2 characters.",
  }),

  // region: z.coerce.number().positive(),
  // disability: z.coerce.number().int().positive(),
  // levelofeducation: z.coerce.boolean(),
});

type FormSchema = z.infer<typeof formSchema>;

export default function UserDatatable() {
  const {
    users,
    loading,
    error,
    fetchUsers,
    createUser,
    updateUserDetails,
    removeUser,
  } = useUsers();

  const columns = useMemo<ColumnDef<UserResponse>[]>(
    () => [
      {
        header: "ID",
        cell: ({ row }) => <span>{row.index + 1}</span>, // Display row index as ID
      },
      {
        header: "Name",
        accessorKey: "fullname",
      },
      {
        header: "Role",
        accessorKey: "urole",
      },
      {
        header: "Region",
        accessorKey: "region",
      },
      {
        header: "Disability",
        accessorKey: "disability",
      },
      {
        header: "Education",
        accessorKey: "levelofeducation",
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
            <button
              onClick={() => handleDelete(row.original.id || 0)} // Ensure id is defined
              className="text-red-500 hover:text-red-700"
            >
              <TrashIcon className="w-5 h-5" />
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const [search, setSearch] = useState<string>("");
  const [filteredData, setFilteredData] = useState<UserResponse[]>([]);
  const [itemSelected, setitemSelected] = useState<UserResponse>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVModalOpen, setIsVModalOpen] = useState(false);
  const [isEModalOpen, setisEModalOpen] = useState(false);

  // Handle filtering based on search input
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    setSearch(searchValue);

    const filtered = users.filter((user) =>
      Object.values(user).some((value) =>
        String(value).toLowerCase().includes(searchValue.toLowerCase())
      )
    );
    setFilteredData(filtered);
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
      fullname: "",
      urole: "",
      region: "guest",
      levelofeducation: "none",
      disability: "",
      username: "",
      pwd: "",
      created: "",
      status: "active",
      phonenumber: "",
      picture: "",
      street: "",
      income: "below_1000_tsh",
      email: "",
    },
  });

  const onSubmitAdd = async (data: FormSchema) => {
    try {
      const response = await createUser(data);
      if (response && response.success === true) {
        reset();
        setIsModalOpen(false);
        fetchUsers();
        toast.success("User region successfully!");
      } else {
        toast.error("Failed to create user. Please try again."); // Show error toast
        reset(); // Reset the form even if creation fails
        setIsModalOpen(false); // Close the modal after submission
      }
    } catch (error) {
      console.error("Error creating user:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  const onSubmitEdit = async (id: number, data: FormSchema) => {
    if (!id || !data) {
      console.error("Invalid ID or data provided.");
      toast.error("Failed to update user. Missing required data.");
      return; // Exit if validation fails
    }
    try {
      const response = await updateUserDetails(id, data);

      if (response?.success) {
        reset();
        setisEModalOpen(false);
        fetchUsers();
        toast.success("User updated successfully!");
      } else {
        toast.error(
          response?.message || "Failed to update user. Please try again."
        );
      }
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  const handleView = (user: UserResponse) => {
    setitemSelected(user);
    setIsVModalOpen(true);
    console.log("View UserResponse:", user);
  };

  const handleEdit = (user: UserRequest) => {
    if (!user) {
      console.error("Invalid user provided.");
      toast.error("Failed to load user data for editing.");
      return;
    }

    setitemSelected(user);
    setisEModalOpen(true);
    setValue("fullname", user.fullname || ""),
      setValue("region", user.region || ""),
      setValue("disability", user.disability || ""),
      setValue("levelofeducation", user.levelofeducation || ""),
      setValue("urole", user.urole || ""),
      console.log("Edit UserResponse:", user);
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await removeUser(id);

      if (response?.success) {
        fetchUsers();
        toast.success("User Deleted successfully!");
      } else {
        toast.error(
          response?.message || "Failed to delete user. Please try again."
        );
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("An unexpected error occurred. Please try again.");
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
              Fill in the details below to add a new User.
            </DialogDescription>

            <form onSubmit={handleSubmit(onSubmitAdd)} className="space-y-6">
              <div className="space-y-2">
                <label
                  htmlFor="fullname"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name{" "}
                </label>
                <Controller
                  fullname="fullname"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      id="fullname"
                      type="text"
                      placeholder="Enter Name"
                      className="block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  )}
                />
                {errors.fullname && (
                  <p className="text-red-500 text-sm">
                    {errors.fullname.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="urole"
                  className="block text-sm font-medium text-gray-700"
                >
                  Role{" "}
                </label>
                <Controller
                  fullname="urole"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      id="urole"
                      type="text"
                      placeholder="Enter Role"
                      className="block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  )}
                />
                {errors.urole && (
                  <p className="text-red-500 text-sm">{errors.urole.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="region"
                  className="block text-sm font-medium text-gray-700"
                >
                  Price{" "}
                </label>
                <Controller
                  fullname="region"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      id="region"
                      type="number"
                      placeholder="Tsh 0.00"
                      className="block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  )}
                />
                {errors.region && (
                  <p className="text-red-500 text-sm">
                    {errors.region.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="disability"
                  className="block text-sm font-medium text-gray-700"
                >
                  Disability{" "}
                </label>
                <Controller
                  fullname="disability"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      id="disability"
                      type="number"
                      placeholder="0"
                      className="block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  )}
                />
                {errors.disability && (
                  <p className="text-red-500 text-sm">
                    {errors.disability.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="levelofeducation"
                  className="block text-sm font-medium text-gray-700"
                >
                  Education{" "}
                </label>
                <Controller
                  fullname="levelofeducation"
                  control={control}
                  render={({ field }) => (
                    <select
                      id="levelofeducation"
                      className="block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    >
                      <option>Choose..</option>
                      <option value="true">True</option>
                      <option value="false">False</option>
                    </select>
                  )}
                />
                {errors.levelofeducation && (
                  <p className="text-red-500 text-sm">
                    {errors.levelofeducation.message}
                  </p>
                )}
              </div>

              <div className="flex justify-end space-x-2 mt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)} // Close the modal without submitting
                  // onClick={handleClose}
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

        <button
          onClick={() => fetchUsers()} // Explicitly calls fetchUsers
          className="flex users-center space-x-1 text-blue-500 hover:text-blue-700"
        >
          <RefreshCwIcon className="w-5 h-5" />
          <span>Refresh Items</span>
        </button>

        <ViewFoodDialog
          open={isVModalOpen}
          onOpenChange={() => setIsVModalOpen(false)}
          itemSelected={itemSelected}
        />

        {/* editFoodDialog start   // onSubmit={handleSubmit(onSubmit)}  */}
        <Dialog open={isEModalOpen} onOpenChange={setisEModalOpen}>
          <DialogContent>
            <DialogTitle>Edit UserResponse</DialogTitle>
            <DialogDescription>
              Fill in the details below to edit user.
            </DialogDescription>

            <form
              onSubmit={handleSubmit((data) => {
                if (itemSelected?.id) {
                  onSubmitEdit(itemSelected.id, data);
                } else {
                  console.error("User ID is missing.");
                  toast.error("Failed to identify the user to update.");
                }
              })}
              className="space-y-6"
            >
              <div className="space-y-2">
                <label
                  htmlFor="fullname"
                  className="block text-sm font-medium text-gray-700"
                >
                  User Name
                </label>
                <Controller
                  fullname="fullname"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      id="fullname"
                      type="text"
                      placeholder="Enter Name"
                      className="block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  )}
                />
                {errors.fullname && (
                  <p className="text-red-500 text-sm">
                    {errors.fullname.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="urole"
                  className="block text-sm font-medium text-gray-700"
                >
                  Role
                </label>
                <Controller
                  fullname="urole"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      id="urole"
                      type="text"
                      placeholder="Enter Role"
                      className="block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  )}
                />
                {errors.urole && (
                  <p className="text-red-500 text-sm">{errors.urole.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="region"
                  className="block text-sm font-medium text-gray-700"
                >
                  Price
                </label>
                <Controller
                  fullname="region"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      id="region"
                      type="number"
                      placeholder="Enter Calories"
                      className="block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  )}
                />
                {errors.region && (
                  <p className="text-red-500 text-sm">
                    {errors.region.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="disability"
                  className="block text-sm font-medium text-gray-700"
                >
                  Disability
                </label>
                <Controller
                  fullname="disability"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      id="disability"
                      type="number"
                      placeholder="Enter Disability"
                      className="block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  )}
                />
                {errors.disability && (
                  <p className="text-red-500 text-sm">
                    {errors.disability.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="levelofeducation"
                  className="block text-sm font-medium text-gray-700"
                >
                  Education{" "}
                </label>
                <Controller
                  fullname="levelofeducation"
                  control={control}
                  render={({ field }) => (
                    <select
                      // {...field}
                      id="levelofeducation"
                      // defaultValue={itemSelected?.levelofeducation ? "true" : "false"}
                      defaultValue={
                        itemSelected?.levelofeducation ? "true" : "false"
                      }
                      // type="number"
                      className="block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    >
                      <option>Choose..</option>
                      <option value="true">True</option>
                      <option value="false">False</option>
                    </select>
                  )}
                />
                {errors.levelofeducation && (
                  <p className="text-red-500 text-sm">
                    {errors.levelofeducation.message}
                  </p>
                )}
              </div>

              <div className="flex justify-end space-x-2 mt-4">
                <button
                  type="button"
                  onClick={() => setisEModalOpen(false)} // Close the modal without submitting
                  className="bg-gray-500 text-white rounded-md px-4 py-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white rounded-md px-4 py-2"
                  // onClick={handleSubmit(onSubmitEdit)}
                >
                  Save
                </button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
        {/* editFoodDialog end */}
      </div>
      {loading && (
        <div className="text-center text-red-500 w-full mt-4">
          <span className="bg-green-300 text-white px-2 py-1 rounded w-64">
            Loading... Please wait.
          </span>
        </div>
      )}

      {!loading && error && (
        <div className="text-center text-red-500 mt-4">
          <div className="bg-green-300 text-lg font-semibold">
            Oops! Something went wrong while fetching the data.
          </div>
          <button
            onClick={() => fetchUsers()} // Explicitly calls fetchUsers
            className="flex users-center space-x-1 text-blue-500 hover:text-blue-700 mt-2"
          >
            <RefreshCwIcon className="w-5 h-5" />
            <span>Retry</span>
          </button>
        </div>
      )}

      {!loading && !error && users.length === 0 && (
        <div className="text-center text-gray-500 mt-4">
          <div className="text-lg font-semibold">
            No data available to display.
          </div>
        </div>
      )}

      {!loading && !error && users.length > 0 && (
        <NewTable
          columns={columns}
          data={filteredData.length ? filteredData : users}
        />
      )}
    </>
  );
}
