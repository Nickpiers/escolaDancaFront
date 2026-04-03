import { useNavigate } from "react-router-dom";
import { Card } from "../../common/components/Card";
// prettier-ignore
import { formatarVencDiaMes, formataValor } from "../controller/pagamentosController";
import { paths } from "../../../controllers/paths";

export const CardsPagamentosPagos = ({ cobrancasPagas }) => {
  const navigate = useNavigate();

  if (!cobrancasPagas || cobrancasPagas.length === 0) {
    return <p>Sem cobranças pagas por enquanto! :D</p>;
  }

  const aoVerComprovante = () => {
    navigate(paths.userPagamentosComprovante);
  };

  const renderizrCards = () => {
    return (
      <div className="space-y-4">
        {cobrancasPagas.map((cobranca) => (
          <Card
            key={cobranca.id}
            className="flex flex-row items-center justify-between gap-4 p-4 rounded-xl bg-green-500 border border-green-200 shadow-sm transition-shadow"
          >
            <div className="flex-1 my-2 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6">
                <div className="flex items-center gap-2">
                  <span className="text-lg text-green-700">Venc.</span>
                  <span className="text-lg font-semibold text-green-800">
                    {formatarVencDiaMes(cobranca.vencimento)}
                  </span>
                </div>

                <div className="flex items-center gap-2 mt-1 sm:mt-0">
                  <span className="text-lg text-green-700">Valor</span>
                  <span className="text-lg font-semibold text-green-800">
                    {formataValor(cobranca.totalCobranca)}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex-shrink-0 ml-4 flex items-center gap-2">
              <button
                className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-semibold shadow-sm transition
                    bg-green-800 text-white"
                onClick={aoVerComprovante}
              >
                Comprovante
              </button>
            </div>
          </Card>
        ))}
      </div>
    );
  };

  return <div>{renderizrCards()}</div>;
};
