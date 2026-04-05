import { useState } from "react";
import { deletarEvento } from "../controllers/adminRestController";

export const useDeletarEventos = (eventosList, avisos, saveAvisos) => {
  const [items, setItems] = useState(eventosList);
  const [deleting, setDeleting] = useState(null);
  const [loadingId, setLoadingId] = useState(null);
  const [error, setError] = useState("");

  const openConfirm = (evento) => {
    setError("");
    setDeleting(evento);
  };

  const closeConfirm = () => {
    setDeleting(null);
    setError("");
  };

  const handleDelete = async () => {
    if (!deleting) return;
    setLoadingId(deleting.idEvento);
    setError("");

    try {
      const res = await deletarEvento({ idEvento: deleting.idEvento });

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(text || "Erro ao deletar evento");
      }

      const newItems = items.filter((it) => it.idEvento !== deleting.idEvento);
      setItems(newItems);

      const newAvisos = { ...(avisos || {}), eventos: newItems };
      if (typeof saveAvisos === "function") {
        saveAvisos(newAvisos);
      }

      setLoadingId(null);
      closeConfirm();
    } catch (err) {
      setLoadingId(null);
      setError(err.message || "Não foi possível deletar o evento.");
    }
  };

  return {
    items,
    deleting,
    error,
    loadingId,
    handleDelete,
    closeConfirm,
    openConfirm,
  };
};
