import { Outlet } from "react-router-dom";
import { BottomNavBar } from "./BottomNavBar";
import { useUser } from "../../../UserContext";
import { AdminBottomNavBar } from "./AdminBottomNavBar";

export const AppLayout = () => {
  const { tipoUsuario } = useUser();

  const isAluno = tipoUsuario === "ALUNO";

  return (
    <div className="min-h-screen pb-16 bg-gray-100">
      <Outlet />
      {isAluno ? <BottomNavBar /> : <AdminBottomNavBar />}
    </div>
  );
};
