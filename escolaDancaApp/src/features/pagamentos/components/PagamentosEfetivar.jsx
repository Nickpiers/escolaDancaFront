import { useState } from "react";
// prettier-ignore
import { formatarDataCompleta, formataValor, mascararCPF } from "../../../controllers/commonController";
import { useUser } from "../../../UserContext";
import { Card } from "../../common/components/Card";
import { Header } from "../../common/components/Header";
import { useHandlePayment } from "../hooks/useHandlePayment";
import { ModalStatusPagamento } from "./ModalStatusPagamento";
import { useNavigate } from "react-router-dom";
import { paths } from "../../../controllers/paths";

export const PagamentosEfetivar = () => {
  const navigate = useNavigate();
  const { usuario, cobrancaSelecionada } = useUser();
  const [statusModal, setStatusModal] = useState(null);

  const { handlePayment, error } = useHandlePayment({
    idUsuario: usuario.idUsuario,
    idCobranca: cobrancaSelecionada.idCobranca,
  });

  const efetivarPagamento = async () => {
    try {
      setStatusModal("loading");

      await handlePayment();

      setStatusModal("sucesso");
    } catch (err) {
      setStatusModal("erro");
      console.error("Erro ao efetivar pagamento:", err);
    }
  };

  const closeStatusModal = () => {
    if (statusModal === "sucesso") {
      setStatusModal(null);
      navigate(paths.userPagamentos);
    }
  };

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
            onClick={efetivarPagamento}
            className="w-full py-3 rounded-2xl bg-rose-600 text-white text-lg font-semibold shadow-lg hover:bg-rose-700 transition"
          >
            Pagar
          </button>
        </div>
      </div>
      {statusModal && (
        <ModalStatusPagamento
          status={statusModal}
          mensagemErro={error}
          closeModal={closeStatusModal}
        />
      )}
    </>
  );
};
