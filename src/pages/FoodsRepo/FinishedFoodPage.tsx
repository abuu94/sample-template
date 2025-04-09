import { Card, CardHeader, CardContent } from "@/components/ui/card";
import React from "react";
import FinishedFoodDatatable from "./FinishedFoodDatatable";

const FinishedFoodPage: React.FC = () => {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-2">
      <div className="grid auto-rows-min gap-4 md:grid-cols-1">
        <div className="aspect-video rounded-xl bg-muted/50">
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
        </div>
        {/* <div className="aspect-video rounded-xl bg-muted/50">
          <div className="min-h-screen bg-gray-100 flex flex-col pt-0">
            <div className="App p-4">
              <Card title="User Table">
                <CardHeader className="flex justify-between items-left"></CardHeader>
                <CardContent>
                  <OrderedFoodDatatable />
                </CardContent>
              </Card>
            </div>
          </div>
        </div> */}
      </div>

   
    </div>
  );
};

export default FinishedFoodPage;
