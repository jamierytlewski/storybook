import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBoxTaped,
  faHome,
  faTruck,
  faBell,
} from "@fortawesome/pro-duotone-svg-icons";
import Header from "../Header/Header";
import NavigationBar from "../../Components/NavigationBar/NavigationBar";
import NavigationLink from "../../Components/NavigationLink/NavigationLink";
import Alert from "../../Components/Alert/Alert";

const Page: React.FC = () => {
  const user = {
    displayName: "Skeletor",
    mail: "skeletor@rpmmoves.com",
    givenName: "Skeletor",
    surname: "Skeletor",
  };

  const [profileImage, setProfileImage] = useState<Blob | void>();

  useEffect(() => {
    fetch(
      "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/c63a355b-320b-4545-bb1a-2784c5e61b8d/d9w1fs0-b27e7327-4fc0-470c-9d01-19745a270616.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2M2M2EzNTViLTMyMGItNDU0NS1iYjFhLTI3ODRjNWU2MWI4ZFwvZDl3MWZzMC1iMjdlNzMyNy00ZmMwLTQ3MGMtOWQwMS0xOTc0NWEyNzA2MTYucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.TphepJ6oEuirapWTpBpiepcox30-7UmyEXUjH9IrWYA",
    )
      .then((res) => res.blob())
      .then((res) => setProfileImage(res))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="flex">
      <NavigationBar>
        <NavigationLink as={NavLink} to="home" name="Home" icon={faHome} />
        <NavigationLink
          as={NavLink}
          to="orders"
          name="Orders"
          icon={faBoxTaped}
        >
          <NavigationLink.Child
            as={NavLink}
            to="orders/create"
            name="Create Order"
          />
          <NavigationLink.Child
            as={NavLink}
            to="orders/edit"
            name="Edit Order"
          />
        </NavigationLink>
        <NavigationLink
          as={NavLink}
          to="shipments"
          name="Shipments"
          icon={faTruck}
        >
          <NavigationLink.Child
            as={NavLink}
            to="shipments/create"
            name="Create Shipment"
          />
          <NavigationLink.Child
            as={NavLink}
            to="shipments/edit"
            name="Edit Shipment"
          />
        </NavigationLink>
      </NavigationBar>
      <main className="flex-auto">
        <Header
          user={user}
          notificationCount={1}
          profileImage={URL.createObjectURL(profileImage ?? new Blob())}
        />
        <div className="m-6">
          <Alert type="info" isDismissable={true}>
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faBell} className="h-3.5 w-3.5" />
              You have unread notifications
            </div>
          </Alert>
        </div>
      </main>
    </div>
  );
};

export default Page;
