/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import {
  Avatar,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  Navbar,
  NavbarBrand,
  NavbarToggle,
} from "flowbite-react";
import { UserStateProps } from "@/store/interfaces/user.interface";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import DashboardIcon from "@/assets/icons/DashboardIcon";
import PantryIcon from "@/assets/icons/PantryIcon";
import RegistrationIcon from "@/assets/icons/RegistrationIcon";
import { useDispatch } from "react-redux";
import { appApi } from "@/store/slices/appSlice";
import { logoutUser } from "@/store/slices/authSlice";
import { useCallback } from "react";
import { Link } from "react-router-dom";


// import { useGetCurrentSessionQuery } from "@/store/slices/appSlice";

const AuthNavBar = () => {
  const authSlice = useSelector<RootState, UserStateProps>(
    (state) => state.auth.user
  );

  const dispatch = useDispatch();


  // const {data: currentSessionData} = useGetCurrentSessionQuery();

  useEffect(() => {
    const menuButton: any = document.getElementById("menu-button");
    const sideMenu: any = document.querySelector(".side-menu");

    if (menuButton) {
      menuButton.addEventListener("click", () => {
        if (sideMenu.style.transform === "translateX(0)") {
          sideMenu.style.transform = "translateX(-100%)";
        } else {
          sideMenu.style.transform = "translateX(0)";
        }
      });
    }
  }, []);

  const menus = [
    {
      title: "Dashboard",
      link: "dashboard",
      icon: <DashboardIcon />,
      isActive: true,
    },
    {
      title: "Pantry",
      link: "pantry",
      icon: <PantryIcon />,
      isActive: false,
    },
    {
      title: "Registration",
      link: "registration",
      icon: <RegistrationIcon />,
      isActive: false,
    },

  ];

  const handleLogout = useCallback(() => {
    dispatch(appApi.util.resetApiState());
    dispatch(logoutUser());
  }, []);
  
  

  return (
    <Navbar
      fluid
      className="h-[4.125rem] w-full bg-white shadow-custom z-20 top-0 left-0 fixed"
    >
      <NavbarBrand className="md:px-8 px-2 gap-2 md:gap-3" href="/">
        <img src="/assets/icons/app-icon.svg" alt="Logo" />
        <p className="self-center text-black  whitespace-nowrap text-xl md:text-3xl font-semibold dark:text-white">
          Pantry<span className="text-custom-primary-1">Hub</span>
        </p>
      </NavbarBrand>
      <div className="flex md:pr-8 md:order-2 gap-1 md:gap-3">
        <img src="/assets/icons/notifications-icon.svg" alt="Notification" />

        <Dropdown
          arrowIcon={true}
          inline
          label={
            <div className="flex gap-2 md:gap-3">
              <div className="flex flex-col text-start">
                <p className="text-xs font-bold text-custom-primary-1">{`${
                  authSlice?.firstName || "Adeola"
                } ${authSlice?.lastName || "Adams"}`}</p>
                <p className="text-[0.625rem] font-medium">Cafeteria Manager</p>
              </div>
              <Avatar
                alt="User settings"
                img="/assets/images/auth-profile-image.png"
                rounded
              />
            </div>
          }
        >
          <DropdownHeader >
            <span className="block text-sm">Bonnie Green</span>
            <span className="block truncate text-sm font-medium">
              name@flowbite.com
            </span>
          </DropdownHeader>
 
  {menus.map(({ title, link }, index) => (
    <DropdownItem className="w-full" key={index}>
      <Link className="w-full" to={`/${link}`} key={index}>
        <div className="flex w-full">
      {title}
      </div>
      </Link>
    </DropdownItem>
  ))}
  <DropdownDivider />
  <DropdownItem  onClick={()=>{handleLogout}}>Sign out</DropdownItem>
</Dropdown>

      
      </div>
    </Navbar>
  );
};

export default AuthNavBar;
