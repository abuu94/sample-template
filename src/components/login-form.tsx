import image from "@/assets/supportSphereLogo.png";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusIcon } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { useItems } from "@/hooks/useItems"; // Use the hook instead of directly importing fetchItems

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name  must be at least 2 characters.",
  }),
  description: z.string().min(2, {
    message: "Description must be at least 2 characters.",
  }),
  price: z.coerce.number().positive(),
  quantity: z.coerce.number().int().positive(),
  is_registered: z.coerce.boolean(),
});

type FormSchema = z.infer<typeof formSchema>;
export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const Navigate = useNavigate();

  const { fetchItems, createItem } = useItems();
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
      description: "",
      price: 0,
      is_registered: false,
      quantity: 0,
    },
  });

  const onSubmitAdd = async (data: FormSchema) => {
    try {
      const response = await createItem(data); // Assume createItem returns a response object
      // if (response?.success)  // Check success from the response

      if (response && response.success === true) {
        // Check success from the response
        reset(); // Reset the form after successful submission
        setIsModalOpen(false); // Close the modal after submission
        fetchItems(); // Fetch items again to update the list
        toast.success("Item created successfully!"); // Show success message
      } else {
        toast.error("Failed to create item. Please try again."); // Show error toast
        reset(); // Reset the form even if creation fails
        setIsModalOpen(false); // Close the modal after submission
      }
    } catch (error) {
      console.error("Error creating item:", error);
      toast.error("An error occurred. Please try again."); // Show error toast
    }
  };
  return (
    <div className="relative min-h-screen flex flex-col items-center py-36 px-1 sm:px-8 bg-cover bg-center">
      <div className="absolute inset-0"></div>

      <div className="relative z-10 w-full sm:w-[90%] md:w-[800px]">
        <div className="w-full h-auto md:h-[400px] flex flex-col md:flex-row bg-gray-50 shadow-lg border-4 rounded-lg overflow-hidden">
          <div className="hidden md:flex w-1/2 h-full bg-white">
            <div className="flex flex-col w-full h-full flex items-center justify-center bg-green-50">
              <form className="w-full flex flex-col items-center justify-center p-6">
                <h2 className="text-2xl font-bold mb-4">
                  Welcome to HR-AI Portal
                </h2>
                <div className="mb-4 w-full">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Username
                  </label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                    placeholder="Enter your username"
                  />
                </div>
                <div className="mb-4 w-full">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                    placeholder="Enter your password"
                  />
                </div>
                <div className="mb-4 w-full">
                  <button
                    type="submit"
                    onClick={(e) => {
                      e.preventDefault();
                      if (username && password) {
                        Navigate("/dashboard");
                      } else {
                        setMessage("Please fill in all fields.");
                      }
                    }}
                    className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-200"
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="w-full md:w-1/2 h-full flex flex-col justify-center p-6 bg-white">
            <div className="flex flex-col items-center mb-4">
              <img
                src={image}
                alt="Logo"
                className="w-24 sm:w-28 h-auto object-contain mb-3"
              />
              <h3 className="text-lg sm:text-xl font-semibold">HR-AI Portal</h3>
            </div>

            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogTrigger asChild>
                <p className="text-center mt-3 text-sm text-gray-600 hover:underline cursor-pointer">
                  Need to be Registered? Start here
                </p>
              </DialogTrigger>
              <DialogContent>
                <DialogTitle>User Registration</DialogTitle>
                <DialogDescription>
                  Fill in the details below to register a new account.
                </DialogDescription>
                <form
                  onSubmit={handleSubmit(onSubmitAdd)}
                  className="grid grid-cols-2 gap-4"
                >
                  <div className="space-y-2">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Name{" "}
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
                      <p className="text-red-500 text-sm">
                        {errors.name.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Description{" "}
                    </label>
                    <Controller
                      name="description"
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
                    />
                    {errors.description && (
                      <p className="text-red-500 text-sm">
                        {errors.description.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="price"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Price{" "}
                    </label>
                    <Controller
                      name="price"
                      control={control}
                      render={({ field }) => (
                        <input
                          {...field}
                          id="price"
                          type="number"
                          placeholder="Tsh 0.00"
                          className="block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                      )}
                    />
                    {errors.price && (
                      <p className="text-red-500 text-sm">
                        {errors.price.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="quantity"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Quantity{" "}
                    </label>
                    <Controller
                      name="quantity"
                      control={control}
                      render={({ field }) => (
                        <input
                          {...field}
                          id="quantity"
                          type="number"
                          placeholder="0"
                          className="block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                      )}
                    />
                    {errors.quantity && (
                      <p className="text-red-500 text-sm">
                        {errors.quantity.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="is_registered"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Registered{" "}
                    </label>
                    <Controller
                      name="is_registered"
                      control={control}
                      render={({ field }) => (
                        <select
                          id="is_registered"
                          className="block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        >
                          <option>Choose..</option>
                          <option value="true">True</option>
                          <option value="false">False</option>
                        </select>
                      )}
                    />
                    {errors.is_registered && (
                      <p className="text-red-500 text-sm">
                        {errors.is_registered.message}
                      </p>
                    )}
                  </div>

                  <div className="col-span-2 flex justify-end space-x-2 mt-4">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)} // Close the modal without submitting
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
        </div>
      </div>

      <div className="relative z-10 text-center mt-6 font-semibold text-slate-500 text-sm sm:text-base">
        <h4>Copyright © , Developed & Maintained by Vema Academy Team</h4>
      </div>
    </div>
  );
}
