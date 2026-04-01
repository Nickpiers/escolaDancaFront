import { useNavigate } from "react-router-dom";
import { useUser } from "../../../UserContext";
import { Card } from "../../common/components/Card";
import { Header } from "../../common/components/Header";
import { formatarAvisoDiaMes } from "../controllers/avisosController";
import "../styles/avisos.css";
import { paths } from "../../../controllers/paths";

export const Avisos = () => {
  const navigate = useNavigate();
  const { avisos, setAvisoSelecionado } = useUser();
  const { eventos: eventosList } = avisos || {};

  const mostrarDetalhesAviso = (indexAviso) => {
    setAvisoSelecionado(eventosList[indexAviso]);
    navigate(paths.userDetalhesAvisos);
  };

  const renderAvisos = () => (
    <ul>
      {eventosList.map((evento, index) => (
        <Card key={index}>
          <li className="text-black font-medium mb-2">{`${evento.nome} - ${formatarAvisoDiaMes(evento.data)}`}</li>
          <li
            className="text-gray-600"
            onClick={() => mostrarDetalhesAviso(index)}
          >
            Toque para ver detalhes
          </li>
        </Card>
      ))}
    </ul>
  );

  return (
    <>
      <Header />
      <main className="avisos-container">
        {eventosList ? renderAvisos() : <h1>Sem novos avisos! :D</h1>}
      </main>
    </>
  );
};
