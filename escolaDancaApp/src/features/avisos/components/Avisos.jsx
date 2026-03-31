import { useUser } from "../../../UserContext";
import { Card } from "../../common/components/Card";
import { Header } from "../../common/components/Header";
import { formatarAvisoDiaMes } from "../controllers/avisosController";
import "../styles/avisos.css";

export const Avisos = () => {
  const { eventos } = useUser();
  const { eventos: eventosList } = eventos || {};

  const renderAvisos = () => (
    <ul>
      {eventosList.map((evento, index) => (
        <Card key={index}>
          <li className="text-black font-medium mb-2">{`${evento.nome} - ${formatarAvisoDiaMes(evento.data)}`}</li>
          <li className="text-gray-600">Toque para ver detalhes</li>
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
