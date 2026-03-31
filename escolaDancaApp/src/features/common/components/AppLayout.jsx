import { Outlet } from "react-router-dom";
import { BottomNavBar } from "./BottomNavBar";

export const AppLayout = () => {
  return (
    <div className="min-h-screen pb-16 bg-gray-100">
      <Outlet />
      <BottomNavBar />
    </div>
  );
};
