import { Project } from "@/components/types/tProject";
import { Button } from "@/components/ui/button";
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
import { jsPDF } from 'jspdf';

type Props = DialogProps & {
  projectSelected?: Project;
};

const DownloadProjectReportDialog = ({ onOpenChange, open, ...props }: Props) => {
  const handleClose = () => {
    onOpenChange?.(false);
    // setIsModalOpen(false);
  };
 

  
  const handleOk = ()=> {
    return () => {
      const doc = new jsPDF();
      doc.text(props.projectSelected?.projectName!, 10, 10);
      doc.save('sample.pdf');
    };
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogTitle>Downloading Confirmation</DialogTitle>
        <DialogDescription>
          Click OK button to start downloading.
        </DialogDescription>
        <div>
          <Card>
            <div className="flex flex-1 flex-col gap-4 p-4 pt-2">
              <div className="grid auto-rows-min gap-4 md:grid-cols-1">
                <div className="aspect-video rounded-xl bg-muted/50">
                  <CardHeader>
                    <Button onClick={handleOk()}> Download Now ...</Button>
                    {/* <CardTitle>Card Title:  {props.projectSelected?.projectClient}</CardTitle>
                    <CardDescription>Project Category: {props.projectSelected?.status}</CardDescription> */}
                  </CardHeader>
                  <CardContent>
                    <p>Thank you for dwonloading the Report</p>
                  </CardContent>
                  <CardFooter>
                  <p>Downloading of :  {props.projectSelected?.projectName} is succeded</p>
                  </CardFooter>
                </div>
                
              </div>
            </div>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DownloadProjectReportDialog;
