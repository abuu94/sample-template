import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    TableOptions,
    useReactTable,
  } from '@tanstack/react-table';
  import { Button } from '../ui/button';
  import { cn } from '@/lib/utils';
  
  type TDataTable = {
    columns: any[];
    data?: any;
    openPagination?: boolean;
    filter?: string;
    sorting?: any;
    options?: Partial<TableOptions<any>>;
  };
  
  const NewTable = ({
    columns,
    data,
    openPagination = true,
    options,
    ...props
  }: TDataTable) => {
    const table = useReactTable({
      columns,
      data,
      ...options,
      ...props,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
    });
  
    return (
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse mt-4">
          <thead className="bg-gray-100">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr className="border-b" key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4 py-2 text-left text-sm font-medium text-gray-700"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <tr className="border-b last:border-none" key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-4 py-3 text-sm text-gray-600">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="px-4 py-3 text-center">
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {openPagination && (
          <div className="flex items-center justify-end space-x-2 py-4">
            <span className="flex-1 text-sm text-gray-500">
              Showing {table.getRowModel().rows.length} of {table.getRowCount()}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              {'<<'}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button size="sm">{table.getState().pagination.pageIndex + 1}</Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              {'>>'}
            </Button>
            <span className="text-sm text-gray-500">Show Entries :</span>
            <select
              value={table.getState().pagination.pageSize}
              className="bg-gray-200 border border-gray-300 focus:outline-none rounded-md p-1 mx-3"
              onChange={(e) => table.setPageSize(Number(e.target.value))}
            >
              {[5, 7, 10, 15, 20, 25].map((pageSize) => (
                <option value={pageSize} key={pageSize}>
                  {pageSize}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    );
  };
  
  export default NewTable;