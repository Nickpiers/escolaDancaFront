import { useNavigate } from "react-router-dom";
import { useUser } from "../../../UserContext.jsx";
import { Card } from "../../common/components/Card.jsx";
import { Header } from "../../common/components/Header.jsx";

import { filterProximoEvento } from "../controllers/homeController.js";
import { paths } from "../../../controllers/paths.js";
import { CardCobrancaHome } from "./CardCobrancaHome.jsx";
import "../styles/home.css";

export const Home = () => {
  const navigate = useNavigate();
  const {
    usuario,
    cobrancas,
    avisos,
    setAvisoSelecionado,
    setCobrancaSelecionada,
  } = useUser();

  const { eventos: eventosList, idProximoEvento } = avisos || {};
  const proximoEvento = filterProximoEvento(eventosList, idProximoEvento);

  const mostrarDetalhesAviso = () => {
    setAvisoSelecionado(proximoEvento);
    navigate(paths.userDetalhesAvisos);
  };

  return (
    <>
      <Header />
      <div className="home-container">
        <main className="home-main">
          <p className="home-greeting mb-3">Olá {usuario.nome}!</p>
          <CardCobrancaHome
            cobrancas={cobrancas}
            navigate={navigate}
            setCobrancaSelecionada={setCobrancaSelecionada}
          />
          <Card>
            <h2 className="text-lg font-semibold mb-2">Avisos & Novidades</h2>
            {proximoEvento ? (
              <>
                <p className="text-black font-medium mb-2">
                  {proximoEvento.nome}
                </p>
                <p className="text-gray-600" onClick={mostrarDetalhesAviso}>
                  Toque para ver detalhes
                </p>
              </>
            ) : (
              <p className="text-gray-500">Sem novos avisos!</p>
            )}
          </Card>
        </main>
      </div>
    </>
  );
};
