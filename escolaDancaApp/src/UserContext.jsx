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
  const [eventos, setEventos] = useState(() => {
    const storedEventos = localStorage.getItem("eventos");
    try {
      return storedEventos ? JSON.parse(storedEventos) : null;
    } catch {
      return null;
    }
  });

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

  const saveEventos = (newEventos) => {
    setEventos(newEventos);
    localStorage.setItem("eventos", JSON.stringify(newEventos));
  };

  const clearUserData = () => {
    setToken(null);
    setUsuario(null);
    setAluno(null);
    setEventos(null);
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    localStorage.removeItem("aluno");
    localStorage.removeItem("eventos");
  };

  return (
    <UserContext.Provider
      value={{
        token,
        usuario,
        aluno,
        eventos,
        saveToken,
        saveUsuario,
        saveAluno,
        saveEventos,
        clearUserData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useUser = () => useContext(UserContext);
