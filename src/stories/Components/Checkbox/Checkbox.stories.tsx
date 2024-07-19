import type { Meta, StoryObj } from "@storybook/react";
import Checkbox from "./Checkbox";
import { userEvent, within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";

const meta: Meta<typeof Checkbox> = {
  title: "Components/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  argTypes: {
    onChange: { action: "onChange" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: "Default *",
  args: {
    label: "Pickup Date",
    id: "pickupDate",
    name: "pickupDate",
    defaultChecked: false,
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    const checkbox = canvas.getByLabelText<HTMLInputElement>(args.label);

    await expect(checkbox).toHaveAttribute("data-state", "unchecked");

    await userEvent.click(checkbox);

    await expect(checkbox).toHaveAttribute("data-state", "checked");
  },
};

export const Checked: Story = {
  args: {
    label: "Pickup Date",
    id: "pickupDate2",
    defaultChecked: true,
    name: "pickupDate2",
  },
};

export const Disabled: Story = {
  args: {
    label: "Pickup Date",
    id: "pickupDateDisabled",
    defaultChecked: false,
    name: "pickupDateDisabled",
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    label: "Pickup Date",
    id: "pickupDateCheckedDisabled",
    defaultChecked: true,
    name: "pickupDateCheckedDisabled",
    disabled: true,
  },
};

export const CheckboxList: Story = {
  render: () => (
    <div>
      <Checkbox
        label="Pickup Date"
        id="pickupDate3"
        name="pickupDate3"
        className="mb-4"
      />
      <Checkbox
        label="Pickup Time"
        id="pickupTime"
        name="pickupTime"
        className="mb-4"
        disabled
      />
      <Checkbox
        label="Pickup Location"
        id="pickupLocation"
        name="pickupLocation"
        className="mb-4"
      />
      <hr />
    </div>
  ),
};
