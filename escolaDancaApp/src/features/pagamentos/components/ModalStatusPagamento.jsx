//prettier-ignore
import { CheckCircleIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";

export const ModalStatusPagamento = ({ closeModal, status, mensagemErro }) => {
  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
    >
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm"
        onClick={closeModal}
      />

      <div className="relative z-10 max-w-md w-full bg-white rounded-lg shadow-lg p-6 text-center">
        <h3 className="text-lg font-semibold mb-4">Efetivar pagamento</h3>

        {status === "loading" && (
          <div className="flex flex-col items-center gap-3">
            <svg
              className="animate-spin w-6 h-6 text-blue-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />

              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              />
            </svg>

            <p className="text-sm text-gray-600">Efetivando pagamento...</p>
          </div>
        )}

        {status === "sucesso" && (
          <div className="flex flex-col items-center gap-3">
            <CheckCircleIcon className="w-8 h-8 text-green-600" />

            <p className="text-sm text-green-700">
              Pagamento realizado com sucesso!
            </p>
          </div>
        )}

        {status === "erro" && (
          <div className="flex flex-col items-center gap-3">
            <ExclamationTriangleIcon className="w-8 h-8 text-red-600" />

            <p className="text-sm text-red-700">{mensagemErro}</p>
          </div>
        )}

        <div className="mt-6 flex justify-center">
          <button
            onClick={closeModal}
            className="px-4 py-2 rounded-md border border-gray-200 hover:bg-gray-50"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
