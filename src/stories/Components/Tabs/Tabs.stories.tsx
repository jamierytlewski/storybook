import { expect } from "@storybook/jest";
import { Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/testing-library";
import TabsGui from "./Tabs";

const meta: Meta<typeof TabsGui> = {
  title: "Components/Tabs",
  component: TabsGui,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof TabsGui>;

export const Default: Story = {
  name: "Default *",
  args: {
    tabInfo: [
      {
        value: "tab1",
        label: "Evil-Lyn",
        content: (
          <img
            src="https://static1.cbrimages.com/wordpress/wp-content/uploads/2018/06/evil-lyn-masters-of-the-universe.jpg"
            alt="Evil-Lyn"
          />
        ),
      },
      {
        value: "tab2",
        label: "Mer-Man",
        content: (
          <img
            src="https://m.media-amazon.com/images/I/71uHsk7TjOL.jpg"
            alt="Mer-Man"
          />
        ),
      },
      {
        value: "tab3",
        label: "Trap-Jaw",
        content: (
          <img
            src="https://static1.cbrimages.com/wordpress/wp-content/uploads/2018/06/trap-jaw.jpg"
            alt="Trap-Jaw"
          />
        ),
      },
    ],
  },
  render: (args) => <TabsGui aria-label="He-Man Villians" {...args}></TabsGui>,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const merMan = await canvas.findByRole("tab", { name: "Mer-Man" });
    const trapJaw = await canvas.findByRole("tab", { name: "Trap-Jaw" });

    await userEvent.click(merMan);

    await expect(merMan).toHaveAttribute("aria-selected", "true");

    await userEvent.click(trapJaw);
    await expect(trapJaw).toHaveAttribute("aria-selected", "true");
  },
};
