import { Card, CardHeader, CardContent } from "@/components/ui/card";
import ProjectsReportDatatable from "./ProjectsReportDatatable";

const ProjectReport = () => {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-2">
      <div className="App p-4">
        <Card title="User Table">
          <CardHeader className="flex justify-between items-left"></CardHeader>
          <CardContent>
            <ProjectsReportDatatable />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
export default ProjectReport;
