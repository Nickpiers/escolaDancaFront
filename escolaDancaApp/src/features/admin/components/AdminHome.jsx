import { useNavigate } from "react-router-dom";
import { useUser } from "../../../UserContext";
import { Card } from "../../common/components/Card";
import { Header } from "../../common/components/Header";

// prettier-ignore
import { PlusCircleIcon, TrashIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { paths } from "../../../controllers/paths";

export const AdminHome = () => {
  const navigate = useNavigate();
  const { usuario } = useUser();

  const renderizarCard = (titulo, iconComponent, onClick) => (
    <Card
      className="flex flex-row items-center justify-between p-4 mb-4"
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        {iconComponent}
        <h2 className="text-lg font-semibold">{titulo}</h2>
      </div>
      <ArrowRightIcon className="w-6 h-6 text-gray-600" />
    </Card>
  );

  return (
    <>
      <Header />
      <main className="max-w-[800px] mx-auto p-6">
        <p className="text-3xl font-bold text-indigo-700 mb-6">
          Olá {usuario.nome}!
        </p>
        <h2 className="text-lg font-medium text-gray-700 mb-3 tracking-wide">
          O que deseja fazer?
        </h2>
        {renderizarCard(
          "Criar Evento",
          <PlusCircleIcon className="w-8 h-8 text-green-600" />,
          () => navigate(paths.adminCriarEvento),
        )}
        {renderizarCard(
          "Deletar Evento",
          <TrashIcon className="w-8 h-8 text-red-600" />,
          () => navigate(paths.adminDeletarEvento),
        )}
      </main>
    </>
  );
};
