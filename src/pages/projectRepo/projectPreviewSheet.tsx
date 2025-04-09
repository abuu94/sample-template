import { Project } from "@/components/types/tProject";
import { SheetContent, SheetHeader, SheetTitle, SheetDescription, Sheet } from "@/components/ui/sheet";
import { DialogProps } from "@radix-ui/react-dialog";
import ProjectTeam from "./ProjectTeam";
import ProjectStage from "./ProjectStage";


type Props = DialogProps & {
    projectSelected?: Project;
  };

const ProjectPreviewSheet =({ onOpenChange, open, ...props }: Props)=> {
  return (
     <Sheet open={open} onOpenChange={onOpenChange}>

          <SheetContent>
            <SheetHeader>
              <SheetTitle>{props.projectSelected?.projectName}:</SheetTitle>
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
        </Sheet> 
      
  );
};
export default ProjectPreviewSheet;
