import { PropsWithChildren, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import type { Meta, StoryObj } from "@storybook/react";
import {
  faHome,
  faBoxTaped,
  faAnchor,
} from "@fortawesome/pro-duotone-svg-icons";

import NavigationLink from "./NavigationLink";

const meta: Meta<typeof NavigationLink> = {
  title: "Components/NavigationLink",
  component: NavigationLink,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

// This is just an example showing adding an "active" class to a native Anchor tag
const ActiveAnchorTag = (props: PropsWithChildren<{ href: string }>) => {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const anchorTag = ref.current;

    const onClick = () => anchorTag.classList.add("active");

    anchorTag.addEventListener("click", onClick);
    return () => anchorTag.removeEventListener("click", onClick);
  }, [ref]);

  return <a ref={ref} {...props} />;
};

export const Default: Story = {
  args: {
    name: "Home",
    icon: faHome,
  },
  render: (args) => {
    return (
      <nav>
        <NavigationLink {...args} as={NavLink} to="home" />
      </nav>
    );
  },
};

export const AnchorTagInList: Story = {
  args: {
    name: "Anchor Tag <a>",
    icon: faAnchor,
  },
  render: (args) => {
    return (
      <nav>
        <ul>
          <li>
            <NavigationLink {...args} as="a" href="javascript:;" />
          </li>
        </ul>
      </nav>
    );
  },
};

export const AnchorTagActive: Story = {
  args: {
    name: "Active Anchor Tag <a>",
    icon: faAnchor,
  },
  render: (args) => {
    return (
      <nav>
        <NavigationLink {...args} as={ActiveAnchorTag} href="javascript:;" />
      </nav>
    );
  },
};

export const HasChildren: Story = {
  args: {
    name: "Orders",
    icon: faBoxTaped,
  },
  render: (args) => (
    <nav>
      <NavigationLink {...args} as={NavLink} to="orders">
        <NavigationLink.Child
          as={NavLink}
          to="orders/create"
          name="Create Order"
        />
        <NavigationLink.Child as={NavLink} name="Edit Order" to="orders/edit" />
      </NavigationLink>
    </nav>
  ),
};

export const HasChildrenWithAnchorTag: Story = {
  args: {
    name: "Orders",
    icon: faBoxTaped,
  },
  render: (args) => (
    <nav>
      <NavigationLink {...args} as={NavLink} to="orders">
        <NavigationLink.Child
          as="a"
          href="javascript:;"
          name="Create Order <a>"
        />
        <NavigationLink.Child
          as="a"
          href="javascript:;"
          name="Edit Order <a>"
        />
      </NavigationLink>
    </nav>
  ),
};
