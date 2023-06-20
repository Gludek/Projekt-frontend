import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { User } from "../../API/types/user";
import { useContext } from "react";
import { ApiClient, userContextProvider } from "../../API/apiClient";
import { Link } from "react-router-dom";

const columnHelper = createColumnHelper<User>();

const Columns = () => {
  const me = useContext(userContextProvider) as User;

  const columns = [
    columnHelper.accessor((row) => row, {
      cell: (info) => info.row.index + 1,
      header: "Nr.",
    }),
    columnHelper.accessor("name", {
      cell: (info) => info.getValue(),
      header: "Name",
    }),
    columnHelper.accessor("email", {
      cell: (info) => info.getValue(),
      header: "email",
    }),
    columnHelper.accessor("permissions", {
      cell: (info) =>
        info
          .getValue()
          .map((p) => p.name)
          .join(", "),
      header: "permissions",
    }),
    columnHelper.accessor("id", {
      cell: (info) =>
        me?.permissions.find((p) => p.name == "SuperAdmin") &&
        me.id != info.getValue() ? (
          <>
            <button
              onClick={() => {
                ApiClient.deleteUser(info.getValue()).then((res) => {
                  console.log(res);
                  if (res.status == 200) {
                    window.location.reload();
                  }
                });
              }}
            >
              Delete
            </button>
            <Link to={`/users/edit/${info.getValue()}`}>Edit</Link>
            <Link to={`/users/${info.getValue()}`}>Show</Link>
          </>
        ) : null,
      header: "",
    }),
  ];
  return columns;
};

function Table({ data }: { data: User[] }) {
  const me = useContext(userContextProvider) as User;
  const columns = Columns();
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  console.log(me);

  return (
    <div className="p-2">
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
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
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              style={{
                background:
                  me && me.email == row.renderValue("email")
                    ? "red"
                    : "transparent",
              }}
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
      <div className="h-4" />
    </div>
  );
}

export default Table;
