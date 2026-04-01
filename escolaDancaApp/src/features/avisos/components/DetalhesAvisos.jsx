import { useUser } from "../../../UserContext";
import { Card } from "../../common/components/Card";
import { Header } from "../../common/components/Header";
import { formatarAvisoDataCompleta } from "../controllers/avisosController";
import "../styles/detalhesAvisos.css";

export const DetalhesAvisos = () => {
  const { avisoSelecionado } = useUser();
  const { nome, descricao, data, hora, local } = avisoSelecionado;

  return (
    <>
      <Header arrowGoBack />
      <main className="detalhes-avisos-container">
        <Card className="bg-white shadow-lg rounded-xl p-6">
          <h1 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">
            {nome}
          </h1>
          <p className="text-gray-600 mb-3 leading-relaxed">{descricao}</p>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-700">📅 Data e Hora:</span>
              <span className="text-gray-600">
                {formatarAvisoDataCompleta(data)} às {hora}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-700">📍 Local:</span>
              <span className="text-gray-600">{local}</span>
            </div>
          </div>
        </Card>
      </main>
    </>
  );
};
