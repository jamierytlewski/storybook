import type { Meta, StoryObj } from "@storybook/react";

import Tooltip from "./Tooltip";
import Button from "../Button/Button";
import Radio from "../Radio/Radio";
import { userEvent, screen } from "@storybook/testing-library";
import { expect } from "@storybook/jest";

const meta: Meta<typeof Tooltip> = {
  title: "Components/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: "Default *",
  args: {
    tooltipText: "Tooltip goes here. Try not to make it any wider than this.",
  },
  render: (props) => {
    return (
      <div className="flex w-fit items-center justify-center gap-2">
        <span>Hover Me</span>
        <Tooltip tooltipText={props.tooltipText} />
      </div>
    );
  },
  play: async () => {
    const tooltipIcon = document.querySelector(
      "[data-icon=circle-info]",
    ) as HTMLElement;

    await userEvent.hover(tooltipIcon);

    const tooltip = await screen.findByRole("tooltip");

    await expect(tooltip).toBeInTheDocument();
  },
};

export const ButtonWithTooltip: Story = {
  render: (props) => (
    <>
      <div className="flex items-center gap-2">
        <Button {...props} buttonStyle={"primary"} size={"small"}>
          Hover me
        </Button>
        <Tooltip tooltipText="This is a primary, small button" />
      </div>
    </>
  ),
};

export const InputWithATooltip: Story = {
  render: () => (
    <div className="flex w-fit items-center gap-2">
      <Radio className="flex" name={"test"} id={"test"} label={"Hover Me"} />
      <Tooltip tooltipText="This is a radio with a tooltip." />
    </div>
  ),
};

export const TooltipInATable: Story = {
  render: () => (
    <>
      <table className="w-full table-fixed border-separate border border-gunmetal-500 text-center text-sm">
        <thead>
          <tr>
            <th className="border border-gunmetal-500">Song</th>
            <th className="border border-gunmetal-500">Artist</th>
            <th className="border border-gunmetal-500">Year</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gunmetal-500">
              <span>The Sliding Mr. Bones (Next Stop, Pottersville) </span>
              <Tooltip tooltipText="Tooltip in a table" />
            </td>

            <td className="border border-gunmetal-500">Malcolm Lockyer</td>
            <td className="border border-gunmetal-500">1961</td>
          </tr>
          <tr>
            <td className="border border-gunmetal-500">Witchy Woman</td>
            <td className="border border-gunmetal-500">The Eagles</td>
            <td className="border border-gunmetal-500">1972</td>
          </tr>
          <tr>
            <td className="border border-gunmetal-500">Shining Star</td>
            <td className="border border-gunmetal-500">
              Earth, Wind, and Fire
            </td>
            <td className="border border-gunmetal-500">
              <span>1975 </span>
              <Tooltip tooltipText="another tooltip in a table" />
            </td>
          </tr>
        </tbody>
      </table>
    </>
  ),
};

export const IconWithATooltip: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <span>LOL</span>
      <Tooltip tooltipText="Laugh out Loud" />
    </div>
  ),
};
