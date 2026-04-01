import { restRequest } from "../../../controllers/restController";
import { scheduleTokenCheck } from "../../../controllers/scheduleTokenCheck";

export const loginUsuario = async ({
  cpf,
  senha,
  saveAluno,
  saveUsuario,
  saveToken,
  saveAvisos,
}) => {
  try {
    const result = await restRequest("/auth/login", {
      method: "POST",
      body: JSON.stringify({ cpf, senha }),
    });

    saveToken(result.data.token);
    saveUsuario(result.data.tipoUsuario);

    scheduleTokenCheck();

    const alunoInfo = await alunoInitialInfo(cpf);
    const avisosInfo = await avisosList();
    saveAluno(alunoInfo.data);
    saveAvisos(avisosInfo.data);

    return result;
  } catch (error) {
    console.error("Erro no login:", error.message);
    let message;
    if (error.status == 400) message = "Credenciais inválidas";
    else message = "Erro inesperado. Tente novamente mais tarde.";
    throw new Error(message);
  }
};

const alunoInitialInfo = async (cpf) => {
  try {
    const result = await restRequest(`/api/aluno/consultar/${cpf}`, {
      method: "GET",
    });

    return result;
  } catch (error) {
    console.error("Erro ao consultar informaçoes do aluno:", error.message);
    throw new Error("Erro inesperado. Tente novamente mais tarde.");
  }
};

const avisosList = async () => {
  try {
    const result = await restRequest("/api/evento/listar", {
      method: "GET",
    });

    return result;
  } catch (error) {
    console.error("Erro ao consultar lista de eventos:", error.message);
    throw new Error("Erro inesperado. Tente novamente mais tarde.");
  }
};
