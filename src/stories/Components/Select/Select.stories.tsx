import { expect, jest } from "@storybook/jest";
import type { Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/testing-library";
import Select from "./Select";
import selectEvent from "react-select-event";

const meta: Meta<typeof Select> = {
  title: "Components/Select",
  component: Select,
  tags: ["autodocs"],
};

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

export default meta;
type Story = StoryObj<typeof meta>;

const WithApi = (props: {
  label: string;
  placeholder: string;
  required: boolean;
  id: string;
  name: string;
  isMulti: boolean;
  disabled: boolean;
  isAsync: boolean;
}) => {
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

  type Option = {
    value: string;
    label: string;
  };

  const loadOptions = async (
    inputValue: string,
    callback: (options: Option[]) => void,
  ) => {
    try {
      const response = await fetch(
        `https://dummyjson.com/products/search?q=${inputValue}`,
      );

      const data = await response.json();

      const options = data.products.map((item: Product) => ({
        value: item.id.toString(),
        label: item.title,
      }));

      callback(options);
    } catch (error) {
      console.error("Error loading options:", error);
      callback([]);
    }
  };

  return (
    <form name={props.name}>
      <Select
        isAsync={props.isAsync}
        required={props.required}
        label={props.label}
        id={props.id}
        name={props.name}
        placeholder={props.placeholder}
        isMulti={props.isMulti}
        disabled={props.disabled}
        onChange={jest.fn()}
        loadOptions={loadOptions}
      />
    </form>
  );
};

export const Default: Story = {
  name: "Default *",
  args: {
    isAsync: false,
    required: true,
    options: options,
    label: "Ice Cream Flavors",
    id: "iceCreamFlavors",
    name: "iceCreamFlavors",
    placeholder: "Select your favorite ice cream flavor(s)",
    isMulti: true,
    disabled: false,
    defaultValue: [options[0], options[1]],
  },
  render: (props) => {
    return (
      <form name={props.name}>
        <Select
          isAsync={props.isAsync}
          required={props.required}
          options={props.options}
          label={props.label}
          id={props.id}
          name={props.name}
          placeholder={props.placeholder}
          isMulti={props.isMulti}
          disabled={props.disabled}
          defaultValue={props.defaultValue}
          onChange={jest.fn()}
        />
      </form>
    );
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    const form = canvas.getByRole("form");
    expect(form).toBeInTheDocument();
    expect(form).toHaveFormValues({
      [args.name]: [args.options?.[0]?.value, args.options?.[1]?.value]! ?? [],
    });

    const clearSelections = canvas.getByTitle("Clear Selections");
    await userEvent.click(clearSelections);

    expect(form).toHaveFormValues({ [args.name]: "" });

    const select = canvas.getByLabelText(args.label);
    expect(select).toBeInTheDocument();

    expect(canvas.getByText(args.placeholder)).toBeVisible();

    await selectEvent.select(select, [args.options?.[0]?.label ?? ""]);
    expect(form).toHaveFormValues({
      [args.name]: args.options?.[0]?.value ?? "",
    });

    await selectEvent.select(select, [args.options?.[1]?.label ?? ""]);
    expect(form).toHaveFormValues({
      [args.name]: [args.options?.[0]?.value, args.options?.[1]?.value]! ?? [],
    });

    await selectEvent.select(select, [args.options?.[2]?.label ?? ""]);
    expect(form).toHaveFormValues({
      [args.name]: [
        args.options?.[0]?.value ?? "",
        args.options?.[1]?.value ?? "",
        args.options?.[2]?.value ?? "",
      ],
    });

    expect(canvas.getByText("No options")).toBeInTheDocument();
  },
};

export const SingleSelect: Story = {
  name: "Single Select *",
  args: {
    required: false,
    options: options,
    label: "Ice Cream Flavors",
    id: "iceCreamFlavors",
    name: "iceCreamFlavors",
    placeholder: "Select your favorite ice cream flavor",
    isMulti: false,
    disabled: false,
    isAsync: false,
  },
  render: (props) => {
    return (
      <form name={props.name}>
        <Select
          isAsync={props.isAsync}
          required={props.required}
          options={props.options}
          label={props.label}
          id={props.id}
          name={props.name}
          placeholder={props.placeholder}
          isMulti={props.isMulti}
          disabled={props.disabled}
          onChange={jest.fn()}
        />
      </form>
    );
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    const form = canvas.getByRole("form");
    expect(form).toBeInTheDocument();
    expect(form).toHaveFormValues({ [args.name]: "" });

    const select = canvas.getByLabelText(args.label);
    expect(select).toBeInTheDocument();

    expect(canvas.getByText(args.placeholder)).toBeVisible();

    await selectEvent.select(select, [args.options?.[0]?.label ?? ""]);
    expect(form).toHaveFormValues({
      [args.name]: args.options?.[0]?.value ?? "",
    });

    await selectEvent.select(select, [args.options?.[1]?.label ?? ""]);
    expect(form).toHaveFormValues({
      [args.name]: args.options?.[1]?.value ?? "",
    });
  },
};

export const SingleSelectWithDefaultValue: Story = {
  name: "Single Select With Default Value*",
  args: {
    required: false,
    options: options,
    label: "Ice Cream Flavors",
    id: "iceCreamFlavors",
    name: "iceCreamFlavors",
    placeholder: "Select your favorite ice cream flavor",
    isMulti: false,
    disabled: false,
    isAsync: false,
  },
  render: (props) => {
    return (
      <form name={props.name}>
        <Select
          isAsync={props.isAsync}
          required={props.required}
          options={props.options}
          label={props.label}
          id={props.id}
          name={props.name}
          placeholder={props.placeholder}
          isMulti={props.isMulti}
          disabled={props.disabled}
          onChange={jest.fn()}
          defaultValue={
            props.options?.[0] ?? {
              value: "",
              label: "",
            }
          }
        />
      </form>
    );
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    const form = canvas.getByRole("form");
    expect(form).toBeInTheDocument();
    expect(form).toHaveFormValues({
      [args.name]: args.options?.[0]?.value ?? "",
    });

    const select = canvas.getByLabelText(args.label);
    expect(select).toBeInTheDocument();

    await selectEvent.select(select, [args.options?.[0]?.label ?? ""]);
    expect(form).toHaveFormValues({
      [args.name]: args.options?.[0]?.value ?? "",
    });

    await selectEvent.select(select, [args.options?.[1]?.label ?? ""]);
    expect(form).toHaveFormValues({
      [args.name]: args.options?.[1]?.value ?? "",
    });
  },
};

export const WithAPI: Story = {
  name: "Select using API",
  render: () => (
    <WithApi
      isAsync={true}
      label="Products"
      placeholder="Search for your products"
      required={false}
      id="products"
      name="products"
      isMulti={true}
      disabled={false}
    />
  ),
};
