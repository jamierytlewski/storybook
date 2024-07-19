import { expect } from "@storybook/jest";
import type { Meta, StoryObj } from "@storybook/react";
import HeaderSearchBar from "./HeaderSearchBar";
import { within, screen, userEvent } from "@storybook/testing-library";

const meta: Meta<typeof HeaderSearchBar> = {
  title: "Examples/HeaderSearchBar",
  component: HeaderSearchBar,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: "Default *",
  render: () => (
    <div>
      <HeaderSearchBar />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const filterButton = canvas.getByRole("button", { name: /filter/i });
    await expect(filterButton).not.toHaveClass("bg-darkblue-500");
    filterButton.click();

    const dialog = within(await screen.findByRole("dialog"));
    const radiusInput = await dialog.findByLabelText(/radius/i);
    const setFilterButton = await dialog.findByRole("button", {
      name: /set filter/i,
    });
    await userEvent.type(radiusInput, "10");

    await userEvent.click(setFilterButton);

    await expect(filterButton).toHaveClass("bg-darkblue-500");

    await userEvent.click(filterButton);
    const clearFilterButton = await screen.findByRole("button", {
      name: /clear filter/i,
    });

    await userEvent.click(clearFilterButton);

    await expect(filterButton).not.toHaveClass("bg-darkblue-500");
  },
};
