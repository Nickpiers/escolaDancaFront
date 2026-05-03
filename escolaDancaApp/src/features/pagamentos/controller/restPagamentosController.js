import { BASE_URL, restRequest } from "../../../controllers/restController";

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

export const baixarComprovante = async ({
  cpf,
  nome,
  email,
  valorTotal,
  valorPago,
  dataPagamento,
}) => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(`${BASE_URL}/api/cobranca/comprovante`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({
        cpf,
        nome,
        email,
        valorTotal,
        valorPago,
        dataPagamento,
      }),
    });

    if (!response.ok) {
      throw new Error("Erro ao baixar comprovante");
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `comprovante.pdf`;
    a.click();
    a.remove();
  } catch (error) {
    console.error("Erro ao baixar comprovante:", error.message);
    throw error;
  }
};
