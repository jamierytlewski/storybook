import type { Meta, StoryObj } from "@storybook/react";
import InputPage from "./InputPage";
import { userEvent, waitFor, within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";

const meta = {
  title: "Examples/InputPage",
  component: InputPage,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
  argTypes: {
    onChange: { action: "onChange" },
  },
} satisfies Meta<typeof InputPage>;

export default meta;
type Story = StoryObj<typeof InputPage>;

export const Inputs: Story = {
  name: "Inputs *",
  play: async ({ canvasElement }) => {
    const textToType = "First Name";

    const canvas = within(canvasElement);

    const textBox = canvas.getByLabelText("First Name");

    await userEvent.type(textBox, textToType);

    await expect(textBox).toHaveValue(textToType);

    const emailTextBox = canvas.getByLabelText("Email address");
    await expect(emailTextBox).not.toBeValid();
    await userEvent.type(emailTextBox, "skeletor@ryltew.ski");
    await expect(emailTextBox).toBeValid();

    const numberTextBox = canvas.getByLabelText("Enter a 3 digit number");
    await expect(numberTextBox).not.toBeValid();
    await userEvent.type(numberTextBox, "abc");
    await expect(numberTextBox).not.toBeValid();

    const agree = canvas.getByLabelText("I agree to the terms and conditions");
    await expect(agree).toHaveAttribute("data-state", "unchecked");
    agree.click();
    await waitFor(() => expect(agree).toHaveAttribute("data-state", "checked"));

    await expect(
      canvas.getByRole("alert", { name: /Please enter a 3 digit number/ }),
    ).toBeInTheDocument();
  },
};
