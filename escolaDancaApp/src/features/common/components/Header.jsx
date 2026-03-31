import { useNavigate } from "react-router-dom";
import "../styles/header.css";

export const Header = ({ arrowGoBack = false }) => {
  const navigate = useNavigate();

  return (
    <header className="header-container">
      {arrowGoBack && (
        <button className="header-back" onClick={() => navigate(-1)}>
          <span className="arrow-left"></span>
        </button>
      )}
      <h1 className="header-title">Escola Dança Studio</h1>
    </header>
  );
};
