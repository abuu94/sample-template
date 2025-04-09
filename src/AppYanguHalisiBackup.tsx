// // import { useState } from 'react'
// // import reactLogo from './assets/react.svg'
// // import viteLogo from '/vite.svg'
// import './App.css'
// import { Button } from './components/ui/button'

// function App() {
//   // const [count, setCount] = useState(0)

//   return (
//     <>
//       {/* <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div> */}
//       <h1>Vite + React</h1>
//       <div className="card">
//         {/* <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button> */}
//         <p>
//           Edit <code>src/App.tsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>

//       <Button>Click me</Button>
//     </>
//   )
// }

// export default App

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
import { getUsers } from "./components/service/user-service";
import { ColumnDef } from "@tanstack/react-table";
// import NewTable from "./components/layout/NewTable";
import NewTableSearchAdded from "./components/layout/NewTableSearchAdded";
import { User } from "./components/types/tUser";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./components/ui/card";
import  "./App.css";
// type User = {
//   id: string;
//   firstName: string;
//   lastName: string;
//   age: number;
//   visits: number;
//   progress: number;
//   status: string;
// };

export default function App() {
  const columns = useMemo<ColumnDef<User>[]>(
    () => [
      {
        header: "ID",
        accessorFn: (_, index) => index + 1,
        // accessorKey: 'id',
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

  const [user, setUser] = useState([]);
  useEffect(() => {
    getUsers().then((res) => {
      console.log(res);
      setUser(res);
    });
  }, []);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
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
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
          </div>
          {/* <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" /> */}

          {/* <Table columns={columns}  data={user} /> */}
          {/* <NewTable columns={columns}  data={user} /> */}

          {/* <NewTableSearchAdded columns={columns}  data={user} /> */}

          <div className="App p-4">
            {/* <h1 className="text-2xl font-bold mb-4">My Table</h1> */}
              <Card title="User Table" >
                <CardHeader>
                  <CardTitle>Card Title</CardTitle>
                  <CardDescription>Card Description</CardDescription>
                </CardHeader>
                <CardContent>
                <NewTableSearchAdded columns={columns} data={user} />
                </CardContent>
                <CardFooter>
                  <p>Card Footer</p>
                </CardFooter>
              </Card> 
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
