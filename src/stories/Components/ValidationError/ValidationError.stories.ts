import type { Meta, StoryObj } from "@storybook/react";

import ValidationError from "./ValidationError";

const meta = {
  title: "Components/ValidationError",
  component: ValidationError,
  tags: ["autodocs"],
} satisfies Meta<typeof ValidationError>;

export default meta;
type Story = StoryObj<typeof meta>;

export const HasError: Story = {
  args: {
    message: "This is an error message",
  },
};

export const NoError: Story = {
  args: {
    message: undefined,
  },
};
