import { paths } from "../../../controllers/paths";
import { Card } from "../../common/components/Card";
// prettier-ignore
import { filterProximaCobranca, formatarVencimentoDiaMes } from "../controllers/homeController";

export const CardCobrancaHome = ({
  cobrancas,
  navigate,
  setCobrancaSelecionada,
}) => {
  const { cobrancasEmAberto } = cobrancas || {};
  const semCobrancasPendentes =
    !cobrancasEmAberto || cobrancasEmAberto.length === 0;

  const proximaCobranca = filterProximaCobranca(cobrancas);
  const semProximaCobranca = !proximaCobranca;

  const aoVerTodos = () => {
    navigate(paths.userPagamentos, { replace: true });
  };

  const aoPagarAgora = () => {
    setCobrancaSelecionada(proximaCobranca);
    navigate(paths.userPagamentosEfetivar);
  };

  const renderizarConteudo = () => {
    if (semCobrancasPendentes) {
      return (
        <p className="flex items-center gap-2 text-gray-700">
          <svg
            className="w-5 h-5 text-green-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
          Sem cobranças pendentes! :D
        </p>
      );
    }
    if (semProximaCobranca) {
      return (
        <>
          <p className="flex items-center gap-2 text-gray-700">
            <svg
              className="w-5 h-5 text-yellow-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v2m0 4h.01M10.29 3.86l-7.1 12.29A1 1 0 004.1 18h15.8a1 1 0 00.91-1.85l-7.1-12.29a1 1 0 00-1.72 0z"
              />
            </svg>
            Existem cobranças pendentes!
          </p>

          <div className="flex mt-3">
            <button
              className="flex-1 bg-yellow-400 text-black font-semibold px-4 py-2 rounded-2xl"
              onClick={aoVerTodos}
            >
              Ver pagamentos atrasados
            </button>
          </div>
        </>
      );
    }
    return (
      <>
        <p className="bg-yellow-300 text-black font-medium px-3 py-2 rounded-2xl mb-4">
          Vencimento em {formatarVencimentoDiaMes(proximaCobranca.vencimento)}
        </p>
        <div className="flex gap-4">
          <button
            className="flex-1 bg-red-600 text-white font-semibold px-4 py-2 rounded-2xl"
            onClick={aoPagarAgora}
          >
            Pagar agora
          </button>
          <button
            className="flex-1 bg-blue-900 text-white font-semibold px-4 py-2 rounded-2xl"
            onClick={aoVerTodos}
          >
            Ver todos
          </button>
        </div>
      </>
    );
  };

  return (
    <Card>
      <h2 className="text-lg font-semibold mb-2">Pagamentos</h2>
      {renderizarConteudo()}
    </Card>
  );
};
