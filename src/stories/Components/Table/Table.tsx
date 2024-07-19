import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  SortingState,
  getSortedRowModel,
  RowSelectionState,
} from "@tanstack/react-table";

import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faSort } from "@fortawesome/pro-duotone-svg-icons";
import Alert from "../Alert/Alert";

type Props<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  initialSort?: SortingState;
  rowSelection?: RowSelectionState;
  setRowSelection?: Dispatch<SetStateAction<RowSelectionState>>;
  selectRowOnClick?: boolean;
};

export const Table = <TData, TValue>(props: Props<TData, TValue>) => {
  const [sorting, setSorting] = useState<SortingState>(props.initialSort ?? []);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const getRowId = useCallback((row: TData) => {
    return (row as { id: string }).id;
  }, []);

  const table = useReactTable({
    defaultColumn: {
      enableResizing: true,
      enableSorting: false,
    },
    enableSortingRemoval: false,
    data: props.data,
    columns: props.columns,
    getRowId,
    columnResizeMode: "onChange",
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    onRowSelectionChange: props.setRowSelection ?? setRowSelection,
    state: {
      sorting: sorting,
      rowSelection: props.rowSelection ?? rowSelection,
    },
  });

  return (
    <div>
      {props.data.length > 0 ? (
        <div className="overflow-x-auto">
          <div role="table" className="whitespace-nowrap">
            <div>
              {table.getHeaderGroups().map((headerGroup) => (
                <div key={headerGroup.id} className="flex" role="row">
                  {headerGroup.headers.map((header) => (
                    <div
                      key={header.id}
                      role="columnheader"
                      onClick={header.column.getToggleSortingHandler()}
                      className={`relative shrink-0 grow border-b-2 border-b-gunmetal-100/50 text-left font-semibold
                      ${header.column.getCanSort() ? "cursor-pointer" : ""}`}
                      {...{
                        style: {
                          width: header.getSize(),
                        },
                      }}
                    >
                      {header.isPlaceholder ? null : (
                        <div className="flex">
                          <div className="select-none overflow-hidden text-ellipsis">
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                            {{
                              asc: (
                                <FontAwesomeIcon
                                  icon={faSort}
                                  className="ml-1"
                                />
                              ),
                              desc: (
                                <FontAwesomeIcon
                                  icon={faSort}
                                  swapOpacity
                                  className="ml-1"
                                />
                              ),
                            }[header.column.getIsSorted() as string] ?? null}
                          </div>
                        </div>
                      )}
                      <div
                        onMouseDown={header.getResizeHandler()}
                        className={
                          `${
                            header.column.getCanResize()
                              ? "absolute right-0 top-0 mr-1 h-full w-1 cursor-col-resize"
                              : ""
                          }` +
                          `${
                            header.column.getIsResizing()
                              ? " bg-detroitblue-100"
                              : " bg-gunmetal-100"
                          }`
                        }
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div role="rowgroup">
              {table.getRowModel().rows.map((row) => (
                <div
                  key={row.id}
                  tabIndex={0}
                  data-state={row.getIsSelected() ? "selected" : undefined}
                  role="row"
                  className={`
                    min-h-9
                    flex
                    items-center
                    border-b-2 
                    border-b-gunmetal-100/50
                    outline-none
                    hover:bg-gunmetal-100/50
                    focus-visible:ring-2
                    focus-visible:ring-inset
                    focus-visible:ring-detroitblue-500
                    data-[state=selected]:bg-gunmetal-100/75 ${
                      props.selectRowOnClick ? "cursor-pointer" : ""
                    }`}
                  onClick={() => {
                    if (props.selectRowOnClick) {
                      row.toggleSelected(!row.getIsSelected());
                    }
                  }}
                  onKeyDown={(event) => {
                    if (props.selectRowOnClick && event.key === "Enter") {
                      row.toggleSelected(!row.getIsSelected());
                    }
                  }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <div
                      role="gridcell"
                      key={cell.id}
                      className={`shrink-0 grow overflow-hidden text-ellipsis pr-2`}
                      {...{
                        style: {
                          width: cell.column.getSize(),
                        },
                      }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <Alert type="info">
          <div className="flex items-center gap-2">
            <FontAwesomeIcon
              icon={faBell}
              className="h-3.5 w-3.5"
              swapOpacity
            />
            No Data
          </div>
        </Alert>
      )}
    </div>
  );
};

export default Table;
