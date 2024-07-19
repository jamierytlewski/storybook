import { Meta, StoryObj } from "@storybook/react";
import { RowSelectionState } from "@tanstack/react-table";

import Table from "./Table";
import { columns } from "./columns";

import {
  within,
  userEvent,
  waitForElementToBeRemoved,
  waitFor,
} from "@storybook/testing-library";
import { expect } from "@storybook/jest";
import Pagination from "../Pagination/Pagination";
import { useGetOrders } from "../../../hooks/useGetOrders";
import { useState } from "react";
import TableDropdown from "./TableDropdown";

const meta: Meta<typeof Table> = {
  title: "Components/Table",
  component: Table,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const TableWithParentState = () => {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  return (
    <Table
      columns={[
        {
          header: "VIN",
          accessorKey: "vin",
        },
        {
          header: "Customer",
          accessorKey: "customer",
        },
        {
          header: "Equipment",
          accessorKey: "equipment",
        },
      ]}
      data={[
        {
          vin: "31JJP7BDL6G210785",
          customer: "Sony",
          equipment: "Reefer",
        },
        {
          vin: "81JJP7BDL6G210785",
          customer: "Nintendo",
          equipment: "Dry Van",
        },
        {
          vin: "11JJP7BDL6G210785",
          customer: "Microsoft",
          equipment: "Flatbed",
        },
      ]}
      rowSelection={rowSelection}
      setRowSelection={setRowSelection}
      selectRowOnClick
    />
  );
};

const WithApi = () => {
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  const onPageChange = (nextPage: number) => {
    setPageIndex(nextPage);
  };

  const onRowsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value));
    setPageIndex(1);
  };

  const { data, error } = useGetOrders(pageIndex, rowsPerPage);

  if (error) {
    return <div>Failed to load</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Table columns={columns} data={data} initialSort={[]} />
      <div className="flex">
        <div className="mt-5 grow">
          <Pagination
            numberOfPages={Math.ceil(50 / rowsPerPage)}
            activePage={pageIndex}
            onPageChange={onPageChange}
          />
        </div>
        <div>
          <TableDropdown
            name={"rowsPerPage"}
            id={"rowsPerPage"}
            value={rowsPerPage}
            label={"Rows Per Page"}
            options={[
              { value: "10", name: "10" },
              { value: "20", name: "20" },
              { value: "30", name: "30" },
              { value: "40", name: "40" },
              { value: "50", name: "50" },
            ]}
            onChange={onRowsPerPageChange}
          />
        </div>
      </div>
    </>
  );
};

export const Default: Story = {
  render: () => (
    <Table
      columns={[
        {
          header: "VIN",
          accessorKey: "vin",
          enableSorting: true,
        },
        {
          header: "Customer",
          accessorKey: "customer",
        },
        {
          header: "Equipment",
          accessorKey: "equipment",
        },
      ]}
      data={[
        {
          vin: "32JJP7BDL6G210785",
          customer: "Sony",
          equipment: "Dry Van",
        },
        {
          vin: "43JJP7BDL6G210785",
          customer: "Nintendo",
          equipment: "Dry Van",
        },
        {
          vin: "75JJP7BDL6G210785",
          customer: "Microsoft",
          equipment: "Dry Van",
        },
      ]}
    />
  ),
};

export const TableWithPagination: Story = {
  name: "Table With Pagination *",
  render: () => <WithApi />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await waitForElementToBeRemoved(() => canvas.queryByText("Loading..."));

    //check headers rendered
    await expect(canvas.getByText("VIN")).toBeInTheDocument();
    await expect(canvas.getByText("Age (days)")).toBeInTheDocument();

    //check table data rendered
    expect(canvas.getByText("0VEV35F2E5DR24912")).toBeInTheDocument();
    expect(canvas.getByText("53")).toBeInTheDocument();

    //check page size changes
    const pageSizeSelect = canvas.getByRole("combobox");
    await userEvent.selectOptions(pageSizeSelect, "30");
    await waitFor(() => expect(canvas.getAllByRole("row")).toHaveLength(31));

    //check page changes
    const previousPageButton = canvas.getByRole("button", { name: "Previous" });
    expect(previousPageButton).toBeDisabled();

    const nextPageButton = canvas.getByRole("button", { name: "Next" });
    expect(nextPageButton).toBeEnabled();

    const page1Button = canvas.getByRole("button", { name: "1" });
    expect(page1Button).toHaveClass("border-detroitblue-500");

    expect(previousPageButton).toBeDisabled();
    expect(nextPageButton).toBeEnabled();

    //check selection
    const selectAllCheckbox = canvas.getAllByRole("checkbox");
    await userEvent.click(selectAllCheckbox[3]);
    const tableRows = canvas.getAllByRole("row");
    expect(tableRows[4]).toHaveAttribute("data-state", "selected");
  },
};

export const TableWithSorting: Story = {
  render: () => (
    <Table
      columns={[
        {
          header: "VIN",
          accessorKey: "vin",
          enableSorting: true,
        },
        {
          header: "Customer",
          accessorKey: "customer",
          enableSorting: true,
        },
        {
          header: "Equipment",
          accessorKey: "equipment",
          enableSorting: true,
        },
      ]}
      data={[
        {
          vin: "31JJP7BDL6G210785",
          customer: "Sony",
          equipment: "Reefer",
        },
        {
          vin: "81JJP7BDL6G210785",
          customer: "Nintendo",
          equipment: "Dry Van",
        },
        {
          vin: "11JJP7BDL6G210785",
          customer: "Microsoft",
          equipment: "Flatbed",
        },
      ]}
    />
  ),
};

export const TableWithParentRowSelection: Story = {
  name: "Table With Parent Row Selection *",
  render: () => <TableWithParentState />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const tableRows = canvas.getAllByRole("row");

    await userEvent.click(tableRows[1]);
    expect(tableRows[1]).toHaveAttribute("data-state", "selected");

    await userEvent.tab();
    await userEvent.tab();
    await userEvent.keyboard("{enter}");
    expect(tableRows[3]).toHaveAttribute("data-state", "selected");
  },
};

export const TableWithNoData: Story = {
  name: "Table With No Data *",
  render: () => <Table columns={[]} data={[]} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    expect(canvas.getByText("No Data")).toBeInTheDocument();
  },
};
