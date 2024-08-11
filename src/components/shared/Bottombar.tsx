import { bottombarLinks } from "@/constants";
import { INavLink } from "@/types";
import { Link, useLocation } from "react-router-dom";

function Bottombar() {
  const { pathname } = useLocation();

  return (
    <section className="bottom-bar">
      {bottombarLinks.map((navLink: INavLink) => {
        const isActive = pathname == navLink.route;
        return (
          <Link
            key={navLink.label}
            className={`leftsidebar-link group ${
              isActive && "bg-primary-500 rounded-3xl"
            } flex flex-col gap-4 items-center p-4`}
            to={navLink.route}
          >
            <img
              src={navLink.imgURL}
              alt={navLink.label}
              className={`group-hover:invert-white ${
                isActive && "invert-white"
              }`}
            />
            {navLink.label}
          </Link>
        );
      })}
    </section>
  );
}

export default Bottombar;
