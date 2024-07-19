import { expect } from "@storybook/jest";
import type { Meta, StoryObj } from "@storybook/react";
import Dropdown from "./Dropdown";
import { userEvent, within } from "@storybook/testing-library";
import Button from "../Button/Button";

const meta: Meta<typeof Dropdown> = {
  title: "Components/Dropdown",
  component: Dropdown,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: "Default *",
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
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const dropdown = canvas.getByLabelText<HTMLSelectElement>(args.label);

    expect(canvas.getByRole("combobox")).toHaveDisplayValue(args.placeholder);

    expect(canvas.getByText(args.options[0].name)).toBeInTheDocument();
    expect(canvas.getByText(args.options[1].name)).toBeInTheDocument();
    expect(canvas.getByText(args.options[2].name)).toBeInTheDocument();

    await userEvent.selectOptions(dropdown, args.options[1].name);
    expect(canvas.getByRole("combobox")).toHaveValue(args.options[1].value);
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled Dropdown",
    id: "pickupDate3",
    disabled: true,
    options: [
      { value: "test1", name: "Test 1" },
      { value: "test2", name: "Test 2" },
      { value: "test3", name: "Test 3" },
    ],
    placeholder: "Disabled",
    name: "pickupDate",
  },
};

export const Required: Story = {
  args: {
    label: "Dropoff Date",
    id: "dropoffDate",
    options: [
      { value: "2-6-2023", name: "February 6, 2023" },
      { value: "2-7-2023", name: "February 7, 2023" },
      { value: "2-8-2023", name: "February 8, 2023" },
    ],
    placeholder: "Select an option",
    name: "pickupDate",
    required: true,
  },
  render: (args) => (
    <form>
      <div className="mb-4">
        <Dropdown {...args} />
      </div>

      <Button buttonStyle={"primary"} size={"small"} type="submit">
        Submit
      </Button>
    </form>
  ),
};
