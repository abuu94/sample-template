// import AppFoodWithForm from '@/AppFoodWithForm';
import React from "react";
import { OrderedFoodsChart } from "./OrderedFoodsChart";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import Table from "@/components/layout/Table";
import OrderedFoodDatatable from "./OrderedFoodDatatable";

const OrderedFoodPage: React.FC = () => {
  return (
    // <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
    //   <h2 className="text-4xl font-bold text-gray-800 mb-4">OrderedFoodPage</h2>
    //   <p className="text-lg text-gray-600 mb-8">This is OrderedFoodPage here.</p>

    // </div>

    <>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-2">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <div className="aspect-video rounded-xl bg-muted/50">
            <OrderedFoodsChart />
          </div>
          <div className="aspect-video rounded-xl bg-muted/50">
            <OrderedFoodsChart />
          </div>
          <div className="aspect-video rounded-xl bg-muted/50">
            <OrderedFoodsChart />
          </div>
        </div>

        <div className="min-h-screen bg-gray-100 flex flex-col pt-0">
        <div className="App p-4">
        <Card title="User Table">
                  <CardHeader className="flex justify-between items-left">
                  
                          
                        {/* <div className="flex justify-end space-x-2 mb-0">
                            <input
                              type="text"
                              placeholder="Search..."
                              value={search}
                              onChange={handleSearchChange}
                              className="border border-gray-300 rounded-md p-2"
                            />
                            <Dialog
                              open={isModalOpen}
                              onOpenChange={setIsModalOpen}
                            >
                              <DialogTrigger asChild>
                                <button className="flex bg-blue-500 text-white rounded-md px-4 py-2">
                                  Add Food <PlusIcon className="ml-2" />
                                </button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogTitle>Add New Food</DialogTitle>
                                <DialogDescription>
                                  Fill in the details below to add a new food
                                  item.
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
                          </div> */}
                   
                  </CardHeader>
                  <CardContent>
                  <OrderedFoodDatatable/>
                  </CardContent>
                </Card>
        
        </div>
         
        
         
        </div>
        

        {/* <div className="min-h-screen bg-gray-100 flex flex-col pt-0">
          <div className="container mx-auto p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-4xl font-bold text-gray-800 mb-4">
                    ShadCn Dashboard 1
                  </CardTitle>
                  <CardDescription className="text-lg text-gray-600 mb-8">
                    Manage admins here.
                  </CardDescription>
                  <CardContent>
                    <OrderedFoodDatatable />
                  </CardContent>
                </CardHeader>
                <CardContent>
                  <p>Additional content for Dashboard 1 can go here.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-4xl font-bold text-gray-800 mb-4">
                    ShadCn Dashboard 2
                  </CardTitle>
                  <CardDescription className="text-lg text-gray-600 mb-8">
                    Manage admins here.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Additional content for Dashboard 2 can go here.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default OrderedFoodPage;



 <div className="flex justify-end space-x-2 mb-0">
                            <input
                              type="text"
                              placeholder="Search..."
                              value={search}
                              onChange={handleSearchChange}
                              className="border border-gray-300 rounded-md p-2"
                            />
                          
                          </div> 
