import { useLocation, useNavigate } from "react-router-dom";

// prettier-ignore
import { HomeIcon, CreditCardIcon, CalendarIcon, BellIcon, UserIcon } from "@heroicons/react/24/outline";
import { paths } from "../../../controllers/paths";

export const BottomNavBar = () => {
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
          onClick={() => mudarPath(paths.userHome)}
          className={classNameButton(paths.userHome)}
        >
          <HomeIcon className="h-6 w-6" />
          <span className="text-xs">Home</span>
        </button>

        <button
          onClick={() => mudarPath(paths.userPagamentos)}
          className={classNameButton(paths.userPagamentos)}
        >
          <CreditCardIcon className="h-6 w-6" />
          <span className="text-xs">Pag.</span>
        </button>

        {/* <button
          onClick={() => mudarPath(paths.userHome)}
          className={classNameButton()}
        >
          <CalendarIcon className="h-6 w-6" />
          <span className="text-xs">Grade</span>
        </button> */}

        <button
          onClick={() => mudarPath(paths.userAvisos)}
          className={classNameButton(paths.userAvisos)}
        >
          <BellIcon className="h-6 w-6" />
          <span className="text-xs">Avisos</span>
        </button>

        <button
          onClick={() => mudarPath(paths.userPerfil)}
          className={classNameButton(paths.userPerfil)}
        >
          <UserIcon className="h-6 w-6" />
          <span className="text-xs">Conta</span>
        </button>
      </div>
    </nav>
  );
};
