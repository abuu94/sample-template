import NewTable from "@/components/layout/NewTable";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useUsers } from "@/hooks/useUsers";
import { UserRequest, UserResponse } from "@/typesSection/tUser";
import { zodResolver } from "@hookform/resolvers/zod";
import { ColumnDef } from "@tanstack/react-table";
import { create } from "domain";
import {
  EditIcon,
  PlusIcon,
  RefreshCwIcon,
  TrashIcon,
  ViewIcon,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { data } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";

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

// fullname,username,pwd,created,urole,status,
// phonenumber,picture, region,street, levelofeducation,income,email, disability

const formSchema = z.object({
  fullname: z
    .string()
    .min(2, { message: "Fullname  must be at least 2 characters." }),
  username: z
    .string()
    .min(2, { message: "Username  must be at least 2 characters." }),
  pwd: z.string().min(1, { message: "Password is required" }),
  created: z.string().optional(),
  urole: z.enum([UroleEnum.Admin, UroleEnum.Supporter, UroleEnum.Guest]),
  status: z.enum([
    StatusEnum.Active,
    StatusEnum.Suspended,
    StatusEnum.Pending,
    StatusEnum.Disabled,
  ]),
  phonenumber: z.string().optional(),
  picture: z.string().optional(),
  region: z.string().optional(),
  street: z.string().optional(),
  levelofeducation: z.enum([
    LevelofeducationEnum.Primary,
    LevelofeducationEnum.Secondary,
    LevelofeducationEnum.Degree,
    LevelofeducationEnum.Postgraduate,
    LevelofeducationEnum.None,
  ]),
  income: z.enum([
    IncomeEnum.Below_1000_tsh,
    IncomeEnum.Below_10000_tsh,
    IncomeEnum.Below_30000_tsh,
  ]),
  email: z.string().email("Invalid email address"),
  disability: z.string().optional(),
});

type FormSchema = z.infer<typeof formSchema>;

export default function TestPage() {
  const {
    users,
    loading,
    error,
    fetchUsers,
    createUser,
    fetchUserById,
    updateUserDetails,
    removeUser,
  } = useUsers();

  const columns = useMemo<ColumnDef<UserResponse>[]>(
    () => [
      {
        header: "ID",
        accessorKey: "id",
        // cell: ({ row }) => <span>{row.index + 1}</span>, // Display row index as ID
      },
      {
        accessorKey: "fullname",
        header: "Fullname",
        // cell: (info) => info.getValue(),
      },
      {
        accessorKey: "username",
        header: "Username",
        // cell: (info) => info.getValue(),
      },
      {
        header: "Picture",
        accessorKey: "picture",
      },
      {
        accessorKey: "urole",
        header: "Role",
        // cell: (info) => info.getValue(),
      },
      {
        accessorKey: "status",
        header: "Status",
        // cell: (info) => info.getValue(),
      },
      {
        header: "Actions",
        accessorKey: "actions",
        cell: ({ row }) => (
          <div className="flex space-x-2">
            <button
              //   onClick={() => handleView(row.original)}
              className="text-blue-500 hover:text-blue-700"
            >
              <ViewIcon className="w-5 h-5" />
            </button>
            <button
              //   onClick={() => handleEdit(row.original)}
              className="text-blue-500 hover:text-blue-700"
            >
              <EditIcon className="w-5 h-5" />
            </button>
            <button
              //   onClick={() => handleDelete(row.original.id || 0)}
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
  const [filteredUser, setFilteredUser] = useState<UserResponse[]>([]);
  const [userSelected, setuserSelected] = useState<UserResponse>();
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isVUserModalOpen, setIsVUserModalOpen] = useState(false);
  const [isEUserModalOpen, setisEUserModalOpen] = useState(false);

  // Handle filtering based on search input
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    setSearch(searchValue);

    const filtered = users.filter((user) =>
      Object.values(user).some((value) =>
        String(value).toLowerCase().includes(searchValue.toLowerCase())
      )
    );
    setFilteredUser(filtered);
  };

  const {
    control,
    handleSubmit,
    formState: { errors, defaultValues },
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
      created: new Date().toISOString(),
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

  //   console.log(errors);
  //   console.log(defaultValues);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // Get the selected file
    
    if (file) {
      const reader = new FileReader();
      
      reader.onloadend = () => {
        const base64String = reader.result; // Convert file to Base64 string
        setValue("picture", base64String as string); // Set the Base64 string in the form state
        console.log("File selected:", base64String); // Log the Base64 string for debugging
      };
      reader.readAsDataURL(file)
    } else {
      console.error("No file selected.");
    }

  };
  const onSubmit = async (data: FormSchema) => {
    console.log(data);
    // console.log("clicked");

    try {
      const response = await createUser(data);
      if (response && response.success === true) {
        reset();
        setIsUserModalOpen(false);
        fetchUsers();
        toast.success("Item created successfully!");
      } else {
        toast.error("Failed to create item. Please try again.");
        reset();
        setIsUserModalOpen(false);
      }
    } catch (error) {
      console.error("Error creating item:", error);
      toast.error("An error occurred. Please try again."); // Show error toast
    }
  };

  return (
    <>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-2">
        <div className="App p-4">
          <Card title="User Table">
            <CardHeader className="flex justify-between items-left"></CardHeader>
            <CardContent>
              <div className="flex justify-end space-x-2 mb-0">
                <input
                  type="text"
                  placeholder="Search..."
                  value={search}
                  onChange={handleSearchChange}
                  className="border border-gray-300 rounded-md p-2"
                />

                <Dialog
                  open={isUserModalOpen}
                  onOpenChange={setIsUserModalOpen}
                >
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
                      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                         <div className="grid grid-cols-3 gap-4">
                           {/* First Column */}
                           <div className="space-y-2">
                             <label
                               htmlFor="fullname"
                               className="block text-sm font-medium text-gray-700"
                             >
                               Name{" "}
                             </label>
                             <Controller
                               name="fullname"
                               control={control}
                               defaultValue=""
                               render={({ field }) => (
                                 <input
                                   {...field}
                                   id="fullname"
                                   type="text"
                                   placeholder="Enter fullname"
                                   className="block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                 />
                               )}
                             />
                             {errors.fullname && (
                               <p className="text-red-500 text-sm">{errors.fullname.message}</p>
                             )}
                           </div>
                   
                           {/* Second Column */}
                           <div className="space-y-2">
                             <label htmlFor="pwd" className="block text-sm font-medium text-gray-700">
                               Password{" "}
                             </label>
                             <Controller
                               name="pwd"
                               control={control}
                               defaultValue=""
                               render={({ field }) => (
                                 <input
                                   {...field}
                                   id="pwd"
                                   type="password"
                                   placeholder="Enter password"
                                   className="block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                 />
                               )}
                             />
                             {errors.pwd && (
                               <p className="text-red-500 text-sm">{errors.pwd.message}</p>
                             )}
                           </div>
                   
                           {/* Third Column */}
                           <div className="space-y-2">
                             <label
                               htmlFor="username"
                               className="block text-sm font-medium text-gray-700"
                             >
                               Username{" "}
                             </label>
                             <Controller
                               name="username"
                               control={control}
                               defaultValue=""
                               render={({ field }) => (
                                 <input
                                   {...field}
                                   id="username"
                                   type="text"
                                   placeholder="Enter username"
                                   className="block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                 />
                               )}
                             />
                             {errors.username && (
                               <p className="text-red-500 text-sm">{errors.username.message}</p>
                             )}
                           </div>
                   
                           {/* Additional Column */}
                           <div className="space-y-2">
                             <label
                               htmlFor="email"
                               className="block text-sm font-medium text-gray-700"
                             >
                               Email{" "}
                             </label>
                             <Controller
                               name="email"
                               control={control}
                               defaultValue=""
                               render={({ field }) => (
                                 <input
                                   {...field}
                                   id="email"
                                   type="email"
                                   placeholder="Enter email"
                                   className="block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                 />
                               )}
                             />
                             {errors.email && (
                               <p className="text-red-500 text-sm">{errors.email.message}</p>
                             )}
                           </div>
                         </div>
                   
                         {/* File Upload */}
                         <div className="space-y-2">
                           <label
                             htmlFor="picture"
                             className="block text-sm font-medium text-gray-700"
                           >
                             Picture
                           </label>
                           <input
                             name="picture"
                             id="picture"
                             type="file"
                             accept="image/*"
                             className="block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                             onChange={handleFileChange} // Handle file selection
                           />
                           {errors.picture && (
                             <p className="text-red-500 text-sm">{errors.picture.message}</p>
                           )}
                         </div>
                   
                         {/* Buttons */}
                         <div className="flex justify-end space-x-4 mt-6">
                           <button
                             type="button"
                             className="bg-gray-500 text-white rounded-md px-4 py-2"
                             onClick={() => console.log("Cancel clicked")} // Replace with your cancel logic
                           >
                             Cancel
                           </button>
                           <button
                             type="submit"
                             className="bg-blue-500 text-white rounded-md px-4 py-2"
                           >
                             Save
                           </button>
                         </div>
                       </form>
                    
                  </DialogContent>
                </Dialog>
                <button
                  onClick={() => fetchUsers()} // Explicitly calls fetchItems
                  className="flex users-center space-x-1 text-blue-500 hover:text-blue-700"
                >
                  <RefreshCwIcon className="w-5 h-5" />
                  <span>Refresh Users</span>
                </button>
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
                  data={filteredUser.length ? filteredUser : users}
                />
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* hapa */}
    </>
  );
}
