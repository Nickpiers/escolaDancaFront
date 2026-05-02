import { restRequest } from "../../../controllers/restController";

export const pagarCobranca = async ({ idCobranca }) => {
  try {
    const result = await restRequest(`/api/cobranca/pagar/${idCobranca}`, {
      method: "POST",
    });

    return result;
  } catch (error) {
    console.error("Erro ao pagar cobrança:", error.message);
    throw new Error("Erro inesperado. Tente novamente mais tarde.");
  }
};

export const listarCobrancas = async ({ idUsuario }) => {
  const hoje = new Date().toISOString().split("T")[0];

  try {
    const result = await restRequest(
      `/api/cobranca/historico/${idUsuario}?dataInicio=${hoje}`,
      {
        method: "GET",
      },
    );

    return result;
  } catch (error) {
    console.error("Erro ao listar cobrancas:", error.message);
    throw new Error("Erro inesperado. Tente novamente mais tarde.");
  }
};
