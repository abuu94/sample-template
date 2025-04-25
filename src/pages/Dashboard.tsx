import React from "react";
import { TooltipChartComponent } from "./ChartRepo/TooltipChat";
const Dashboard: React.FC = () => {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-2">  
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="aspect-video rounded-xl bg-muted/50">
            <TooltipChartComponent/>
        </div>
        <div className="aspect-video rounded-xl bg-muted/50" >
        <TooltipChartComponent/>
        </div>
        <div className="aspect-video rounded-xl bg-muted/50" >
        <TooltipChartComponent/>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
