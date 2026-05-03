export const BASE_URL = "http://localhost:8080";

export const restRequest = async (endpoint, options = {}) => {
  try {
    const token = localStorage.getItem("token");
    const headers = {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    };
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, {
      headers,
      ...options,
    });

    let json = null;
    if (response.status !== 204) {
      json = await response.json();
    }

    if (
      response.ok &&
      (response.status === 200 ||
        response.status === 201 ||
        response.status === 204 ||
        (json && json.type === "OK"))
    ) {
      return {
        data: json ? json.data : null,
        message: json ? json.message : "Operação realizada com sucesso",
      };
    }

    const error = new Error(json?.message || "Erro desconhecido");
    error.status = response.status;

    if (error.status === 401 || error.message.includes("expired token")) {
      alert("Sessão expirada. Faça login novamente.");
      localStorage.removeItem("token");
      localStorage.removeItem("usuario");
      localStorage.removeItem("aluno");
      window.location.href = "/login";
    }

    throw error;
  } catch (error) {
    if (!error.status) {
      error.status = 0;
      error.message = error.message || "Falha na requisição";
    }
    throw error;
  }
};
