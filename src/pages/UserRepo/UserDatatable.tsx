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
import { set } from "date-fns";
import { log } from "console";

enum UroleEnum {
  Admin = "admin",
  Supporter = "supporter",
  Guest = "guest",
}

enum StatusEnum {
  Active = "active",
  Suspended = "suspended",
  Pending = "pending",
  Disabled = "disabled",
}
enum LevelofeducationEnum {
  Primary = "primary",
  Secondary = "secondary",
  Degree = "degree",
  Postgraduate = "postgraduate",
  None = "none",
}
enum IncomeEnum {
  Below_1000_tsh = "below_1000_tsh",
  Below_10000_tsh = "below_10000_tsh",
  Below_30000_tsh = "below_30000_tsh",
}

const formSchema = z.object({
  fullname: z.string().min(2, {
    message: "Name  must be at least 2 characters.",
  }),
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  pwd: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
  email: z.string().email({
    message: "Invalid email address.",
  }),
  disability: z.string().optional(), // Optional field for disability information
  created: z.string().optional(), // Optional field for created datetime
  phonenumber: z.string().optional(), // Optional field for phone number
  picture: z.string().optional(), // Optional field for picture URL or path
  region: z.string().optional(), // Optional field for region
  street: z.string().optional(), // Optional field for street
  urole: z.enum([UroleEnum.Admin, UroleEnum.Supporter, UroleEnum.Guest]),
  // .refine((value) => Object.values(UroleEnum).includes(value), {
  //   message: "Role must be either admin, user, or guest.",
  // } )
  status: z.enum([
    StatusEnum.Active,
    StatusEnum.Suspended,
    StatusEnum.Pending,
    StatusEnum.Disabled,
  ]),
  // .refine((value) => Object.values(StatusEnum).includes(value), {
  //   message: "Status must be either active, suspended, pending, or disabled.",
  // })
  levelofeducation: z.enum([
    LevelofeducationEnum.Primary,
    LevelofeducationEnum.Secondary,
    LevelofeducationEnum.Degree,
    LevelofeducationEnum.Postgraduate,
    LevelofeducationEnum.None,
  ]),
  // .refine((value) => Object.values(LevelofeducationEnum).includes(value), {
  //   message:
  //     "Level of education must be either primary, secondary, degree, postgraduate, or none.",
  // })
  income: z.enum([
    IncomeEnum.Below_1000_tsh,
    IncomeEnum.Below_10000_tsh,
    IncomeEnum.Below_30000_tsh,
  ]),
  // .refine((value) => Object.values(IncomeEnum).includes(value), {
  //   message:
  //     "Income must be either below 1000 TSH, below 10000 TSH, or below 30000 TSH.",
  // })
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
        header: "Username",
        accessorKey: "username",
      },
      {
        header: "Email",
        accessorKey: "email",
      },
      {
        header: "Phone Number",
        accessorKey: "phonenumber",
      },
      {
        header: "Created",
        accessorKey: "created",
        cell: ({ row }) => {
          const date = new Date(row.getValue("created"));
          return <span>{date.toLocaleDateString()}</span>;
        },
      },
      {
        header: "Region",
        accessorKey: "region",
      },
      {
        header: "Street",
        accessorKey: "street",
      },
      {
        header: "Level of Education",
        accessorKey: "levelofeducation",
      },
      {
        header: "Income",
        accessorKey: "income",
      },
      {
        header: "Disability",
        accessorKey: "disability",
      },
      {
        header: "Picture",
        accessorKey: "picture",
        cell: ({ row }) => {
          const pictureUrl = row.getValue("picture");
          return pictureUrl ? (
            <img
              // src={pictureUrl}
              alt="User"
              className="w-10 h-10 rounded-full"
              style={{ objectFit: "cover" }}
            />
          ) : (
            <span>No Picture</span>
          );
        },
      },
      {
        header: "Status",
        accessorKey: "status",
      },

      {
        header: "Role",
        accessorKey: "urole",
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
      username: "",
      pwd: "",
      email: "",
      disability: "",
      created: new Date().toISOString(), // Set current date as default
      phonenumber: "",
      picture: "",
      region: "",
      street: "",
      status: StatusEnum.Active,
      levelofeducation: LevelofeducationEnum.None,
      income: IncomeEnum.Below_1000_tsh,
      urole: UroleEnum.Guest,
    },
  });
  //  console.log(error);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // Get the selected file
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result; // Convert file to Base64 string
        setValue("picture", base64String as string); // Set the Base64 string in the form state
        console.log("File selected:", base64String); // Log the Base64 string for debugging
      };
    } else {
      console.error("No file selected.");
    }
  };

  const onSubmitAdd = async (data: FormSchema) => {
    // console.log("Form Data:", data); // Log the form data for debugging

    if (!data) {
      console.error("Invalid data provided.");
      toast.error("Failed to create user. Missing required data.");
      return; // Exit if validation fails
    }

    // if (!Object.values(UroleEnum).includes(data.urole)) {
    //   toast.error("Invalid role selected.");
    //   return;
    // }
    // if (!Object.values(StatusEnum).includes(data.status)) {
    //   toast.error("Invalid status selected.");
    //   return;
    // }
    // if (!Object.values(LevelofeducationEnum).includes(data.levelofeducation)) {
    //   toast.error("Invalid level of education selected.");
    //   return;
    // }
    // if (!Object.values(IncomeEnum).includes(data.income)) {
    //   toast.error("Invalid income selected.");
    //   return;
    // }
    // if (
    //   !data.fullname ||
    //   !data.username ||
    //   !data.pwd ||
    //   !data.email ||
    //   !data.phonenumber ||
    //   !data.region ||
    //   !data.street ||
    //   !data.picture ||
    //   !data.disability ||
    //   !data.created
    // ) {
    //   toast.error("Please fill in all required fields.");
    //   return; // Exit if validation fails
    // }

    try {
      const response = await createUser(data); // Cast to UserRequest as UserRequest
      console.log("Create User Response:", response); // Log the response for debugging
      if (response && response.success === true) {
        reset();
        setIsModalOpen(false);
        fetchUsers();
        toast.success("User region successfully!");
        // log("User created successfully:", response); // Log the successful creation
      } else {
        toast.error("Failed to create user. Please try again."); // Show error toast
        console.log("Failed to create user:", response); // Log the failure

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
    //   if (!id || !Object.values(UroleEnum).includes(data.urole)) {
    //     toast.error("Invalid ID or role.");
    //     return;
    //   }
    //   if (!id || !Object.values(StatusEnum).includes(data.status)) {
    //     toast.error("Invalid ID or status.");
    //     return;
    //   }
    //  if (
    //     !id ||
    //     !Object.values(LevelofeducationEnum).includes(data.levelofeducation)
    //   ) {
    //     toast.error("Invalid ID or level of education.");
    //     return;
    //   }
    //   if (!id || !Object.values(IncomeEnum).includes(data.income)) {
    //     toast.error("Invalid ID or income.");
    //     return;
    //   }
    // if (
    //   !data.fullname ||
    //   !data.username ||
    //   !data.pwd ||
    //   !data.email ||
    //   !data.phonenumber ||
    //   !data.region ||
    //   !data.street ||
    //   !data.picture ||
    //   !data.disability ||
    //   !data.created ||
    //   !data.email
    // ) {
    //   toast.error("Please fill in all required fields.");
    //   return; // Exit if validation fails
    // }

    try {
      const response = await updateUserDetails(id, data); // Cast to UserRequest as UserRequest
      console.log("Update User Response:", response); // Log the response for debugging

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
      // setValue("urole", user.urole as UroleEnum); // Cast to UroleEnum
      setValue("username", user.username || ""),
      setValue("pwd", user.pwd || ""),
      setValue("email", user.email || ""),
      setValue("phonenumber", user.phonenumber || ""),
      setValue("region", user.region || ""),
      setValue("street", user.street || ""),
      setValue("status", user.status as StatusEnum), // Cast to StatusEnum
      setValue(
        "levelofeducation",
        user.levelofeducation as LevelofeducationEnum
      ), // Cast to LevelofeducationEnum
      setValue("income", user.income as IncomeEnum), // Cast to IncomeEnum
      setValue("disability", user.disability || ""),
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
          <DialogContent className="max-w-3xl w-full">
            <DialogTitle>
              <div
                className="bg-blue-500 text-white text-sm font-medium px-4 py-3 rounded-md"
                role="alert"
              >
                User Information Add New User
              </div>
            </DialogTitle>
            <DialogDescription>
              Fill in the details below to add a new User.
            </DialogDescription>

            <form
              // onClick={handleSubmit(onSubmitAdd)}
              onSubmit={handleSubmit(onSubmitAdd)}
              className="space-y-6"
            >
              <div className="w-full p-4">
                <div className="overflow-x-auto">
                  <table
                    className="w-full table-auto border border-gray-300 shadow-md rounded-md"
                    aria-label="Item Information Table"
                  >
                    <thead>
                      <tr className="bg-blue-500 text-white">
                        <th className="px-4 py-2 text-left text-sm font-medium">
                          Basic Info
                        </th>
                        <th className="px-4 py-2 text-left text-sm font-medium">
                          Address Info
                        </th>
                        <th className="px-4 py-2 text-left text-sm font-medium">
                          Other Info
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="odd:bg-gray-100 even:bg-gray-200 hover:bg-gray-300">
                        <td className="px-4 py-2">
                          <div className="space-y-2">
                            <label
                              htmlFor="fullname"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Full Name{" "}
                            </label>
                            <Controller
                              name="fullname"
                              control={control}
                              render={({ field }) => (
                                <input
                                  {...field}
                                  id="fullname"
                                  type="text"
                                  placeholder="Enter Full Name"
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
                        </td>
                        <td className="px-4 py-2">
                          <div className="space-y-2">
                            <label
                              htmlFor="role"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Role{" "}
                            </label>
                            <Controller
                              name="urole"
                              control={control}
                              render={({ field }) => (
                                <select
                                  {...field}
                                  id="urole"
                                  className="block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                >
                                  <option value="">Select Role</option>
                                  <option value={UroleEnum.Admin}>Admin</option>
                                  <option value={UroleEnum.Supporter}>
                                    Supporter
                                  </option>
                                  <option value={UroleEnum.Guest}>Guest</option>
                                </select>

                                // <select
                                //   {...field}
                                //   id="urole"
                                //   className="block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                // >
                                //   {Object.values(UroleEnum).map((role) => (
                                //     <option key={role} value={role}>
                                //       {role}
                                //     </option>
                                //   ))}
                                // </select>
                              )}
                            />
                            {errors.urole && (
                              <p className="text-red-500 text-sm">
                                {errors.urole.message}
                              </p>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-2">
                          <div className="space-y-2">
                            <label
                              htmlFor="region"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Region{" "}
                            </label>
                            <Controller
                              name="region"
                              control={control}
                              render={({ field }) => (
                                <input
                                  {...field}
                                  id="region"
                                  type="text"
                                  placeholder="Enter Region"
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
                        </td>
                      </tr>
                      <tr className="odd:bg-gray-100 even:bg-gray-200 hover:bg-gray-300">
                        <td className="px-4 py-2">
                          <div className="space-y-2">
                            <label
                              htmlFor="username"
                              className="block text-sm font-medium text-gray-700"
                            >
                              User Name{" "}
                            </label>
                            <Controller
                              name="username"
                              control={control}
                              render={({ field }) => (
                                <input
                                  {...field}
                                  id="username"
                                  type="text"
                                  placeholder="Enter User Name"
                                  className="block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                />
                              )}
                            />
                            {errors.username && (
                              <p className="text-red-500 text-sm">
                                {errors.username.message}
                              </p>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-2">
                          <div className="space-y-2">
                            <label
                              htmlFor="status"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Status{" "}
                            </label>
                            <Controller
                              name="status"
                              control={control}
                              render={({ field }) => (
                                <select
                                  {...field}
                                  id="status"
                                  className="block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                >
                                  <option value="">Select Role</option>
                                  <option value={StatusEnum.Active}>
                                    Active
                                  </option>
                                  <option value={StatusEnum.Suspended}>
                                    Suspended
                                  </option>
                                  <option value={StatusEnum.Pending}>
                                    Pending
                                  </option>
                                  <option value={StatusEnum.Disabled}>
                                    Disabled
                                  </option>
                                </select>
                                // <select
                                //   {...field}
                                //   id="status"
                                //   className="block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                // >
                                //   {Object.values(StatusEnum).map((status) => (
                                //     <option key={status} value={status}>
                                //       {status}
                                //     </option>
                                //   ))}
                                // </select>
                              )}
                            />
                            {errors.status && (
                              <p className="text-red-500 text-sm">
                                {errors.status.message}
                              </p>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-2">
                          <div className="space-y-2">
                            <label
                              htmlFor="picture"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Street{" "}
                            </label>
                            <Controller
                              name="street"
                              control={control}
                              render={({ field }) => (
                                <input
                                  {...field}
                                  id="street"
                                  type="text"
                                  placeholder="Enter Street"
                                  className="block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                />
                              )}
                            />
                            {errors.street && (
                              <p className="text-red-500 text-sm">
                                {errors.street.message}
                              </p>
                            )}
                          </div>
                        </td>
                      </tr>
                      <tr className="odd:bg-gray-100 even:bg-gray-200 hover:bg-gray-300">
                        <td className="px-4 py-2">
                          <div className="space-y-2">
                            <label
                              htmlFor="pwd"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Password{" "}
                            </label>
                            <Controller
                              name="pwd"
                              control={control}
                              render={({ field }) => (
                                <input
                                  {...field}
                                  id="pwd"
                                  type="text"
                                  placeholder="Enter Password"
                                  className="block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                />
                              )}
                            />
                            {errors.pwd && (
                              <p className="text-red-500 text-sm">
                                {errors.pwd.message}
                              </p>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-2">
                          <div className="space-y-2">
                            <label
                              htmlFor="income"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Income{" "}
                            </label>
                            <Controller
                              name="income"
                              control={control}
                              render={({ field }) => (
                                <select
                                  {...field}
                                  id="income"
                                  className="block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                >
                                  <option value="">Select Income</option>
                                  <option value={IncomeEnum.Below_1000_tsh}>
                                    Below 1000 TSH
                                  </option>
                                  <option value={IncomeEnum.Below_10000_tsh}>
                                    Below 10000 TSH
                                  </option>
                                  <option value={IncomeEnum.Below_30000_tsh}>
                                    Below 30000 TSH
                                  </option>
                                </select>
                              )}
                            />
                            {errors.income && (
                              <p className="text-red-500 text-sm">
                                {errors.income.message}
                              </p>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-2">
                          <div className="space-y-2">
                            <label
                              htmlFor="picture"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Picture
                            </label>
                            <input
                              id="picture"
                              type="file"
                              accept="image/*"
                              className="block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                              onChange={(e) => handleFileChange(e)} // Handle file selection
                            />

                            {/* <Controller
                              name="picture"
                              control={control}
                              render={({ field }) => (
                                <input
                                  id="picture"
                                  type="file"
                                  accept="image/*"
                                  className="block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                  onChange={(e) =>
                                    field.onChange(
                                      e.target.files?.[0] || null
                                    )
                                  } // Ensure this correctly handles file selection
                                />
                              )}
                            /> */}
                            {errors.picture && (
                              <p className="text-red-500 text-sm">
                                {errors.picture.message}
                              </p>
                            )}
                          </div>
                        </td>
                      </tr>
                      <tr className="odd:bg-gray-100 even:bg-gray-200 hover:bg-gray-300">
                        <td className="px-4 py-2">
                          <div className="space-y-2">
                            <label
                              htmlFor="phonenumber"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Phonenumber{" "}
                            </label>
                            <Controller
                              name="phonenumber"
                              control={control}
                              render={({ field }) => (
                                <input
                                  {...field}
                                  id="phonenumber"
                                  type="text"
                                  placeholder="Enter Phonenumber"
                                  className="block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                />
                              )}
                            />
                            {errors.phonenumber && (
                              <p className="text-red-500 text-sm">
                                {errors.phonenumber.message}
                              </p>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-2">
                          <div className="space-y-2">
                            <label
                              htmlFor="levelofeducation"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Education Level{" "}
                            </label>
                            <Controller
                              name="levelofeducation"
                              control={control}
                              render={({ field }) => (
                                <select
                                  {...field}
                                  id="levelofeducation"
                                  className="block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                >
                                  <option value="">
                                    Select Level of Education
                                  </option>
                                  <option value={LevelofeducationEnum.None}>
                                    None
                                  </option>
                                  <option value={LevelofeducationEnum.Primary}>
                                    Primary
                                  </option>
                                  <option
                                    value={LevelofeducationEnum.Secondary}
                                  >
                                    Secondary
                                  </option>
                                  <option value={LevelofeducationEnum.Degree}>
                                    Degree
                                  </option>
                                </select>
                              )}
                            />
                            {errors.levelofeducation && (
                              <p className="text-red-500 text-sm">
                                {errors.levelofeducation.message}
                              </p>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-2">
                          <div className="space-y-2">
                            <label
                              htmlFor="created"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Reg Date{" "}
                            </label>
                            <Controller
                              name="created"
                              control={control}
                              render={({ field }) => (
                                <input
                                  {...field}
                                  id="created"
                                  type="text"
                                  placeholder="Enter Date"
                                  className="block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                />
                              )}
                            />
                            {errors.created && (
                              <p className="text-red-500 text-sm">
                                {errors.created.message}
                              </p>
                            )}
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
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
          onClick={() => fetchUsers()} // Explicitly calls fetchItems
          className="flex items-center space-x-1 text-blue-500 hover:text-blue-700"
        >
          <RefreshCwIcon className="w-5 h-5" />
          <span>Refresh Users</span>
        </button>

        <ViewFoodDialog
          open={isVModalOpen}
          onOpenChange={() => setIsVModalOpen(false)}
          userSelected={itemSelected}
        />

        {/* editFoodDialog start   // onSubmit={handleSubmit(onSubmit)}  */}
        <Dialog open={isEModalOpen} onOpenChange={setisEModalOpen}>
          <DialogContent>
            <DialogTitle>Edit ItemResponse</DialogTitle>
            <DialogDescription>
              Fill in the details below to edit user.
            </DialogDescription>

            <form
              onSubmit={handleSubmit((data) => {
                if (itemSelected?.id) {
                  onSubmitEdit(itemSelected.id, data);
                } else {
                  console.error("Item ID is missing.");
                  toast.error("Failed to identify the item to update.");
                }
              })}
              className="space-y-6"
            >
              <div className="space-y-2">
                <label
                  htmlFor="fullname"
                  className="block text-sm font-medium text-gray-700"
                >
                  User Full Name
                </label>
                <Controller
                  name="fullname"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      id="fullname"
                      type="text"
                      placeholder="Enter Full Name"
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
                  User Role
                </label>
                <Controller
                  name="urole"
                  control={control}
                  render={({ field }) => (
                    <select
                      {...field}
                      id="urole"
                      className="block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    >
                      {Object.values(UroleEnum).map((role) => (
                        <option key={role} value={role}>
                          {role}
                        </option>
                      ))}
                    </select>
                  )}
                />
                {/* <Controller
                  name="urole"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      id="description"
                      type="text"
                      placeholder="Enter Description"
                      className="block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  )}
                /> */}
                {errors.urole && (
                  <p className="text-red-500 text-sm">{errors.urole.message}</p>
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
            onClick={() => fetchUsers()} // Explicitly calls fetchItems
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
