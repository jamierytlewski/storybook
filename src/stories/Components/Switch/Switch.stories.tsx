import type { Meta, StoryObj } from "@storybook/react";
import { expect } from "@storybook/jest";
import { faDollar as faIcon } from "@fortawesome/pro-duotone-svg-icons";
import { userEvent, waitFor, within } from "@storybook/testing-library";

import Switch from "./Switch";

const meta: Meta<typeof Switch> = {
  title: "Components/Switch",
  component: Switch,
  tags: ["autodocs"],
  argTypes: {
    onCheckedChange: { action: "onCheckedChange" },
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

const switchStoryName = {
  switchDefault: "switchDefault",
  switchChecked: "switchChecked",
  switchDisabled: "switchDisabled",
  switchCheckedDisabled: "switchCheckedDisabled",
  switchIcon: "switchIcon",
  switchIconDisabled: "switchIconDisabled",
  switchIconChecked: "switchIconChecked",
  switchIconCheckedDisabled: "switchIconCheckedDisabled",
  switchToggled: "switchToggled",
  switchMultiple: "switchMultiple",
};

export const SwitchDefault: Story = {
  args: {
    id: switchStoryName.switchDefault,
    label: "This is a label for a switch",
    name: switchStoryName.switchDefault,
    defaultChecked: false,
    disabled: false,
    showLabel: true,
  },
};

export const SwitchChecked: Story = {
  args: {
    id: switchStoryName.switchChecked,
    label: switchStoryName.switchChecked,
    name: switchStoryName.switchChecked,
    defaultChecked: true,
    disabled: false,
  },
};

export const SwitchDisabled: Story = {
  args: {
    id: switchStoryName.switchDisabled,
    label: switchStoryName.switchDisabled,
    name: switchStoryName.switchDisabled,
    defaultChecked: false,
    disabled: true,
  },
};

export const SwitchCheckedDisabled: Story = {
  args: {
    id: switchStoryName.switchCheckedDisabled,
    label: switchStoryName.switchCheckedDisabled,
    name: switchStoryName.switchCheckedDisabled,
    defaultChecked: true,
    disabled: true,
  },
};

export const SwitchIcon: Story = {
  args: {
    id: switchStoryName.switchIcon,
    label: switchStoryName.switchIcon,
    name: switchStoryName.switchIcon,
    defaultChecked: false,
    icon: faIcon,
  },
};

export const SwitchIconChecked: Story = {
  args: {
    id: switchStoryName.switchIconChecked,
    label: switchStoryName.switchIconChecked,
    name: switchStoryName.switchIconChecked,
    defaultChecked: true,
    icon: faIcon,
  },
};

export const SwitchIconDisabled: Story = {
  args: {
    id: switchStoryName.switchIconDisabled,
    label: switchStoryName.switchIconDisabled,
    name: switchStoryName.switchIconDisabled,
    defaultChecked: false,
    disabled: true,
    icon: faIcon,
  },
};

export const SwitchIconCheckedDisabled: Story = {
  args: {
    id: switchStoryName.switchIconCheckedDisabled,
    label: switchStoryName.switchIconCheckedDisabled,
    name: switchStoryName.switchIconCheckedDisabled,
    defaultChecked: true,
    disabled: true,
    icon: faIcon,
  },
};

export const SwitchToggled: Story = {
  name: "Switch Toggled *",
  args: {
    id: switchStoryName.switchToggled,
    label: switchStoryName.switchToggled,
    name: switchStoryName.switchToggled,
    defaultChecked: false,
    disabled: false,
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText<HTMLButtonElement>(args.label);

    await userEvent.click(input);
    await waitFor(() => expect(input).toHaveAttribute("aria-checked", "true"));

    await userEvent.click(input, { delay: 250 });
    await waitFor(() => expect(input).toHaveAttribute("aria-checked", "false"));
  },
};

export const SwitchMultiple: Story = {
  render: () => {
    return (
      <div className="flex flex-col gap-10">
        <Switch
          id={`${switchStoryName.switchMultiple}-1`}
          name={`${switchStoryName.switchMultiple}-1`}
          label={`${switchStoryName.switchMultiple}-1`}
          defaultChecked={false}
        />
        <Switch
          id={`${switchStoryName.switchMultiple}-2`}
          name={`${switchStoryName.switchMultiple}-2`}
          label={`${switchStoryName.switchMultiple}-2`}
          defaultChecked={true}
        />
        <Switch
          id={`${switchStoryName.switchMultiple}-3`}
          name={`${switchStoryName.switchMultiple}-3`}
          label={`${switchStoryName.switchMultiple}-3`}
          defaultChecked={false}
          icon={faIcon}
        />
      </div>
    );
  },
};
