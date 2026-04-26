import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { Header } from "../../common/components/Header";
import { paths } from "../../../controllers/paths";

export const TelaNenhumEvento = ({ navigate }) => {
  return (
    <>
      <Header arrowGoBack />
      <main className="max-w-[800px] mx-auto p-6 pb-32">
        <div className="bg-white shadow-md rounded-lg p-8 text-center">
          <ExclamationTriangleIcon className="w-12 h-12 mx-auto text-amber-500 mb-4" />
          <h1 className="text-2xl font-semibold mb-2">
            Nenhum evento encontrado
          </h1>
          <p className="text-gray-600 mb-6">
            Não há eventos disponíveis para deletar no momento.
          </p>
          <div className="flex justify-center gap-3">
            <button
              onClick={() => navigate(paths.adminCriarEvento)}
              className="inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
            >
              Criar novo evento
            </button>
            <button
              onClick={() => navigate(paths.adminHome, { replace: true })}
              className="inline-flex items-center gap-2 border border-gray-200 px-4 py-2 rounded-md hover:bg-gray-50 transition"
            >
              Voltar
            </button>
          </div>
        </div>
      </main>
    </>
  );
};
