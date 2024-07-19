import type { Meta, StoryObj } from "@storybook/react";
import Header from "./Header";

const meta = {
  title: "Examples/Header",
  component: Header,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Notifications: Story = {
  args: {
    user: {
      displayName: "Test User",
      mail: "skeletor@rpmmoves.net",
      givenName: "Test",
      surname: "User",
    },
    notificationCount: 1,
  },
};

export const NoNotifications: Story = {
  args: {
    user: {
      displayName: "Test User",
      mail: "he.man@rpmmoves.net",
      givenName: "Test",
      surname: "User",
    },
    notificationCount: 0,
  },
};

export const NotificationWithProfileImage: Story = {
  args: {
    user: {
      displayName: "Test User",
      mail: "he.man@rpmmoves.net",
      givenName: "Test",
      surname: "User",
    },
    profileImage:
      "https://cdn.custom-cursor.com/db/12807/cartoons-skeletor-and-staff-pointer.png",
    notificationCount: 1,
  },
};
