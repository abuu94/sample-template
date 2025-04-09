import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
// import Table from "./components/layout/Table";
import { useEffect, useMemo, useState } from "react";
import { addUser, getUsers } from "./components/service/user-service";
import { ColumnDef } from "@tanstack/react-table";
// import NewTable from "./components/layout/NewTable";
import NewTableSearchAdded from "./components/layout/NewTableSearchAdded";
import { User } from "./components/types/tUser";
import {
  Card,
  CardContent,
  CardHeader,
} from "./components/ui/card";
import "./App.css";
import React from "react";
import { PlusIcon } from "lucide-react";
import AddUserModal from "./AddUserModal";

export default function App() {
  const columns = useMemo<ColumnDef<User>[]>(
    () => [
      {
        header: "ID",
        // accessorFn: (_, index) => index + 1,
        accessorKey: 'id',
      },
      {
        header: "First Name",
        accessorKey: "firstName",
      },
      {
        header: "Last Name",
        accessorKey: "lastName",
      },
      {
        header: "Age",
        accessorKey: "age",
      },
      {
        header: "Visits",
        accessorKey: "visits",
      },
      {
        header: "Progress",
        accessorKey: "progress",
      },
      {
        header: "Status",
        accessorKey: "status",
      },
    ],
    []
  );

  const [user, setUser] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState<User[]>([]);
  const [isModalOpen,setIsModalOpen] =useState(false);

  useEffect(() => {
    getUsers().then((users) => {
      const usersWithId = users.map((user, index) => ({ ...user, id: index + 1 }));
      setUser(usersWithId);
      setFilteredData(usersWithId);
    });
  }, []);

  useEffect(() => {
    setFilteredData(
      user.filter((user:User) =>
        Object.values(user).some((value) =>
          String(value).toLowerCase().includes(search.toLowerCase())
        )
      )
    );
  }, [search, user]);


  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleAddUser = async(newUser:User) => {
    // Logic for adding a new user
    const newUserWithId = {...newUser,id: (user.length+1).toString()};
    // const newUserWithId = {...newUser,id: (user.length+1)};
    await addUser(newUserWithId);
    setUser([...user,newUserWithId]);
    setFilteredData([...user,newUserWithId]);
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        {/* <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Building Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header> */}

        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          {/* <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
          </div> */}
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
            <div className="App p-4">
              <Card title="User Table">
               
                <CardHeader className="flex justify-between items-center">
                  <div className="ml-auto flex space-x-2">
                    <input
                      type="text"
                      placeholder="Search..."
                      value={search}
                      onChange={handleSearchChange}
                      className="border border-gray-300 rounded-md p-2"
                    />
                    <button
                      // onClick={handleAddUser}
                      onClick={()=>setIsModalOpen(true)}
                      // className="bg-blue-500 text-white rounded-md px-4 py-2"
                      className="flex bg-blue-500 text-white rounded-md px-4 py-2 "
                    >
                      Add User <PlusIcon/>
                    </button>
                  </div>
                </CardHeader>
                <CardContent>
                  <NewTableSearchAdded columns={columns} data={filteredData} />
                </CardContent>
              
              </Card>
              <AddUserModal 
              isOpen={isModalOpen}
              onClose={()=>setIsModalOpen(false)}
              onAddUser={handleAddUser}
              />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
