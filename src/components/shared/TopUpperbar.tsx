import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useSignOutAccount } from "@/lib/react-query/quaries-and-mutations";
import { useEffect } from "react";
import { useUserContext } from "@/context/AuthContext";

const TopUpperbar = () => {
  const { mutate: signOut, isSuccess: isLogoutSuccessfull } =
    useSignOutAccount();

  const { user } = useUserContext();

  const navigate = useNavigate();
  useEffect(() => {
    if (isLogoutSuccessfull) navigate(0);
  }, [isLogoutSuccessfull, navigate]);

  return (
    <section className="topbar">
      <div className="flex-between py-4 px-5">
        <Link to="/">
          <img
            src="/assets/images/logo.svg"
            alt="logo"
            width="140"
            height="180"
          />
        </Link>

        <div className="flex gap-4">
        <Button
            variant="ghost"
            className="shad-button_ghost"
            onClick={() => signOut()}
          >
            <img src="/assets/icons/logout.svg" alt="logout" />
          </Button>

          <Link to={`/profile/${user.id}`} className="flex-center gap-3">
            <img
              src={user.imageUrl || "/assets/images/profile-placeholder.svg"}
              alt="profile logo"
              className="h-8 w-8 rounded-full"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TopUpperbar;
