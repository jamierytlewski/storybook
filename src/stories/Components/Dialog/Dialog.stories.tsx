import { expect } from "@storybook/jest";
import { Meta, StoryObj } from "@storybook/react";
import { Dialog, DialogContent, DialogTrigger, DialogClose } from "./Dialog";
import Button from "../Button/Button";
import { userEvent, within, screen } from "@storybook/testing-library";
import Dropdown from "../Dropdown/Dropdown";
import Input from "../Input/Input";

const meta: Meta<typeof Dialog> = {
  title: "Components/Dialog",
  component: Dialog,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: "Default *",
  render: function () {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button buttonStyle="primary" size={"small"}>
            Click me to open dialog
          </Button>
        </DialogTrigger>
        <DialogContent
          title="Warning"
          description="Are you sure you want to cancel the selected order(s)?"
        >
          <div className="flex gap-2">
            <ul>
              <li>Order 1</li>
              <li>Order 2</li>
              <li>Order 3</li>
              <li>Order 4</li>
            </ul>
          </div>
          <div className="flex justify-end gap-2">
            <DialogClose asChild>
              <Button buttonStyle={"outline-primary"} size={"small"}>
                Close
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button buttonStyle={"error"} size={"small"}>
                Cancel
              </Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const button = await canvas.findByRole("button", {
      name: "Click me to open dialog",
    });
    await userEvent.click(button);

    const dialog = await screen.findByRole("dialog");
    await expect(dialog).toBeVisible();

    const title = await within(dialog).findByRole("heading", {
      name: "Warning",
    });
    await expect(title).toBeVisible();

    const description = await within(dialog).findByText(
      "Are you sure you want to cancel the selected order(s)?",
    );
    await expect(description).toBeVisible();

    const list = await within(dialog).findByRole("list");
    await expect(list).toBeVisible();

    const cancelButton = await within(dialog).findByRole("button", {
      name: "Cancel",
    });
    await expect(cancelButton).toBeVisible();
    await userEvent.click(cancelButton);

    await expect(title).not.toBeVisible();
    await expect(description).not.toBeVisible();
    await expect(list).not.toBeVisible();
    await expect(dialog).not.toBeVisible();
  },
};

export const OneButton: Story = {
  render: function () {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button buttonStyle="primary" size={"small"}>
            Edit Order
          </Button>
        </DialogTrigger>
        <DialogContent title="Update Order" description="">
          <div className="flex gap-2">
            <Dropdown
              name={"pickupDate"}
              id={"pickupDate"}
              placeholder={"Select an Option"}
              label={"Pickup Date"}
              options={[
                { value: "08-01-2023", name: "August 1, 2023" },
                { value: "08-02-2023", name: "August 2, 2023" },
                { value: "08-03-2023", name: "August 3, 2023" },
              ]}
            />
            <Dropdown
              name={"dropoffDate"}
              id={"dropoffDate"}
              placeholder={"Select an Option"}
              label={"Dropoff Date"}
              options={[
                { value: "08-01-2023", name: "August 1, 2023" },
                { value: "08-02-2023", name: "August 2, 2023" },
                { value: "08-03-2023", name: "August 3, 2023" },
              ]}
            />
            <Input
              label="First Name"
              id="firstName"
              name="firstName"
              required
              placeholder={"John"}
              minLength={2}
            />
          </div>

          <div className="flex justify-end">
            <DialogClose asChild>
              <Button buttonStyle={"success"} size={"small"}>
                OK
              </Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    );
  },
};
