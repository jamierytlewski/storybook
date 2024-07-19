import type { Meta, StoryObj } from "@storybook/react";

import Button from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBanBug,
  faBomb,
  faHockeyMask,
  faSkeleton,
  faThumbsUp,
  faVialCircleCheck,
  faTrash,
  faPenToSquare,
  faCheck,
  faWarning,
} from "@fortawesome/pro-duotone-svg-icons";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: "Components/Buttons",
  component: Button,
  tags: ["autodocs"],
  args: {
    children: "Button",
    size: "default",
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof Button>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    buttonStyle: "primary",
    children: <>Primary</>,
  },
};

export const OutlinePrimary: Story = {
  args: {
    buttonStyle: "outline-primary",
  },
};

export const Secondary: Story = {
  args: {
    buttonStyle: "secondary",
  },
};

export const OutlineSecondary: Story = {
  args: {
    buttonStyle: "outline-secondary",
  },
};

export const Tertiary: Story = {
  args: {
    buttonStyle: "tertiary",
  },
};

export const OutlineTertiary: Story = {
  args: {
    buttonStyle: "outline-tertiary",
  },
};

export const DetroitBlue: Story = {
  args: {
    buttonStyle: "detroitblue",
  },
};

export const OutlineDetroitBlue: Story = {
  args: {
    buttonStyle: "outline-detroitblue",
  },
};

export const ErrorStory: Story = {
  args: {
    buttonStyle: "error",
    children: (
      <>
        <FontAwesomeIcon icon={faBanBug} />
        &nbsp; Error
      </>
    ),
  },
  name: "Error",
};

export const OutlineErrorStory: Story = {
  args: {
    buttonStyle: "outline-error",
    children: (
      <>
        <FontAwesomeIcon icon={faBomb} swapOpacity />
        &nbsp; Error
      </>
    ),
  },
  name: "Outline Error",
};

export const Success: Story = {
  args: {
    buttonStyle: "success",
    children: (
      <>
        <FontAwesomeIcon icon={faThumbsUp} swapOpacity />
        &nbsp; Success
      </>
    ),
  },
};

export const OutlineSuccess: Story = {
  args: {
    buttonStyle: "outline-success",
    children: (
      <>
        <FontAwesomeIcon icon={faVialCircleCheck} />
        &nbsp; Success
      </>
    ),
  },
};

export const Warning: Story = {
  args: {
    buttonStyle: "warning",
    children: (
      <>
        <FontAwesomeIcon icon={faHockeyMask} swapOpacity />
        &nbsp; Warning
      </>
    ),
  },
};

export const OutlineWarning: Story = {
  args: {
    buttonStyle: "outline-warning",
    children: (
      <>
        <FontAwesomeIcon icon={faSkeleton} />
        &nbsp; Warning
      </>
    ),
  },
};

export const Disabled: Story = {
  args: {
    buttonStyle: "tertiary",
    disabled: true,
  },
};

export const Small: Story = {
  args: {
    buttonStyle: "primary",
    size: "small",
  },
};

export const XSmall: Story = {
  args: {
    buttonStyle: "primary",
    size: "xsmall",
  },
};

export const Link: Story = {
  args: {
    buttonStyle: "link",
  },
};

export const IconDetroitBlue: Story = {
  args: {
    buttonStyle: "icon-detroitblue",
    size: "icon",
    "aria-label": "Edit This",
    children: <FontAwesomeIcon icon={faPenToSquare} />,
  },
};

export const IconError: Story = {
  args: {
    buttonStyle: "icon-error",
    size: "icon",
    "aria-label": "Delete This",
    children: <FontAwesomeIcon icon={faTrash} />,
  },
};

export const IconSuccess: Story = {
  args: {
    buttonStyle: "icon-success",
    size: "icon",
    "aria-label": "Checkmark",
    children: <FontAwesomeIcon icon={faCheck} />,
  },
};

export const IconWarning: Story = {
  args: {
    buttonStyle: "icon-warning",
    size: "icon",
    "aria-label": "Warning",
    children: <FontAwesomeIcon icon={faWarning} />,
  },
};
