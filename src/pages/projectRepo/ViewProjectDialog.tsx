import { Project } from "@/components/types/tProject";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogProps } from "@radix-ui/react-dialog";

type Props = DialogProps & {
  projectSelected?: Project;
};

const ViewProjectDialog = ({ onOpenChange, open, ...props }: Props) => {
  const handleClose = () => {
    onOpenChange?.(false);
    // setIsModalOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogTitle>Project Information</DialogTitle>
        <DialogDescription>
          These are details for the selected Project {props.projectSelected?.projectName}.
        </DialogDescription>
        <div>
          <Card>
            <div className="flex flex-1 flex-col gap-4 p-4 pt-2">
              <div className="grid auto-rows-min gap-4 md:grid-cols-2">
                <div className="aspect-video rounded-xl bg-muted/50">
                  <CardHeader>
                    <CardTitle>Card Title:  {props.projectSelected?.projectClient}</CardTitle>
                    <CardDescription>Project Category: {props.projectSelected?.status}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>{props.projectSelected?.endDate}</p>
                  </CardContent>
                  <CardFooter>
                    <p>Project status:{props.projectSelected?.startDate}</p>
                  </CardFooter>
                </div>
                <div className="aspect-video rounded-xl bg-muted/50">
                  <CardContent>
                  {/* <img src={props.projectSelected?.image} alt='Image' style={{ width: '100%', height: 'auto' }} /> */}
                  </CardContent>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewProjectDialog;
