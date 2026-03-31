import { useUser } from "../../../UserContext.jsx";
import { Card } from "../../common/components/Card.jsx";
import { Header } from "../../common/components/Header.jsx";
// prettier-ignore
import { filterProximoEvento, formatarVencimentoDiaMes } from "../controllers/homeController.js";
import "../styles/home.css";

export const Home = () => {
  const { aluno, eventos } = useUser();

  const { nome, ultimaCobranca } = aluno;
  const proximaCobranca = ultimaCobranca.cobrancas[0];

  const { eventos: eventosList, idProximoEvento } = eventos || {};
  const proximoEvento = filterProximoEvento(eventosList, idProximoEvento);

  return (
    <>
      <Header />
      <div className="home-container">
        <main className="home-main">
          <p className="home-greeting mb-3">Olá {nome}!</p>
          <Card>
            <h2 className="text-lg font-semibold mb-2">Pagamentos</h2>
            <p className="bg-yellow-300 text-black font-medium px-3 py-2 rounded-2xl mb-4">
              Mensalidade com vencimento em{" "}
              {formatarVencimentoDiaMes(proximaCobranca.vencimento)}
            </p>
            <div className="flex gap-4">
              <button className="flex-1 bg-red-600 text-white font-semibold px-4 py-2 rounded-2xl">
                Pagar agora
              </button>
              <button className="flex-1 bg-blue-900 text-white font-semibold px-4 py-2 rounded-2xl">
                Ver histórico
              </button>
            </div>
          </Card>

          <Card>
            <h2 className="text-lg font-semibold mb-2">Avisos & Novidades</h2>
            {proximoEvento ? (
              <>
                <p className="text-black font-medium mb-2">
                  {proximoEvento.nome}
                </p>
                <p className="text-gray-600">Toque para ver detalhes</p>
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
