import Bottombar from "@/components/shared/Bottombar";
import Leftsidebar from "@/components/shared/Leftsidebar";
import TopUpperbar from "@/components/shared/TopUpperbar";
import { Outlet } from "react-router-dom";

function RootLayout() {
  return (
    <div className="w-full md:flex">
      <TopUpperbar />
      <Leftsidebar />

      <section className="flex flex-1 h-full">
        <Outlet />
      </section>

      <Bottombar />
    </div>
  );
}

export default RootLayout;
