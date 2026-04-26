import { useState } from "react";
// prettier-ignore
import { deletarEvento, listarEventos } from "../controllers/adminRestController";

export const useDeletarEventos = (eventosList, saveAvisos) => {
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
      await deletarEvento({ idEvento: deleting.idEvento });
      const { data } = await listarEventos();
      saveAvisos(data.eventos);
      setItems(data.eventos);

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
