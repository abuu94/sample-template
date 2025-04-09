import { Food } from "@/components/types/tFood";
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
  foodSelected?: Food;
};

const ViewFoodDialog = ({ onOpenChange, open, ...props }: Props) => {
  const handleClose = () => {
    onOpenChange?.(false);
    // setIsModalOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogTitle>Food Information</DialogTitle>
        <DialogDescription>
          These are details for the selected food {props.foodSelected?.name}.
        </DialogDescription>
        <div>
          <Card>
            <div className="flex flex-1 flex-col gap-4 p-4 pt-2">
              <div className="grid auto-rows-min gap-4 md:grid-cols-2">
                <div className="aspect-video rounded-xl bg-muted/50">
                  <CardHeader>
                    <CardTitle>Card Title:  {props.foodSelected?.name}</CardTitle>
                    <CardDescription>Food Category: {props.foodSelected?.category}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>{props.foodSelected?.notes}</p>
                  </CardContent>
                  <CardFooter>
                    <p>Food Calories:{props.foodSelected?.calories}</p>
                  </CardFooter>
                </div>
                <div className="aspect-video rounded-xl bg-muted/50">
                  <CardContent>
                  <img src={props.foodSelected?.image} alt='Image' style={{ width: '100%', height: 'auto' }} />
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

export default ViewFoodDialog;
