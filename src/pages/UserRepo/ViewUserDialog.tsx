import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { ItemRequest } from "@/typesSection/tItem";
import { UserRequest } from "@/typesSection/tUser";
import { DialogProps } from "@radix-ui/react-dialog";

type Props = DialogProps & {
  userSelected?: UserRequest;
};

const ViewUserDialog = ({ onOpenChange, open, ...props }: Props) => {
  const handleClose = () => {
    onOpenChange?.(false);
    // setIsModalOpen(false);
  };



  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl w-full">
        {" "}
        {/* Adjust the size here */}
        <DialogTitle>
          <div
            className="bg-blue-500 text-white text-sm font-medium px-4 py-3 rounded-md"
            role="alert"
          >
            Item Information
          </div>
        </DialogTitle>
        <DialogDescription>
          These are details for the selected Item{" "}
          {props.userSelected?.fullname || "N/A"}.
        </DialogDescription>
        <div className="w-full p-4">
          <div className="overflow-x-auto">
            <table
              className="w-full table-auto border border-gray-300 shadow-md rounded-md"
              aria-label="Item Information Table"
            >
              <thead>
                <tr className="bg-blue-500 text-white">
                  <th className="px-4 py-2 text-left text-sm font-medium">
                    Name
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium">
                    Description
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium">
                    Price
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium">
                    Quantity
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium">
                    Registration
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="odd:bg-gray-100 even:bg-gray-200 hover:bg-gray-300">
                  <td className="px-4 py-2">
                    {props.userSelected?.fullname || "N/A"}
                  </td>
                  <td className="px-4 py-2">
                    {props.userSelected?.urole || "N/A"}
                  </td>
                  <td className="px-4 py-2">
                    {props.userSelected?.fullname || "N/A"}
                  </td>
                  <td className="px-4 py-2">
                    {props.userSelected?.urole || "N/A"}
                  </td>
                  <td className="px-4 py-2">
                    {props.userSelected?.fullname || "N/A"}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </DialogContent>
    </Dialog>

   
  );
};

export default ViewUserDialog;
