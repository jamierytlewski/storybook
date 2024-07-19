import HeaderSearchBar from "../HeaderSearchBar/HeaderSearchBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { User } from "../../../models/User";
import { faBell, faChevronDown } from "@fortawesome/pro-duotone-svg-icons";
import Avatar from "../../Components/Avatar/Avatar";

type HeaderProps = {
  user: User;
  notificationCount: number;
  profileImage?: string;
};

const Header = (props: HeaderProps) => {
  return (
    <header className="m-6 flex flex-row flex-nowrap items-center">
      <HeaderSearchBar />
      <div className="relative self-center">
        <FontAwesomeIcon icon={faBell} className="ml-4 text-3xl" />
        {props.notificationCount > 0 && (
          <div className="absolute -right-3 -top-4 text-2xl font-bold text-red-600">
            {props.notificationCount}
          </div>
        )}
      </div>
      <div className="ml-6 w-11">
        <Avatar
          size="medium"
          avatarColorBg="darkblue"
          alt={props.user.displayName || "User"}
          initials={`${props.user.givenName.charAt(0) ?? "?"}${
            props.user.surname.charAt(0) ?? "?"
          }`}
          src={props.profileImage}
        />
      </div>
      <div className="flex-initial self-center font-bold text-black">
        {props.user?.mail}
      </div>
      <div className="ml-2 self-center">
        <FontAwesomeIcon
          icon={faChevronDown}
          className="text-2xl"
          swapOpacity
        />
      </div>
    </header>
  );
};

export default Header;
