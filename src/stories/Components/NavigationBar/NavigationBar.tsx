import { PropsWithChildren, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLifeRing,
  faMegaphone,
  faCaretRight,
  faCaretLeft,
} from "@fortawesome/pro-duotone-svg-icons";

import "./navigationBar.css";

import GenesisFullLogo from "../../../assets/RPM_Genesis_Logo_Full.svg?react";
import GenesisLogo from "../../../assets/RPM_Genesis_Logo.svg?react";
import NavigationLink from "../NavigationLink/NavigationLink";

/**
 * Primary UI component for user interaction
 */

const NavigationBar = (props: PropsWithChildren) => {
  const navRef = useRef<HTMLDivElement>(null);
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);

  return (
    <nav
      className={`flex h-screen flex-col overflow-hidden whitespace-nowrap transition-all duration-700 ${
        isNavCollapsed ? "closed w-13" : "opened w-60"
      }`}
      ref={navRef}
    >
      <div className="h-32">
        <GenesisLogo
          title="RPM Genesis Logo"
          className={`${
            isNavCollapsed ? "m-2 w-9 opacity-100" : "w-0 opacity-0"
          } transition-all duration-700`}
        />

        <GenesisFullLogo
          title="RPM Genesis Logo"
          className={`${
            isNavCollapsed ? "w-0 opacity-0" : "w-54 m-2 opacity-100"
          } transition-all duration-700`}
        />
      </div>

      <div className="relative grow">
        {props.children}

        <div className="absolute inset-y-0 right-1 top-2/4">
          <button
            onClick={() => setIsNavCollapsed((collapsed) => !collapsed)}
            className="text-xl text-white"
            title="Collapse Navigation"
          >
            <FontAwesomeIcon
              icon={isNavCollapsed ? faCaretRight : faCaretLeft}
            />
          </button>
        </div>
      </div>

      <hr className="mb-4 border border-white" />

      <div className="mb-4 text-white">
        <ul>
          <li>
            <NavigationLink
              as="a"
              href="#"
              name="Feedback"
              icon={faMegaphone}
            />
          </li>
          <li>
            <NavigationLink
              as="a"
              href="#"
              name="RPM Help Desk"
              icon={faLifeRing}
            />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavigationBar;
