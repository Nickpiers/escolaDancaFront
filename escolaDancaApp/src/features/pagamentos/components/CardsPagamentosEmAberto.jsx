import { useNavigate } from "react-router-dom";
import { Card } from "../../common/components/Card";
// prettier-ignore
import { formatarVencDiaMes, formataValor } from "../controller/pagamentosController";
import { paths } from "../../../controllers/paths";

export const CardsPagamentosEmAberto = ({
  cobrancasEmAberto,
  setCobrancaSelecionada,
}) => {
  const navigate = useNavigate();

  if (!cobrancasEmAberto || cobrancasEmAberto.length === 0) {
    return <p>Tudo em dia por aqui! :D</p>;
  }

  const aoPagarAgora = (index) => {
    setCobrancaSelecionada(cobrancasEmAberto[index]);
    navigate(paths.userPagamentosEfetivar);
  };

  const renderizrCards = () => {
    return (
      <div className="space-y-4">
        {cobrancasEmAberto.map((cobranca, index) => (
          <Card
            key={index}
            className="flex flex-row items-center justify-between gap-4 p-4 rounded-xl bg-white border border-gray-100 shadow-sm transition-shadow"
          >
            <div className="flex-1 my-2 min-w-0">
              {cobranca.statusPagamento === "ATRASADO" && (
                <div className="flex mb-2 items-center gap-3">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-rose-100 text-rose-700">
                    Atrasado
                  </span>
                </div>
              )}
              <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <span className="text-lg text-gray-500">Venc.</span>
                  <span className="text-lg font-semibold text-gray-900">
                    {formatarVencDiaMes(cobranca.vencimento)}
                  </span>
                </div>

                <div className="flex items-center gap-2 mt-1 sm:mt-0">
                  <span className="text-lg text-gray-500">Valor</span>
                  <span className="text-lg font-semibold text-gray-900">
                    {formataValor(cobranca.totalCobranca)}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex-shrink-0 ml-4 flex items-center gap-2">
              <button
                className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-semibold shadow-sm transition
                bg-rose-500 text-white"
                onClick={() => aoPagarAgora(index)}
              >
                Pagar boleto
              </button>
            </div>
          </Card>
        ))}
      </div>
    );
  };

  return <div>{renderizrCards()}</div>;
};
