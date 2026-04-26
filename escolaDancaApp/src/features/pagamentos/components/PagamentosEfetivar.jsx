// prettier-ignore
import { formatarDataCompleta, formataValor, mascararCPF } from "../../../controllers/commonController";
import { useUser } from "../../../UserContext";
import { Card } from "../../common/components/Card";
import { Header } from "../../common/components/Header";

export const PagamentosEfetivar = () => {
  const { usuario, cobrancaSelecionada } = useUser();

  const renderizarInfos = (titulo, valor) => (
    <div className="flex items-center gap-2">
      <span className="font-medium text-gray-700">{titulo}</span>
      <span className="text-gray-600">{valor}</span>
    </div>
  );

  return (
    <>
      <Header arrowGoBack />
      <main className="max-w-[800px] mx-auto p-6 pb-32">
        <Card className="bg-white shadow-lg rounded-xl p-6">
          <h1 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">
            Pagamento Boleto
          </h1>
          <div className="space-y-2">
            {renderizarInfos("CPF:", mascararCPF(usuario.cpf))}
            {renderizarInfos("Nome:", usuario.nome)}
            {renderizarInfos("Email:", usuario.email)}
            {renderizarInfos(
              "Valor total:",
              formataValor(cobrancaSelecionada.totalCobranca),
            )}
            {renderizarInfos(
              "Vencimento:",
              formatarDataCompleta(cobrancaSelecionada.vencimento),
            )}
          </div>
        </Card>
      </main>
      <div
        className="fixed inset-x-0 bottom-0 z-50 bg-transparent p-4"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <div className="max-w-[800px] mx-auto mb-12 px-6">
          <button
            type="button"
            className="w-full py-3 rounded-2xl bg-rose-600 text-white text-lg font-semibold shadow-lg hover:bg-rose-700 transition"
          >
            Pagar
          </button>
        </div>
      </div>
    </>
  );
};
