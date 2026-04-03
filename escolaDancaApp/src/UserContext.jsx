import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [usuario, setUsuario] = useState(() => localStorage.getItem("usuario"));
  const [aluno, setAluno] = useState(() => {
    const storedAluno = localStorage.getItem("aluno");
    try {
      return storedAluno ? JSON.parse(storedAluno) : null;
    } catch {
      return null;
    }
  });
  const [avisos, setAvisos] = useState(() => {
    const storedAvisos = localStorage.getItem("avisos");
    try {
      return storedAvisos ? JSON.parse(storedAvisos) : null;
    } catch {
      return null;
    }
  });
  const [cobrancas, setCobrancas] = useState(() => {
    const storedCobrancas = localStorage.getItem("cobrancas");
    try {
      return storedCobrancas ? JSON.parse(storedCobrancas) : null;
    } catch {
      return null;
    }
  });
  const [avisoSelecionado, setAvisoSelecionado] = useState(null);

  const saveToken = (newToken) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
  };

  const saveUsuario = (newUsuario) => {
    setUsuario(newUsuario);
    localStorage.setItem("usuario", newUsuario);
  };

  const saveAluno = (newAluno) => {
    setAluno(newAluno);
    localStorage.setItem("aluno", JSON.stringify(newAluno));
  };

  const saveAvisos = (newAvisos) => {
    setAvisos(newAvisos);
    localStorage.setItem("avisos", JSON.stringify(newAvisos));
  };

  const saveCobrancas = (newCobrancas) => {
    setCobrancas(newCobrancas);
    localStorage.setItem("cobrancas", JSON.stringify(newCobrancas));
  };

  const clearUserData = () => {
    setToken(null);
    setUsuario(null);
    setAluno(null);
    setAvisos(null);
    setCobrancas(null);
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    localStorage.removeItem("aluno");
    localStorage.removeItem("avisos");
    localStorage.removeItem("cobrancas");
  };

  return (
    <UserContext.Provider
      value={{
        // Infos Essenciais
        token,
        usuario,
        aluno,
        avisos,
        cobrancas,
        saveToken,
        saveUsuario,
        saveAluno,
        saveAvisos,
        saveCobrancas,
        clearUserData,
        // Infos Essenciais

        // Infos Utilitarias
        avisoSelecionado,
        setAvisoSelecionado,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useUser = () => useContext(UserContext);
