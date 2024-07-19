import { NavLink } from "react-router-dom";
import type { Meta, StoryObj } from "@storybook/react";
import {
  faBook,
  faBoxTaped,
  faCalendarClock,
  faContactBook,
  faCreditCard,
  faHome,
  faTruck,
  faWrench,
} from "@fortawesome/pro-duotone-svg-icons";

import NavigationBar from "./NavigationBar";
import NavigationLink from "../NavigationLink/NavigationLink";

const meta: Meta<typeof NavigationBar> = {
  title: "Components/NavigationBar",
  component: NavigationBar,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <NavigationBar>
      <ul>
        <li>
          <NavigationLink as={NavLink} to="home" name="Home" icon={faHome} />
        </li>
        <li>
          <NavigationLink
            as={NavLink}
            to="orders"
            name="Orders"
            icon={faBoxTaped}
          >
            <ul>
              <li>
                <NavigationLink.Child
                  as={NavLink}
                  to="orders/create"
                  name="Create Order"
                />
              </li>
            </ul>
          </NavigationLink>
        </li>
        <li>
          <NavigationLink
            as={NavLink}
            to="shipments"
            name="Shipments"
            icon={faTruck}
          />
        </li>
        <li>
          <NavigationLink
            as={NavLink}
            to="offer"
            name="Offer"
            icon={faCreditCard}
          />
        </li>
        <li>
          <NavigationLink
            as={NavLink}
            to="book"
            name="Book"
            icon={faCalendarClock}
          />
        </li>
        <li>
          <NavigationLink
            as={NavLink}
            to="carriers"
            name="Carriers"
            icon={faContactBook}
          >
            <ul>
              <li>
                <NavigationLink.Child
                  as={NavLink}
                  to="carriers/all"
                  name="All Carriers"
                />
              </li>
              <li>
                <NavigationLink.Child
                  as={NavLink}
                  to="carriers/mine"
                  name="My Carriers"
                />
              </li>
            </ul>
          </NavigationLink>
        </li>
        <li>
          <NavigationLink
            as={NavLink}
            to="utilities"
            name="Utilities"
            icon={faWrench}
          >
            <ul>
              <li>
                <NavigationLink.Child
                  as={NavLink}
                  to="utilities/uno"
                  name="Utilities Uno"
                />
              </li>
              <li>
                <NavigationLink.Child
                  as={NavLink}
                  to="utilities/dos"
                  name="Utilities Dos"
                />
              </li>
              <li>
                <NavigationLink.Child
                  as={NavLink}
                  to="utilities/tres"
                  name="Utilities Tres"
                />
              </li>
            </ul>
          </NavigationLink>
        </li>
        <li>
          <NavigationLink as={NavLink} to="data" name="Data" icon={faBook} />
        </li>
      </ul>
    </NavigationBar>
  ),
};
