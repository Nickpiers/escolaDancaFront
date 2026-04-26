import { useEffect, useState } from "react";
import { useRestRequest } from "../../../hooks/useRestRequest";
import { loginUsuario } from "../controllers/loginRestController";
import { useUser } from "../../../UserContext";

export const useHandleLogin = (senha) => {
  const {
    saveToken,
    saveTipoUsuario,
    saveUsuario,
    saveAvisos,
    saveCobrancas,
    clearUserData,
  } = useUser();
  const { data, error, loading, request } = useRestRequest();
  const [cpf, setCpf] = useState("");
  const [cpfFormatted, setCpfFormatted] = useState("");

  const alterarCpf = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    value = value.slice(0, 11);
    setCpf(value);

    let formatted = value;
    if (value.length > 3) {
      formatted = value.slice(0, 3) + "." + value.slice(3);
    }
    if (value.length > 6) {
      formatted = formatted.slice(0, 7) + "." + formatted.slice(7);
    }
    if (value.length > 9) {
      formatted = formatted.slice(0, 11) + "-" + formatted.slice(11);
    }
    setCpfFormatted(formatted);
  };

  const confirmarLogin = async () => {
    await request(() =>
      loginUsuario({
        cpf,
        senha,
        saveToken,
        saveTipoUsuario,
        saveUsuario,
        saveAvisos,
        saveCobrancas,
      }),
    );
  };

  useEffect(() => {
    clearUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data, error, loading, cpfFormatted, alterarCpf, confirmarLogin };
};
