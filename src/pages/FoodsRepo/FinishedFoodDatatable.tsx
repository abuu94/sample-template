import NewTable from "@/components/layout/NewTable";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useItems } from "@/hooks/useItems"; // Use the hook instead of directly importing fetchItems
import { ItemRequest, ItemResponse } from "@/typesSection/tItem";
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
import ViewFoodDialog from "./ViewFoodDialog";


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

export default function FinishedFoodDatatable() {
  const {
    items,
    loading,
    error,
    fetchItems,
    createItem,
    updateItem,
    removeItem,
  
  } = useItems();

  const columns = useMemo<ColumnDef<ItemResponse>[]>(
    () => [
      {
        header: "ID",
        // accessorKey: "id",
       
        cell: ({ row }) => <span>{row.index + 1}</span>, // Display row index as ID
      },
      {
        header: "Name",
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
  const [filteredData, setFilteredData] = useState<ItemResponse[]>([]);
  const [itemSelected, setitemSelected] = useState<ItemResponse>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVModalOpen, setIsVModalOpen] = useState(false);
  const [isEModalOpen, setisEModalOpen] = useState(false);
  // const [action, setAction] = useState("");
  // const [sorting, setSorting] = useState([
  //   { id: 'id', desc: false }, // Sort by 'name' column in ascending order
  // ]);
  

  // Handle filtering based on search input
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    setSearch(searchValue);

    const filtered = items.filter((item) =>
      Object.values(item).some((value) =>
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

  const onSubmitEdit = async (id: number, data: FormSchema) => {
    if (!id || !data) {
      console.error("Invalid ID or data provided.");
      toast.error("Failed to update item. Missing required data.");
      return; // Exit if validation fails
    }
    try {
      // Send updated data to the server via updateItem API
      const response = await updateItem(id, data); // Assume updateItem returns a response object

      if (response?.success) {
        // Success: Reset form, close modal, fetch updated items, and show success toast
        reset();
        setisEModalOpen(false);
        fetchItems(); // Optionally handle errors if this fetch fails
        toast.success("Item updated successfully!");
      } else {
        // Failure: Show error toast, but keep modal open for retry
        toast.error(
          response?.message || "Failed to update item. Please try again."
        );
      }
    } catch (error) {
      // Handle any unexpected errors during the update process
      console.error("Error updating item:", error);
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  const handleView = (item: ItemResponse) => {
    
    setitemSelected(item);
    setIsVModalOpen(true);
    console.log("View ItemResponse:", item);
  };

  const handleEdit = (item: ItemRequest) => {
    if (!item) {
      console.error("Invalid item provided.");
      toast.error("Failed to load item data for editing.");
      return;
    }
    // setAction("edit");
    setitemSelected(item);
    setisEModalOpen(true);
    setValue("name", item.name || ""),
      setValue("price", item.price || 0),
      setValue("quantity", item.quantity || 0),
      setValue("is_registered", item.is_registered || false),
      setValue("description", item.description || ""),
      console.log("Edit ItemResponse:", item);
  };

  const handleDelete = async (id: number) => {
    try {
      // Send updated data to the server via updateItem API
      const response = await removeItem(id); // Assume updateItem returns a response object

      if (response?.success) {
        // Success: Reset form, close modal, fetch updated items, and show success toast
        // reset();
        // setisEModalOpen(false);
        fetchItems(); // Optionally handle errors if this fetch fails
        toast.success("Item Deleted successfully!");
      } else {
        // Failure: Show error toast, but keep modal open for retry
        toast.error(
          response?.message || "Failed to delete item. Please try again."
        );
      }
    } catch (error) {
      // Handle any unexpected errors during the update process
      console.error("Error deleting item:", error);
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
              Add New Item <PlusIcon className="ml-2" />
            </button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Add New Item</DialogTitle>
            <DialogDescription>
              Fill in the details below to add a new Item.
            </DialogDescription>

            <form onSubmit={handleSubmit(onSubmitAdd)} className="space-y-6">
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
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
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
                  <p className="text-red-500 text-sm">{errors.price.message}</p>
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
                  Add Item
                </button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        <button
          onClick={() => fetchItems()} // Explicitly calls fetchItems
          className="flex items-center space-x-1 text-blue-500 hover:text-blue-700"
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
            <DialogTitle>Edit ItemResponse</DialogTitle>
            <DialogDescription>
              Fill in the details below to edit item.
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
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Item Name
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
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
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
                  Price
                </label>
                <Controller
                  name="price"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      id="price"
                      type="number"
                      placeholder="Enter Calories"
                      className="block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  )}
                />
                {errors.price && (
                  <p className="text-red-500 text-sm">{errors.price.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="quantity"
                  className="block text-sm font-medium text-gray-700"
                >
                  Quantity
                </label>
                <Controller
                  name="quantity"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      id="quantity"
                      type="number"
                      placeholder="Enter Quantity"
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
                      // {...field}
                      id="is_registered"
                     // defaultValue={itemSelected?.is_registered ? "true" : "false"}
                      defaultValue={itemSelected?.is_registered ? "true" : "false"}
                      // type="number"
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
            onClick={() => fetchItems()} // Explicitly calls fetchItems
            className="flex items-center space-x-1 text-blue-500 hover:text-blue-700 mt-2"
          >
            <RefreshCwIcon className="w-5 h-5" />
            <span>Retry</span>
          </button>
        </div>
      )}

      {!loading && !error && items.length === 0 && (
        <div className="text-center text-gray-500 mt-4">
          <div className="text-lg font-semibold">
            No data available to display.
          </div>
        </div>
      )}

      {!loading && !error && items.length > 0 && (
        <NewTable
          columns={columns}
          data={filteredData.length ? filteredData : items}
         
         
          
         
          
        />
      )}
    </>
  );
}
