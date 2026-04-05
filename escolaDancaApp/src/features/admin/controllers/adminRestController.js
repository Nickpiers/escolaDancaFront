import { restRequest } from "../../../controllers/restController";

export const criarEvento = async ({
  nomeEvento,
  descricaoEvento,
  localEvento,
  momentoEvento,
}) => {
  try {
    const result = await restRequest("/api/evento/criar", {
      method: "POST",
      body: JSON.stringify({
        nomeEvento,
        descricaoEvento,
        localEvento,
        momentoEvento,
      }),
    });

    return result;
  } catch (error) {
    console.error("Erro ao criar evento:", error.message);
    let message;
    if (error.status == 400) message = "Dados inválidos";
    else message = "Erro inesperado. Tente novamente mais tarde.";
    throw new Error(message);
  }
};

export const deletarEvento = async ({ idEvento }) => {
  try {
    const result = await restRequest(`/api/evento/deletar/${idEvento}`, {
      method: "DELETE",
    });

    return result;
  } catch (error) {
    console.error("Erro ao deletar evento:", error.message);
    let message;
    if (error.status == 400)
      message = "Evento não encontrado ou não pode ser deletado";
    else message = "Erro inesperado. Tente novamente mais tarde.";
    throw new Error(message);
  }
};
