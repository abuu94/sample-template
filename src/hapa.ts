import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
// import Table from "./components/layout/Table";
import { useEffect, useMemo, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
// import NewTable from "./components/layout/NewTable";
import NewTableSearchAdded from "./components/layout/NewTableSearchAdded";
import { Card, CardContent, CardHeader } from "./components/ui/card";
import "./App.css";
import React from "react";
import { PlusIcon } from "lucide-react";
import { Food } from "./typesSection/tFood";
import { getFoods } from "./serviceSection/food-service";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
// import AddFoodForm from "./FoodMaterial/AddFoodForm";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { z } from "zod";
import axios from "axios";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  category: z.string().min(2, {
    message: "Category must be at least 2 characters.",
  }),
  calories: z.string().min(1, {
    message: "Calories must be at least 1.",
  }),
});

type FormSchema = z.infer<typeof formSchema>;

export default function AppFoodWithForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });

  //   const handleClose = () => {
  //     onClose();
  //   };

  const onSubmit: SubmitHandler<FormSchema> = async (data) => {
    try {
      await axios.post("http://localhost:3000/foods", data);
      console.log("Food added:", data);
      toast.success("Food added successfully");
      handleClose();
    } catch (error) {
      console.error("Error adding food:", error);
      toast.error("Error adding food");
    }
  };

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
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getFoods().then((foods) => {
      const foodsWithId = foods.map((food, index) => ({
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

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <ToastContainer />
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="#">
                      Building Your Application
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>

          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
              <div className="App p-4">
                <Card title="User Table">
                  <CardHeader className="flex justify-between items-center">
                    <div className="ml-auto flex space-x-2">
                      <input
                        type="text"
                        placeholder="Search..."
                        value={search}
                        onChange={handleSearchChange}
                        className="border border-gray-300 rounded-md p-2"
                      />
                      <Dialog>
                        <DialogTrigger asChild>
                          <button className="flex bg-blue-500 text-white rounded-md px-4 py-2">
                            Add Food <PlusIcon className="ml-2" />
                          </button>
                        </DialogTrigger>

                        <DialogContent>
                          <DialogTitle>Add New Food</DialogTitle>
                          <DialogDescription>
                            Fill in the details below to add a new food item.
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
                                    type="number"
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
                            <div className="space-y-2">
                              <button
                                type="submit"
                                className="  w-full mt-4 bg-blue-500 text-white rounded-md px-4 py-2"
                                onClick={handleClose}
                              >
                                {/* ifanye modal dialog ijifunge na table page ijiresresh */}
                                Add Food
                              </button>
                            </div>

                          
                          </form>
                          <DialogClose asChild>
                            <button className="mt-4 bg-gray-500 text-white rounded-md px-2 py-2">
                              Close
                            </button>
                          </DialogClose>
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

                {/* <AddUserModal 
              isOpen={isModalOpen}
              onClose={()=>setIsModalOpen(false)}
              onAddUser={handleAddUser}
              /> */}
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}