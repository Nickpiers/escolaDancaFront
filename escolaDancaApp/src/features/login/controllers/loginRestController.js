import { restRequest } from "../../../controllers/restController";
import { scheduleTokenCheck } from "../../../controllers/scheduleTokenCheck";

export const loginUsuario = async ({
  cpf,
  senha,
  saveAluno,
  saveUsuario,
  saveToken,
  saveAvisos,
  saveCobrancas,
}) => {
  try {
    const result = await restRequest("/auth/login", {
      method: "POST",
      body: JSON.stringify({ cpf, senha }),
    });

    const {
      token,
      tipoUsuario,
      aluno,
      eventos: avisos,
      cobrancas,
    } = result.data;

    saveToken(token);
    saveUsuario(tipoUsuario);
    saveAvisos(avisos);

    if (tipoUsuario === "ALUNO") {
      saveAluno(aluno);
      saveCobrancas(cobrancas);
    }

    scheduleTokenCheck();

    return result;
  } catch (error) {
    console.error("Erro no login:", error.message);
    let message;
    if (error.status == 400) message = "Credenciais inválidas";
    else message = "Erro inesperado. Tente novamente mais tarde.";
    throw new Error(message);
  }
};
