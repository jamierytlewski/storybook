import type { Meta, StoryObj } from "@storybook/react";
import Avatar from "./Avatar";

const meta: Meta<typeof Avatar> = {
  title: "Components/Avatar",
  component: Avatar,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Image: Story = {
  args: {
    alt: "Skeletor",
    src: "https://cdn.custom-cursor.com/db/12807/cartoons-skeletor-and-staff-pointer.png",
    size: "medium",
  },
};

export const Small: Story = {
  args: {
    avatarColorBg: "bronze",
    initials: "JD",
    alt: "John Doe",
    size: "small",
  },
};

export const Medium: Story = {
  args: {
    avatarColorBg: "gunmetal",
    initials: "JD",
    alt: "John Doe",
    size: "medium",
  },
};

export const Large: Story = {
  args: {
    avatarColorBg: "bronze",
    initials: "JD",
    alt: "John Doe",
    size: "large",
  },
};

export const Xlarge: Story = {
  args: {
    avatarColorBg: "detroitblue",
    initials: "JD",
    alt: "John Doe",
    size: "xlarge",
  },
};

export const Xxlarge: Story = {
  args: {
    avatarColorBg: "darkblue",
    initials: "JD",
    alt: "John Doe",
    size: "xxlarge",
  },
};

export const XxlargeGunMetal: Story = {
  args: {
    avatarColorBg: "gunmetal",
    initials: "JD",
    alt: "John Doe",
    size: "xxlarge",
  },
};

export const XxlargeDetroit: Story = {
  args: {
    avatarColorBg: "detroitblue",
    initials: "JD",
    alt: "John Doe",
    size: "xxlarge",
  },
};
