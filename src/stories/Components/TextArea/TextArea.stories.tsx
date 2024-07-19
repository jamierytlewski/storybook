import type { Meta, StoryObj } from "@storybook/react";
import TextArea from "./TextArea";
import { userEvent, waitFor, within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";

const meta: Meta<typeof TextArea> = {
  title: "Components/TextArea",
  component: TextArea,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Note #1",
    id: "note1",
    placeholder: "Type some text here",
  },
};

export const ValidationSuccess: Story = {
  args: {
    label: "Note #2",
    id: "note2",
    placeholder: "Type some text here",
    required: true,
    validate: true,
  },
  render: (args) => <TextArea {...args}>Text goes here</TextArea>,
};

export const ValidationError: Story = {
  args: {
    label: "Note #3",
    id: "note3",
    placeholder: "Type some text here",
    required: true,
    validate: true,
  },
};

export const MaxLength: Story = {
  name: "Max Length *",
  args: {
    label: "Note #4",
    id: "note4",
    placeholder: "Type some text here",
    maxLength: 255,
  },
  render: (args) => (
    <TextArea {...args}>
      Contrary to popular belief, Lorem Ipsum is not simply random text. It has
      roots in a piece of classical Latin literature from 45 BC, making it over
      2000 years old.
    </TextArea>
  ),
  play: async ({ canvasElement }) => {
    const textToType =
      " This is some text that should be added onto the existing text.  Part of this sentence should be cut off.";
    const expectedText =
      "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. This is some text that should be added onto the existing text.  Part of this sentence shoul";

    const canvas = within(canvasElement);
    const textarea = canvas.getByLabelText<HTMLTextAreaElement>("Note #4");
    await waitFor(() => expect(textarea).toBeInTheDocument());
    await userEvent.type(textarea, textToType);
    await waitFor(() => expect(textarea).toHaveValue(expectedText));
  },
};
