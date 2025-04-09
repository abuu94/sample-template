import React, { useMemo, useState } from 'react';
import Card from './components/ui/Card';
import NewTableSearchAdded from './components/layout/NewTableSearchAdded';
import { ColumnDef } from '@tanstack/react-table';
import { User } from './components/types/tUser';
import { getUsers } from './components/service/user-service';
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './components/ui/card';

export default function App() {
  const columns = useMemo<ColumnDef<User>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
      },
      {
        accessorKey: 'firstName',
        header: 'First Name',
      },
      {
        accessorKey: 'lastName',
        header: 'Last Name',
      },
      {
        accessorKey: 'age',
        header: 'Age',
      },
      {
        accessorKey: 'visits',
        header: 'Visits',
      },
      {
        accessorKey: 'progress',
        header: 'Progress',
      },
      {
        accessorKey: 'status',
        header: 'Status',
      },
    ],
    []
  );

  const [data, setData] = useState<User[]>([]);
  const [search, setSearch] = useState('');

  React.useEffect(() => {
    getUsers().then((users) => setData(users));
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleAddUser = () => {
    // Logic for adding a new user
  };

  return (
    <div className="App p-4">
      <Card title="User Table">
        <CardHeader className="flex justify-between items-center">
          <div>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </div>
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={handleSearchChange}
              className="border border-gray-300 rounded-md p-2"
            />
            <button
              onClick={handleAddUser}
              className="bg-blue-500 text-white rounded-md px-4 py-2"
            >
              Add User
            </button>
          </div>
        </CardHeader>
        <CardContent>
          <NewTableSearchAdded columns={columns} data={data} />
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    </div>
  );
}