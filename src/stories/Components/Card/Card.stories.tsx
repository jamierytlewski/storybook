import { expect } from '@storybook/jest';
import { Meta, StoryObj } from "@storybook/react";
import { within } from "@storybook/testing-library";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./Card";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/pro-duotone-svg-icons";
import Table from "../Table/Table";

const meta: Meta<typeof Card> = {
  title: "Components/Card",
  component: Card,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: "Default *",
  render: function () {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Item</CardTitle>
          <CardDescription>
            Vehicle Details
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-x-6">
            <div className="font-semibold">VIN:</div>
            <div className="flex items-center gap-2">
              <span className="grow">2WKUU57XXXA575096</span>
              <button className="transition-colors hover:text-detroitblue-500">
                <FontAwesomeIcon icon={faCopy} />
              </button>
            </div>
            <div className="font-semibold">Year:</div>
            <div>1999</div>
            <div className="font-semibold">Make:</div>
            <div>Western Star</div>
            <div className="font-semibold">Model:</div>
            <div>Blade</div>
            <div className="font-semibold">Type:</div>
            <div>Sedan</div>
          </div>
        </CardContent>
      </Card >
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    expect(canvas.getByText("Item")).toBeInTheDocument();
    expect(canvas.getByText("Vehicle Details")).toBeInTheDocument();
    expect(canvas.getByText("VIN:")).toBeInTheDocument();
    expect(canvas.getByText("2WKUU57XXXA575096")).toBeInTheDocument();
    expect(canvas.getByText("Year:")).toBeInTheDocument();
    expect(canvas.getByText("1999")).toBeInTheDocument();
    expect(canvas.getByText("Make:")).toBeInTheDocument();
    expect(canvas.getByText("Western Star")).toBeInTheDocument();
    expect(canvas.getByText("Model:")).toBeInTheDocument();
    expect(canvas.getByText("Blade")).toBeInTheDocument();
    expect(canvas.getByText("Type:")).toBeInTheDocument();
    expect(canvas.getByText("Sedan")).toBeInTheDocument();

  },
};

export const CardWithTable: Story = {
  render: function () {

    return (
      <Card>
        <CardHeader>
          <div className="flex justify-between">
            <CardTitle>Costs</CardTitle>
          </div>
          <CardDescription>Costs associated with this order</CardDescription>
        </CardHeader>
        <CardContent>
          <Table
            columns={[
              {
                header: "Category",
                accessorKey: "category",
                enableSorting: true,
                maxSize: 70,
              },
              {
                header: "Cost / Unit",
                accessorKey: "perUnitPrice",
                enableSorting: true,
                maxSize: 70,
              },
              {
                header: "Quantity",
                accessorKey: "quantity",
                enableSorting: true,
                maxSize: 70,
              },
              {
                header: "Amount",
                accessorKey: "amount",
                enableSorting: true,
                maxSize: 70,
              },
              {
                header: "Billable",
                accessorKey: "isBillable",
                enableSorting: true,
                maxSize: 70,
              },
              {
                header: "Payable",
                accessorKey: "isPayable",
                enableSorting: true,
                maxSize: 70,
              },
              {
                header: "Note",
                accessorKey: "note",
                enableSorting: true,
                minSize: 320,
              },
            ]}
            data={[
              {
                category: "Other",
                perUnitPrice: "$139.03",
                quantity: 1,
                amount: "$139.03",
                isBillable: "Yes",
                isPayable: "No",
                note: "Aenean Pretium Ullamcorper",
              },
            ]} />
        </CardContent>
      </Card >
    );
  },
};