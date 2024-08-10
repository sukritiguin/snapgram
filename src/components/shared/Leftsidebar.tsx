import { sidebarLinks } from "@/constants";
import { useUserContext } from "@/context/AuthContext";
import { useSignOutAccount } from "@/lib/react-query/quaries-and-mutations";
import { INavLink } from "@/types";
import { useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

function Leftsidebar() {
  const { pathname } = useLocation();
  const { mutate: signOut, isSuccess: isLogoutSuccessfull } =
    useSignOutAccount();

  const { user } = useUserContext();

  const navigate = useNavigate();
  useEffect(() => {
    if (isLogoutSuccessfull) navigate(0);
  }, [isLogoutSuccessfull, navigate]);

  return (
    <nav className="leftsidebar">
      <div className="flex flex-col gap-11">
        <Link to="/">
          <img
            src="/assets/images/logo.svg"
            alt="logo"
            width="140"
            height="180"
          />
        </Link>
        <Link to={`/profile/${user.id}`} className="flex gap-3 items-center">
          <img
            src={user.imageUrl || "/assets/images/profile-placeholder.svg"}
            alt="profile logo"
            className="h-14 w-14 rounded-full"
          />

          <div className="flex flex-col">
            <p className="body-bold">
              {user.name} <br />
            </p>
            <p className="text-gray-600">@{user.username}</p>
          </div>
        </Link>

        <ul className="flex flex-col gap-6">
          {sidebarLinks.map((navLink: INavLink) => {
            const isActive = pathname == navLink.route;
            return (
              <li
                key={navLink.label}
                className={`leftsidebar-link group ${
                  isActive && "bg-primary-500"
                }`}
              >
                <NavLink
                  to={navLink.route}
                  className="flex gap-4 items-center p-4"
                >
                  <img
                    src={navLink.imgURL}
                    alt={navLink.label}
                    className={`group-hover:invert-white ${
                      isActive && "invert-white"
                    }`}
                  />
                  {navLink.label}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
      <Button
        variant="ghost"
        className="shad-button_ghost"
        onClick={() => signOut()}
      >
        <img src="/assets/icons/logout.svg" alt="logout" />
        <p className="small-medium lg:base-medium">Logout</p>
      </Button>
    </nav>
  );
}

export default Leftsidebar;
