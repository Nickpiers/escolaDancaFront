import { useLocation, useNavigate } from "react-router-dom";

import { HomeIcon, UserIcon } from "@heroicons/react/24/outline";
import { paths } from "../../../controllers/paths";

export const AdminBottomNavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  const mudarPath = (path) => {
    if (location.pathname !== path) {
      navigate(path, { replace: true });
    }
  };

  const classNameButton = (path) =>
    `flex flex-col items-center gap-1 ${
      isActive(path) ? "text-green-600" : "text-blue-900"
    }`;

  return (
    <nav className="fixed bottom-0 w-full bg-white shadow-md border-t border-gray-200">
      <div className="flex justify-around py-2">
        <button
          onClick={() => mudarPath(paths.adminHome)}
          className={classNameButton(paths.adminHome)}
        >
          <HomeIcon className="h-6 w-6" />
          <span className="text-xs">Home</span>
        </button>

        <button
          onClick={() => mudarPath(paths.perfil)}
          className={classNameButton(paths.perfil)}
        >
          <UserIcon className="h-6 w-6" />
          <span className="text-xs">Conta</span>
        </button>
      </div>
    </nav>
  );
};
