import React from "react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import FinishedFoodDatatable from "./FinishedFoodDatatable";

const FoodsPage: React.FC = () => {
  return (
    <>
    <div className="flex flex-1 flex-col gap-4 p-4 pt-2">
     
          <div className="App p-4">
            <Card title="Item Table">
              <CardHeader className="flex justify-between items-left"></CardHeader>
              <CardContent>
                <FinishedFoodDatatable />
              </CardContent>
            </Card>
          </div>
      </div>
    </>
  );
};
export default FoodsPage;
