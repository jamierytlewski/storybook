import { expect } from "@storybook/jest";
import { Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/testing-library";
import Radio from "./Radio";

const meta: Meta<typeof Radio> = {
  title: "Components/Radio",
  component: Radio,
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

    await userEvent.click(checkbox);

    await expect(checkbox.checked).toBe(!args.defaultChecked);
  },
};

export const Selected: Story = {
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

export const DisabledSelected: Story = {
  args: {
    label: "Pickup Date",
    id: "pickupDateDisabled",
    defaultChecked: true,
    name: "pickupDateDisabled",
    disabled: true,
  },
};

export const InlineRadioList: Story = {
  render: () => (
    <div className="flex justify-between">
      <Radio name="pickupDate4" id="pickupDate4" label="Pickup Date" />
      <Radio
        name="pickupDate4"
        id="dropoffDate"
        label="Dropoff Date"
        disabled
      />
      <Radio name="pickupDate4" id="etCetera2" label="Et Cetera" />
    </div>
  ),
};

export const RadioList: Story = {
  render: () => (
    <div className="flex flex-col gap-5">
      <Radio
        name="pickupDate3"
        id="pickupDate3"
        label="Pickup Date"
        className="mb-4"
      />
      <Radio
        name="pickupDate3"
        id="dropoffDate"
        label="Dropoff Date"
        className="mb-4"
        disabled
      />
      <Radio
        name="pickupDate3"
        id="etCetera"
        label="Et Cetera"
        className="mb-4"
      />
    </div>
  ),
};
