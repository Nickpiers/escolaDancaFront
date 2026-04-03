import { useState } from "react";
// prettier-ignore
import { PAGAMENTOS_EM_ABERTO, PAGAMENTOS_PAGOS } from "../controller/pagamentosConstants";
import { CardsPagamentosEmAberto } from "./CardsPagamentosEmAberto";
import { useUser } from "../../../UserContext";
import { Header } from "../../common/components/Header";
import { CardsPagamentosPagos } from "./CardsPagamentosPagos";

export const Pagamentos = () => {
  const { cobrancas } = useUser();
  const [statusPagamentos, setStatusPagamentos] =
    useState(PAGAMENTOS_EM_ABERTO);

  const isEmAberto = statusPagamentos === PAGAMENTOS_EM_ABERTO;

  const botoesEmAbertoPago = () => (
    <div className="flex gap-4 px-3 mb-6">
      <button
        aria-pressed={isEmAberto}
        onClick={() => setStatusPagamentos(PAGAMENTOS_EM_ABERTO)}
        className={`flex-1 text-center font-semibold px-4 py-2 rounded-2xl transition-colors duration-150
              ${
                isEmAberto
                  ? "bg-yellow-400 text-black shadow-md"
                  : "bg-white text-blue-700 border border-blue-700"
              }`}
      >
        Em Aberto
      </button>

      <button
        aria-pressed={!isEmAberto}
        onClick={() => setStatusPagamentos(PAGAMENTOS_PAGOS)}
        className={`flex-1 text-center font-semibold px-4 py-2 rounded-2xl transition-colors duration-150
              ${
                !isEmAberto
                  ? "bg-green-800 text-white shadow-md"
                  : "bg-white text-blue-700 border border-blue-700"
              }`}
      >
        Pagos
      </button>
    </div>
  );

  return (
    <>
      <Header />
      <main className="max-w-[800px] mx-auto p-6">
        {botoesEmAbertoPago()}
        {isEmAberto ? (
          <CardsPagamentosEmAberto cobrancasEmAberto={cobrancas.cobrancas} />
        ) : (
          <CardsPagamentosPagos cobrancasPagas={cobrancas.cobrancas} />
        )}
      </main>
    </>
  );
};
