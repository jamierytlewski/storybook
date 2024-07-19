import type { Meta, StoryObj } from "@storybook/react";
import Autocomplete from "./Autocomplete";

import { within, userEvent, screen } from "@storybook/testing-library";
import { expect } from "@storybook/jest";
import { useState } from "react";
import { useGetProducts } from "../../../hooks/useGetProducts";
import { debounce } from "lodash";

const meta: Meta<typeof Autocomplete> = {
  title: "Components/Autocomplete",
  component: Autocomplete,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const WithApi = (props: { label: string; placeholder: string }) => {
  type Product = {
    brand: string;
    category: string;
    description: string;
    discountPercentage: number;
    id: number;
    images: string[];
    price: number;
    rating: number;
    stock: number;
    thumbnail: string;
    title: string;
  };

  const [options, setOptions] = useState([]);

  const [query, setQuery] = useState("");

  const { data, error, isLoading } = useGetProducts(query);

  if (error) {
    return <div>Failed to load</div>;
  }
  if (!data) {
    return <div>Loading...</div>;
  }

  const debouncedHandleInputChange = debounce(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(e.target.value);
      setOptions(
        data.products.map((product: Product) => ({
          value: product.id,
          name: product.title,
        })),
      );
    },
    500,
  );

  return (
    <Autocomplete
      label={props.label}
      id={"products"}
      name={"products"}
      placeholder={props.placeholder}
      options={options}
      onChange={debouncedHandleInputChange}
      isLoading={isLoading}
    />
  );
};

export const Default: Story = {
  args: {
    label: "Pickup Date",
    id: "pickupDate",
    options: [
      { value: "08-01-2023", name: "August 1, 2023" },
      { value: "08-02-2023", name: "August 2, 2023" },
      { value: "08-03-2023", name: "August 3, 2023" },
    ],
    placeholder: "Select an option",
    name: "pickupDate",
    required: true,
  },
  name: "Default *",
  render: function (args) {
    return <Autocomplete {...args} />;
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText(args.label)).toBeInTheDocument();
    const inputBox = canvas.getByPlaceholderText(args.placeholder);
    await expect(inputBox).toBeInTheDocument();
    await expect(inputBox).toHaveClass(
      "leading-none font-medium rounded outline-none disabled:bg-gunmetal-100/50 disabled:text-gunmetal-100/50 border-2 border-detroitblue-500 h-10 focus-visible:ring-2 focus-visible:ring-detroitblue-500/50 transition-shadow w-full p-2 peer text-left h-auto invalid:border-error-700 invalid:focus:border-error-700 invalid:focus-visible:ring-error-700/50 valid:focus:border-success-700 valid:border-success-700 valid:focus-visible:ring-success-700/50 shadow-sm",
    );

    await userEvent.type(inputBox, "August");

    const listItems = await screen.findAllByRole("option");
    await expect(listItems).toHaveLength(3);

    await expect(canvas.getByText(args.options[0].name)).toBeInTheDocument();
    await expect(canvas.getByText(args.options[1].name)).toBeInTheDocument();
    await expect(canvas.getByText(args.options[2].name)).toBeInTheDocument();

    await userEvent.type(inputBox, " 1");

    await expect(canvas.getByText(args.options[0].name)).toBeInTheDocument();
    await expect(
      canvas.queryByText(args.options[1].name),
    ).not.toBeInTheDocument();
    await expect(
      canvas.queryByText(args.options[2].name),
    ).not.toBeInTheDocument();
    await userEvent.click(canvas.getByText(args.options[0].name));

    await expect(inputBox).toHaveValue(args.options[0].name);
  },
};

export const WithAPI: Story = {
  args: {
    label: "Products",
    placeholder: "Search for a product",
    id: "products",
    name: "products",
  },
  name: "Autocomplete using API *",
  render: (args) => <WithApi {...args} />,
};
