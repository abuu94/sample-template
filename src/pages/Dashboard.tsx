import React from "react";
import { FoodsChart } from "./FoodsRepo/FoodsChart";
// import { User } from "lucide-react";
import { UsersChart } from "./UsersRepo/UsersChart";
import { AreaChartComponent } from "./ChartRepo/AreaChart";
import { BarChartComponent } from "./ChartRepo/BarChart";
import { LineChartComponent } from "./ChartRepo/LineChart";
import { Pie } from "recharts";
import { PieChartComponent } from "./ChartRepo/PieChart";
import { RadalChartComponent } from "./ChartRepo/RadarChart";
import { RadialChartComponent } from "./ChartRepo/RadialChart";
import { TooltipChartComponent } from "./ChartRepo/TooltipChat";
// import { useNavigate } from "react-router-dom";

const Dashboard: React.FC = () => {
  // const Navigate = useNavigate();

  return (
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
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="aspect-video rounded-xl bg-muted/50">
        <AreaChartComponent/>
        </div>
        <div className="aspect-video rounded-xl bg-muted/50" >
        <BarChartComponent/>
        </div>
        <div className="aspect-video rounded-xl bg-muted/50" >
          <LineChartComponent/>
        </div>
      </div>
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="aspect-video rounded-xl bg-muted/50">
            <PieChartComponent/>
        </div>
        <div className="aspect-video rounded-xl bg-muted/50" >
            <RadalChartComponent/>
        </div>
        <div className="aspect-video rounded-xl bg-muted/50" >
          <RadialChartComponent/>
        </div>
      </div>
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
      <div className="min-h-screen bg-gray-100 flex flex-col pt-0">
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            ShadCn Dashboard
          </h2>
          <p className="text-lg text-gray-600 mb-8">Manage admins here.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
