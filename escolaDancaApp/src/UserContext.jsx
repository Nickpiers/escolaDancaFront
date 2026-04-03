import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [tipoUsuario, setTipoUsuario] = useState(() =>
    localStorage.getItem("tipoUsuario"),
  );
  const [usuario, setUsuario] = useState(() => {
    const storedUsuario = localStorage.getItem("usuario");
    try {
      return storedUsuario ? JSON.parse(storedUsuario) : null;
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

  const saveTipoUsuario = (newTipoUsuario) => {
    setTipoUsuario(newTipoUsuario);
    localStorage.setItem("tipoUsuario", newTipoUsuario);
  };

  const saveUsuario = (newUsuario) => {
    setUsuario(newUsuario);
    localStorage.setItem("usuario", JSON.stringify(newUsuario));
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
    saveTipoUsuario(null);
    setUsuario(null);
    setAvisos(null);
    setCobrancas(null);
    localStorage.removeItem("token");
    localStorage.removeItem("tipoUsuario");
    localStorage.removeItem("usuario");
    localStorage.removeItem("avisos");
    localStorage.removeItem("cobrancas");
  };

  return (
    <UserContext.Provider
      value={{
        // Infos Essenciais
        token,
        tipoUsuario,
        usuario,
        avisos,
        cobrancas,
        saveToken,
        saveTipoUsuario,
        saveUsuario,
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
