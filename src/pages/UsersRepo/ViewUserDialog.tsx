import { User } from "@/components/types/tUser";
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
  userSelected?: User;
};

const ViewUserDialog = ({ onOpenChange, open, ...props }: Props) => {
  const handleClose = () => {
    onOpenChange?.(false);
    // setIsModalOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogTitle>User Information</DialogTitle>
        <DialogDescription>
          These are details for the selected User {props.userSelected?.firstName}.
        </DialogDescription>
        <div>
          <Card>
            <div className="flex flex-1 flex-col gap-4 p-4 pt-2">
              <div className="grid auto-rows-min gap-4 md:grid-cols-2">
                <div className="aspect-video rounded-xl bg-muted/50">
                  <CardHeader>
                    <CardTitle>Card Title:  {props.userSelected?.lastName}</CardTitle>
                    <CardDescription>User Category: {props.userSelected?.age}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>{props.userSelected?.status}</p>
                  </CardContent>
                  <CardFooter>
                    <p>User status:{props.userSelected?.status}</p>
                  </CardFooter>
                </div>
                <div className="aspect-video rounded-xl bg-muted/50">
                  <CardContent>
                  <img src={props.userSelected?.image} alt='Image' style={{ width: '100%', height: 'auto' }} />
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

export default ViewUserDialog;
