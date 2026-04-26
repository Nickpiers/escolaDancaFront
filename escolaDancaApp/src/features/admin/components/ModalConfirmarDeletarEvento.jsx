// prettier-ignore
import { ExclamationTriangleIcon, TrashIcon } from "@heroicons/react/24/outline";
import { formatarDataCompleta } from "../../../controllers/commonController";

export const ModalConfirmarDeletarEvento = ({
  closeConfirm,
  deleting,
  error,
  loadingId,
  handleDelete,
}) => {
  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
    >
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm"
        onClick={closeConfirm}
      />
      <div className="relative z-10 max-w-lg w-full bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-start gap-4">
          <div className="bg-amber-100 p-3 rounded-md">
            <ExclamationTriangleIcon className="w-6 h-6 text-amber-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold">Confirmar exclusão</h3>
            <p className="text-sm text-gray-600 mt-2">
              Tem certeza que deseja deletar o evento{" "}
              <span className="font-medium">{deleting.nome}</span> que acontece
              em{" "}
              <span className="font-medium">
                {formatarDataCompleta(deleting.data)}
              </span>{" "}
              às <span className="font-medium">{deleting.hora}</span>?
            </p>

            {error && <p className="text-sm text-red-600 mt-3">{error}</p>}
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={closeConfirm}
            className="px-4 py-2 rounded-md border border-gray-200 hover:bg-gray-50"
          >
            Cancelar
          </button>

          <button
            onClick={handleDelete}
            disabled={loadingId === deleting.idEvento}
            className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {loadingId === deleting.idEvento ? (
              <svg
                className="animate-spin w-4 h-4 text-white"
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
            ) : (
              <TrashIcon className="w-4 h-4" />
            )}
            Confirmar exclusão
          </button>
        </div>
      </div>
    </div>
  );
};
