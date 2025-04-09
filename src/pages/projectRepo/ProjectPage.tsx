import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";


import ProjectsDatatable from "./ProjectsDatatable";

export default function projectPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-2">
      <div className="App p-4">
        <Card title="User Table">
          <CardHeader className="flex justify-between items-left"></CardHeader>
          <CardContent>
            <ProjectsDatatable />
          </CardContent>
        </Card>
      </div>
      <div className="App p-4">
        {/* <Sheet>
          <SheetTrigger>Open</SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle> Ekamisheni Project Team :</SheetTitle>
              <SheetDescription>
                <div className="container mx-auto p-4 flex flex-col">
                  <div className="grid gap-4 grid-cols-1 md:grid-cols-1 lg:grid-cols-1">
                    <ProjectTeam />
                    <div className="border-t border-gray-300 my-4"></div>
                    <ProjectStage />
                  </div>
                </div>
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet> */}
      </div>
    </div>
  );
}








