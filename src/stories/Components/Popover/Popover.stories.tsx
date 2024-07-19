import type { Meta, StoryObj } from "@storybook/react";
import { Popover, PopoverContent, PopoverTrigger } from "./Popover";
import Button from "../Button/Button";
import { within, userEvent, screen } from "@storybook/testing-library";
import { expect } from "@storybook/jest";



const meta: Meta<typeof Popover> = {
  title: "Components/Popover",
  component: Popover,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: "Default *",
  render: function () {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button buttonStyle="primary" size={"small"}>
            Click me to open popover
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <div className="flex gap-2">
            <ul>
              <li>Order 1</li>
              <li>Order 2</li>
              <li>Order 3</li>
              <li>Order 4</li>
            </ul>
          </div>
        </PopoverContent>
      </Popover>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const openPopoverButton = canvas.getByRole("button", { name: /popover/i });
    await userEvent.click(openPopoverButton);

    const dialog = await screen.findByRole("dialog");
    await expect(dialog).toBeVisible();

    const popoverContent = await within(dialog).findAllByRole("listitem");
    await expect(popoverContent).toHaveLength(4);

    await userEvent.click(document.body);

    await expect(dialog).not.toBeVisible();
  },
}

export const PopoverWithButtons: Story = {
  render: function () {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button buttonStyle="primary" size={"small"}>
            Open Popover
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <div className="flex gap-2">
            <Button buttonStyle="primary" size={"small"}>Button 1</Button>
            <Button buttonStyle="primary" size={"small"}>Button 2</Button>
            <Button buttonStyle="primary" size={"small"}>Button 3</Button>
          </div>
        </PopoverContent>
      </Popover>
    );
  },
};