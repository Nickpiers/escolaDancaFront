import { useNavigate } from "react-router-dom";
import { useUser } from "../../../UserContext";
import { Card } from "../../common/components/Card";
import { Header } from "../../common/components/Header";

import { TrashIcon } from "@heroicons/react/24/outline";
import { formatarDataCompleta } from "../../../controllers/commonController";
import { ModalConfirmarDeletarEvento } from "./ModalConfirmarDeletarEvento";
import { TelaNenhumEvento } from "./TelaNenhumEvento";
import { useDeletarEventos } from "../hooks/useDeletarEventos";

export const AdminDeletarEvento = () => {
  const navigate = useNavigate();
  const { avisos, saveAvisos } = useUser();
  const eventosList = (avisos && avisos.eventos) || [];

  const {
    items,
    deleting,
    error,
    loadingId,
    handleDelete,
    closeConfirm,
    openConfirm,
  } = useDeletarEventos(eventosList, avisos, saveAvisos);

  if (!items || items.length === 0) {
    return <TelaNenhumEvento navigate={navigate} />;
  }

  return (
    <>
      <Header arrowGoBack />
      <main className="max-w-[800px] mx-auto p-6 pb-32">
        <h1 className="text-2xl font-bold mb-6">Deletar Evento</h1>

        <div className="space-y-4">
          {items.map((evento) => (
            <Card
              key={evento.idEvento}
              className="flex flex-row items-center justify-between p-4"
            >
              <div className="flex items-start gap-4">
                <div>
                  <h2 className="text-lg font-semibold">{evento.nome}</h2>
                  <div className="mt-2 flex flex-wrap gap-3 text-sm text-gray-500">
                    <span className="flex items-center gap-2">
                      <span>{formatarDataCompleta(evento.data)}</span>
                    </span>
                    <span className="flex items-center gap-2">
                      <span>{evento.hora}</span>
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => openConfirm(evento)}
                  className="inline-flex items-center gap-2 text-red-600 border border-red-100 hover:bg-red-50 px-3 py-2 rounded-md transition"
                >
                  <TrashIcon className="w-5 h-5" />
                  Deletar
                </button>
              </div>
            </Card>
          ))}
        </div>
        {deleting && (
          <ModalConfirmarDeletarEvento
            closeConfirm={closeConfirm}
            deleting={deleting}
            error={error}
            loadingId={loadingId}
            handleDelete={handleDelete}
          />
        )}
      </main>
    </>
  );
};
