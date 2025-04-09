import React from "react";

import {
  Card,
  CardHeader,
  CardContent,
} from "@/components/ui/card";


import AllUsersDatatable from "./AllUsersDatatable";
import { AdminsChart } from "./AdminsChart";
import { DevelopersChart } from "./DevelopersChart";
import { UsersChart } from "./UsersChart";

const UsersPage: React.FC = () => {
  return (
     <>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-2">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <div className="aspect-video rounded-xl bg-muted/50">
            <UsersChart />
          </div>
          <div className="aspect-video rounded-xl bg-muted/50">
            <AdminsChart />
          </div>
          <div className="aspect-video rounded-xl bg-muted/50">
            <DevelopersChart />
          </div>
        </div>

        <div className="min-h-screen bg-gray-100 flex flex-col pt-0">
        <div className="App p-4">
        <Card title="User Table">
                  <CardHeader className="flex justify-between items-left">
                   
                  </CardHeader>
                  <CardContent>
                  <AllUsersDatatable/>
                  </CardContent>
                </Card>
        </div>
        </div>
      </div>
    </>
  );
};

export default UsersPage;
