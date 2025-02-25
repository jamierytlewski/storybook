import type { Meta, StoryObj } from "@storybook/react";
import { within, userEvent } from "@storybook/testing-library";

import Page from "./Page";

const meta = {
  title: "Examples/Page",
  component: Page,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof Page>;

export const NavigationOpen: Story = {};

// More on interaction testing: https://storybook.js.org/docs/react/writing-tests/interaction-testing
export const NavigationCollapse: Story = {
  name: "Navigation Collapse *",
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const collapseButton = canvas.getByRole("button", {
      name: "Collapse Navigation",
    });
    await userEvent.click(collapseButton);
  },
};
