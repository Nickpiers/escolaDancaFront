import { useState, useEffect } from "react";
import { useHandleLogin } from "../hooks/useHandleLogin";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";
import { paths } from "../../../controllers/paths";

export const Login = () => {
  const navigate = useNavigate();
  const [senha, setSenha] = useState("");

  const { data, error, loading, cpfFormatted, alterarCpf, confirmarLogin } =
    useHandleLogin(senha);

  useEffect(() => {
    if (data?.token && !error) {
      navigate(paths.userHome);
    }
  }, [data, error, navigate]);

  return (
    <div className="login-container">
      <h1 className="login-title">Escola Dança Studio</h1>
      {error && <p className="error-message">{error}</p>}

      <div className="login-inputs">
        <input
          type="text"
          value={cpfFormatted}
          onChange={alterarCpf}
          placeholder="CPF"
          className="login-input"
        />
        <input
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          placeholder="Senha"
          className="login-input"
        />
      </div>

      <div className="login-buttons">
        <button
          className="login-button login"
          onClick={confirmarLogin}
          disabled={loading}
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>
        <button className="login-button register">Registrar</button>
      </div>
    </div>
  );
};
