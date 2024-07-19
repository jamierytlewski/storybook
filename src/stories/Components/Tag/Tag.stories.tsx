import { expect, jest } from "@storybook/jest";
import type { Meta, StoryObj } from "@storybook/react";
import { within, userEvent } from "@storybook/testing-library";

import Tag from "./Tag";

const alertMock = jest.spyOn(window, "alert");

const meta: Meta<typeof Tag> = {
  title: "Components/Tag",
  component: Tag,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    tagText: "tag",
    onClick: () => alert("tag removed"),
  },
};

export const MultipleTags: Story = {
  render: () => (
    <>
      <Tag tagText="tag" onClick={() => alert("tag removed")} />
      <Tag tagText="tag2" onClick={() => alert("tag2 removed")} />
    </>
  ),
};

export const RemoveTag: Story = {
  name: "Remove Tag *",
  args: {
    tagText: "tag",
    onClick: () => alert("tag removed"),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole("button"));

    await expect(alertMock).toHaveBeenCalled();
  },
};
