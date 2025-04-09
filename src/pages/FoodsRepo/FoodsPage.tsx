import AppFoodWithForm from "@/AppFoodWithForm";
import React from "react";
import { FoodsChart } from "./FoodsChart";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import FinishedFoodDatatable from "./FinishedFoodDatatable";

const FoodsPage: React.FC = () => {
  return (
    <>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-2">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                  <div className="aspect-video rounded-xl bg-muted/50">
                  <FoodsChart/>
                  </div>
                  <div className="aspect-video rounded-xl bg-muted/50" >
                  <FoodsChart/>
                  </div>
                  <div className="aspect-video rounded-xl bg-muted/50" >
                    <FoodsChart/>
                  </div>
           </div>
           <div className="min-h-screen bg-gray-100 flex flex-col pt-0">
        <div className="App p-4">
           <Card title="User Table">
                          <CardHeader className="flex justify-between items-left"></CardHeader>
                          <CardContent>
                            <FinishedFoodDatatable />
                          </CardContent>
                        </Card>
        
        </div>
        </div>

        {/* <AppFoodWithForm /> */}
      </div>
    </>
    // <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
    //   <h2 className="text-4xl font-bold text-gray-800 mb-4"> FoodsPage : All Foods</h2>
    //   <p className="text-lg text-gray-600 mb-8">Manage all foods here.</p>
    // </div>
  );
};

export default FoodsPage;
