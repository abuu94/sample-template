import { DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { ItemResponse } from "@/typesSection/tItem";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { ColumnDef, PaginationState } from "@tanstack/react-table";
import { set } from "date-fns";
import { Edit, Ellipsis, View } from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ItemDatatable() {
    const title: string = "Items List";

    const columns = useMemo<ColumnDef<ItemResponse>[]>(
        ()=>[
            {
                header: "ID",
                accessorKey: "id",
            },{
                header: "Name",
                cell:({row})=><div>{row.original.name}</div>,
            },{
                header: "Description",
                cell:({row})=><div>{row.original.name}</div>,
            },{
                header: "Price",
                cell:({row})=><div>{row.original.price}</div>,
            },{
                header: "Quantity",
                cell:({row})=><div>{row.original.quantity}</div>,
            },{
                header: "Registered",
                cell:({row})=><div>{row.original.is_registered}</div>,
            },
            {
                header: "Actions",
                cell:({row})=>(
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Ellipsis role="button"/>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                            <DropdownMenuLabel> Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                                <DropdownMenuItem  onClick={()=>navigate(`/itemInfo/${row.original.id}`)}>
                                    <View/> <span className="ml-2">View</span>
                                </DropdownMenuItem>
                                <button  onClick={()=>formValueControl(row.original)} className="w-full text-left cursor-pointer px-2 py-1 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md">
                                    <DropdownMenuItem>
                                        <Edit/> <span className="ml-2">Edit</span>
                                    </DropdownMenuItem>
                                </button>
                                {/* <DropdownMenuItem className="cursor-pointer" onClick={()=>{}}>
                                    Delete
                                </DropdownMenuItem> */}
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                ),

            },
        ]

    );

const navigate = useNavigate();
const [open,setOpen]= useState(false);
const [selected,setSelected]= useState<ItemResponse |null>(null);

const formValueControl = (value:ItemResponse)=>{
    setOpen(true);
    setSelected(value);
};

const {pagination, setPagination} =  useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
});

const {data,isFetching} = getAllItems(pagination);
const [globalFilter,setGlobalFilter] = useState("");

if (isFetching)
return (
    <>
      <div className="flex justify-end space-x-2 mb-0">
    
      </div>
    </>
  );
}
