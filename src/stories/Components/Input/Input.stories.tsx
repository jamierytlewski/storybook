import type { Meta, StoryObj } from "@storybook/react";
import Input from "./Input";
import Button from "../Button/Button";
import ValidationError from "../ValidationError/ValidationError";
import {
  faCodePullRequest,
  faTerminal,
} from "@fortawesome/pro-duotone-svg-icons";

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Pickup Date",
    id: "pickupDate",
    placeholder: "Select a date",
  },
};

export const FloatingLabel: Story = {
  args: {
    label: "Pickup Date",
    id: "pickupDate2",
    floatLabel: true,
    placeholder: "Select a date",
  },
};

export const Disabled: Story = {
  args: {
    label: "Pickup Date",
    id: "pickupDate3",
    floatLabel: true,
    placeholder: "Select a date",
    disabled: true,
    defaultValue: "2021-08-01",
  },
};

export const EmailWithValidation: Story = {
  args: {
    label: "Email Address",
    id: "email123",
    floatLabel: true,
    placeholder: "Select a date",
    type: "email",
    validate: true,
  },
  render: (args) => (
    <form>
      <div className="mb-4">
        <Input {...args} required />
        <ValidationError message="This is an error message" />
      </div>

      <Button buttonStyle={"primary"} size={"small"} type="submit">
        Submit
      </Button>
    </form>
  ),
};

export const LeadingIcon: Story = {
  args: {
    label: "Email Address",
    id: "emailLeadingIcon",
    leadingIcon: faTerminal,
    type: "email",
  },
  render: (args) => (
    <form>
      <div className="mb-4">
        <Input {...args} />
      </div>

      <Button buttonStyle={"primary"} size={"small"} type="submit">
        Submit
      </Button>
    </form>
  ),
};

export const LeadingIconWithFloatingLabel: Story = {
  args: {
    label: "Email Address",
    id: "emailLeadingIconFloatingLabel",
    leadingIcon: faTerminal,
    type: "email",
    placeholder: "Select a date",
    floatLabel: true,
    validate: true,
  },
  render: (args) => (
    <form>
      <div className="mb-4">
        <Input {...args} required />
        <ValidationError message="This is an error message" />
      </div>

      <Button buttonStyle={"primary"} size={"small"} type="submit">
        Submit
      </Button>
    </form>
  ),
};

export const TrailingIcon: Story = {
  args: {
    label: "Email Address",
    id: "emailTrailingIcon",
    placeholder: "Select a date",
    type: "email",
    trailingIcon: faCodePullRequest,
    validate: true,
  },
  render: (args) => (
    <form>
      <div className="mb-4">
        <Input {...args} required />
        <ValidationError message="This is an error message" />
      </div>

      <Button buttonStyle={"primary"} size={"small"} type="submit">
        Submit
      </Button>
    </form>
  ),
};

export const TrailingIconWithFloatingLabel: Story = {
  args: {
    label: "Email Address",
    id: "emailTrailingIconFloatingLabel",
    placeholder: "Select a date",
    type: "email",
    trailingIcon: faCodePullRequest,
    validate: true,
    floatLabel: true,
    defaultValue: "test@me.com",
  },
  render: (args) => (
    <form>
      <div className="mb-4">
        <Input {...args} required />
        <ValidationError message="This is an error message" />
      </div>

      <Button buttonStyle={"primary"} size={"small"} type="submit">
        Submit
      </Button>
    </form>
  ),
};
