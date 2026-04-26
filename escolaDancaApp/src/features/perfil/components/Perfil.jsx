import { Header } from "../../common/components/Header";
import userProfile from "../../../../public/userProfile.png";
import { useUser } from "../../../UserContext";
import { useNavigate } from "react-router-dom";
import { paths } from "../../../controllers/paths";

export const Perfil = () => {
  const navigate = useNavigate();
  const { usuario } = useUser();
  const nome = usuario.nome || "Usuário";
  const email = usuario.email || "";

  return (
    <>
      <Header />
      <main className="max-w-[800px] mx-auto p-6">
        <div className="flex flex-col items-center mt-8 justify-between">
          <div>
            <img
              src={userProfile}
              alt="Avatar do usuário"
              className="w-40 h-40 rounded-full bg-gray-300"
            />
          </div>

          <h1 className="mt-4 text-center text-3xl font-semibold text-gray-800">
            {nome.toUpperCase()}
          </h1>

          <p className="mt-1 text-center text-xl text-gray-500 break-words">
            {email}
          </p>
        </div>
        <div className="max-w-[800px] mx-auto mt-16 px-6">
          <button
            type="button"
            className="w-full py-3 rounded-2xl bg-blue-900 text-white text-lg font-semibold shadow-lg flex items-center justify-center gap-3"
            onClick={() => navigate(paths.login)}
          >
            <span>Logout</span>
            {/* <img src={logoutIcon} alt="Ícone de logout" className="w-5 h-5" /> */}
          </button>
        </div>
      </main>
    </>
  );
};
