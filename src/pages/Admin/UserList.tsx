import { useGetUsers } from "@/API/hooks/UserHooks";
import { User } from "@/API/types/user";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
  Row,
  getExpandedRowModel,
} from "@tanstack/react-table";
import styled from "styled-components";
import { Fragment } from "react";
import chevron from "@/assets/chevron.svg";
const Body = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const StyledTable = styled.table`
  border-collapse: collapse;
  --border-radius: 10px;
  border-radius: var(--border-radius);
`;
const TableHead = styled.thead`
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.primary["300"]};
`;
const TBody = styled.tbody``;
const TFooter = styled.tfoot``;
const TRow = styled.tr`
  background-color: ${({ theme }) => theme.colors.primary["100"]};
  &&:nth-child(even) {
    background-color: ${({ theme }) => theme.colors.primary["200"]};
  }
  &&:has(td:hover) {
    background-color: ${({ theme }) => theme.colors.primary["300"]};
    color: ${({ theme }) => theme.colors.secondary["100"]};
  }
`;
const THeader = styled.th`
  border: 1px solid ${({ theme }) => theme.colors.primary["700"]};
  padding: 10px;
  background-color: ${({ theme }) => theme.colors.primary["400"]};
  color: ${({ theme }) => theme.colors.secondary["200"]};
`;
const Cell = styled.td`
  border: 1px solid ${({ theme }) => theme.colors.primary["700"]};
  padding: 10px;
`;

const PermissionContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 5px;
`;
const PermissionChip = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 5px;
  background-color: ${({ theme }) => theme.colors.secondary["400"]};
  border-radius: 10px;
  color: ${({ theme }) => theme.colors.primary["600"]};
`;
const StyledButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
`;
const Img = styled.img<{ open: boolean }>`
  rotate: ${({ open }) => (open ? "90deg" : "0deg")};
  transition: 0.2s;
`;
const columnHelper = createColumnHelper<User>();

const columns = [
  {
    id: "expander",
    header: () => null,
    cell: ({ row }) => {
      return row.getCanExpand() ? (
        <StyledButton
          {...{
            onClick: row.getToggleExpandedHandler(),
            style: { cursor: "pointer" },
          }}
        >
          <Img src={chevron} open={row.getIsExpanded()} />
        </StyledButton>
      ) : (
        "🔵"
      );
    },
  },
  columnHelper.accessor("name", {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor((row) => row.email, {
    id: "lastName",
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>Email</span>,
  }),
  columnHelper.accessor((u) => u.permissions, {
    id: "permissions",
    cell: (info) => (
      <PermissionContainer>
        {info.getValue()?.map((v) => (
          <PermissionChip>{v}</PermissionChip>
        ))}
      </PermissionContainer>
    ),
    header: () => <span>Uprawnienia</span>,
  }),
  columnHelper.accessor("active", {
    header: () => <span>Aktywny</span>,
    cell: (info) => (info.getValue() ? "Tak" : "Nie"),
  }),
];
function UserList() {
  const data = useGetUsers();
  const userData = data.data ?? [];
  // console.log(data);
  console.log(userData);

  return (
    <Body>
      <h1>Lista użytkowników</h1>
      {UserTable(userData)}
    </Body>
  );
}
const UserTable = (data: User[]) => {
  console.log(data);
  const table = useReactTable({
    data,
    columns,
    getRowCanExpand: () => true,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
  });
  return (
    <StyledTable>
      <TableHead>
        {table.getHeaderGroups().map((headerGroup) => (
          <TRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <THeader key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </THeader>
            ))}
          </TRow>
        ))}
      </TableHead>
      <TBody>
        {table.getRowModel().rows.map((row) => (
          <Fragment key={row.id}>
            <TRow>
              {row.getVisibleCells().map((cell) => (
                <Cell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Cell>
              ))}
            </TRow>
            {row.getIsExpanded() && (
              <>
                <TRow>
                  <THeader colSpan={row.getVisibleCells().length}>JSON</THeader>
                </TRow>
                <TRow>
                  {/* 2nd row is a custom 1 cell row */}
                  <Cell colSpan={row.getVisibleCells().length}>
                    {renderSubComponent({ row })}
                  </Cell>
                </TRow>
              </>
            )}
          </Fragment>
        ))}
      </TBody>
    </StyledTable>
  );
};
export default UserList;
const renderSubComponent = ({ row }: { row: Row<User> }) => {
  return (
    <pre style={{ fontSize: "10px" }}>
      <code>{JSON.stringify(row.original, null, 2)}</code>
    </pre>
  );
};
