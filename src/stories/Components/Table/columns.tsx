import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import Checkbox from "../Checkbox/Checkbox";

export type Shipment = {
    age: number;
    customer: string;
    delivery: string;
    destination: string;
    equipment: string;
    id: number;
    origin: string;
    pickup: string;
    vin: string;
};

const columnHelper = createColumnHelper<Shipment>();

export const columns: ColumnDef<Shipment>[] = [

    columnHelper.display({
        id: 'select',
        header: () => {
            return (
                <div title="select" />
            )
        },
        cell: ({ row }) => {
            return (
                <Checkbox checked={row.getIsSelected()} name={"selectedRows"} id={row.id} aria-label={"Select row"} label=""
                    onCheckedChange={(checked) => row.toggleSelected(!!checked)}
                />
            );
        },
        maxSize: 50,
        enableResizing: false,
    }),
    {
        header: "VIN",
        accessorKey: "vin",
        minSize: 200,
    },
    {
        header: "Customer",
        accessorKey: "customer",
        minSize: 200
    },
    {
        header: "Equipment",
        accessorKey: "equipment",
    },
    {
        header: "Age (days)",
        accessorKey: "age",
        cell: ({ row }) => {
            const age: number = row.getValue("age");
            return <p className="text-right tabular-nums">{age}</p>;
        },
        size: 25
    },
    {
        header: "Origin",
        accessorKey: "origin",
    },
    {
        header: "Destination",
        accessorKey: "destination",
    },
    {
        header: "Pickup",
        accessorKey: "pickup",
        cell: ({ row }) => {
            const formattedDate = new Date(
                row.getValue("pickup")
            ).toLocaleDateString();
            return <span>{formattedDate}</span>;
        },
        size: 75
    },
    {
        header: "Delivery",
        accessorKey: "delivery",
        cell: ({ row }) => {
            const formattedDate = new Date(
                row.getValue("delivery")
            ).toLocaleDateString();
            return <span>{formattedDate}</span>;
        },
        size: 75
    },
];