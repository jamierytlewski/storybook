import { expect } from "@storybook/jest";
import type { Meta, StoryObj } from "@storybook/react";
import { userEvent, waitFor, within } from "@storybook/testing-library";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faCheckCircle,
  faCircleExclamation,
  faTriangleExclamation,
} from "@fortawesome/pro-light-svg-icons";

import Alert from "./Alert";

const meta: Meta<typeof Alert> = {
  title: "Components/Alert",
  component: Alert,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    type: "info",
    isDismissable: true,
  },
  render: function (args) {
    return (
      <Alert {...args}>
        <div className="flex items-center gap-2">
          <FontAwesomeIcon icon={faBell} className="h-3.5 w-3.5" />
          This is an informational message
        </div>
      </Alert>
    );
  },
};

export const Success: Story = {
  args: {
    type: "success",
    isDismissable: true,
  },
  render: function (args) {
    return (
      <Alert {...args}>
        <div className="flex items-center gap-2">
          <FontAwesomeIcon icon={faCheckCircle} className="h-3.5 w-3.5" />
          You did something successfully
        </div>
      </Alert>
    );
  },
};

export const Warning: Story = {
  args: {
    type: "warning",
    isDismissable: true,
  },
  render: function (args) {
    return (
      <Alert {...args}>
        <div className="flex items-center gap-2">
          <FontAwesomeIcon
            icon={faTriangleExclamation}
            className="h-3.5 w-3.5"
          />
          What you're about to do might be bad
        </div>
      </Alert>
    );
  },
};

export const Error: Story = {
  args: {
    type: "error",
    isDismissable: true,
  },
  render: function (args) {
    return (
      <Alert {...args}>
        <div className="flex items-center gap-2">
          <FontAwesomeIcon icon={faCircleExclamation} className="h-3.5 w-3.5" />
          Oh no, you really messed up this time Jerry
        </div>
      </Alert>
    );
  },
};

export const List: Story = {
  args: {
    type: "error",
    isDismissable: true,
  },
  render: function (args) {
    return (
      <Alert {...args}>
        <div className="flex items-center gap-2">
          <FontAwesomeIcon icon={faCircleExclamation} className="h-3.5 w-3.5" />
          <ul>
            <li>Here is something that went wrong</li>
            <li>Here is something that went wrong</li>
            <li>Here is something that went wrong</li>
            <li>Here is something that went wrong</li>
            <li>Here is something that went wrong</li>
            <li>Here is something that went wrong</li>
            <li>Here is something that went wrong</li>
            <li>Here is something that went wrong</li>
          </ul>
        </div>
      </Alert>
    );
  },
};

export const NotDismissable: Story = {
  args: {
    type: "warning",
    isDismissable: false,
  },
  render: function (args) {
    return (
      <Alert {...args}>
        <div className="flex items-center gap-2">
          <FontAwesomeIcon
            icon={faTriangleExclamation}
            className="h-3.5 w-3.5"
          />
          I'm stuck here forever
        </div>
      </Alert>
    );
  },
};

export const UserClose: Story = {
  name: "User Close *",
  args: {
    type: "error",
    isDismissable: true,
  },
  render: function (args) {
    return (
      <Alert {...args}>
        <div className="flex items-center gap-2">
          <FontAwesomeIcon icon={faCircleExclamation} className="h-3.5 w-3.5" />
          Oh no, you really messed up this time Jerry
        </div>
      </Alert>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const alert = canvas.getByRole<HTMLDivElement>("alert");
    await waitFor(() => expect(alert).toBeInTheDocument());
    const button = canvas.getByRole<HTMLButtonElement>("button", {
      name: "close",
    });
    await userEvent.click(button, { delay: 500 });
    await waitFor(() => expect(alert).not.toBeInTheDocument());
  },
};
