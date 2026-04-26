import { Header } from "../../common/components/Header";
// prettier-ignore
import { CalendarDaysIcon, ClockIcon, MapPinIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { useFormCriarEvento } from "../hooks/useFormCriarEvento";
import { useUser } from "../../../UserContext";
import { ModalStatusEvento } from "./ModalEventoCriadoDeletado";
import { useState } from "react";

export const AdminCriarEvento = () => {
  const { saveAvisos } = useUser();
  const {
    form,
    errors,
    handleChange,
    handleTimeBlur,
    handleDateBlur,
    validateRequiredText,
    handleSubmit,
  } = useFormCriarEvento(saveAvisos);

  const [statusModal, setStatusModal] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmitWithStatus = async (e) => {
    e.preventDefault();
    try {
      setStatusModal("loading");
      await handleSubmit(e);
      setStatusModal("sucesso");
    } catch (err) {
      setErrorMsg(err.message || "Não foi possível criar o evento.");
      setStatusModal("erro");
    }
  };

  const closeStatusModal = () => {
    setStatusModal(null);
    setErrorMsg("");
  };

  return (
    <>
      <Header arrowGoBack />
      <main className="max-w-[800px] mx-auto p-6 pb-32">
        <h1 className="text-2xl font-bold mb-6">Criar Novo Evento</h1>

        <form
          onSubmit={handleSubmitWithStatus}
          className="bg-white shadow-md rounded-lg p-6 space-y-5"
        >
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
              <PencilSquareIcon className="w-5 h-5 text-indigo-500" />
              Nome do Evento
            </label>
            <input
              type="text"
              name="nomeEvento"
              value={form.nomeEvento}
              onChange={handleChange}
              onBlur={() => validateRequiredText("nomeEvento", form.nomeEvento)}
              className="w-full border rounded-md p-2 focus:ring-2 focus:ring-indigo-500"
              required
            />
            {errors.nomeEvento && (
              <p className="text-xs text-red-600 mt-1">{errors.nomeEvento}</p>
            )}
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
              <PencilSquareIcon className="w-5 h-5 text-indigo-500" />
              Descrição do Evento
            </label>
            <textarea
              name="descricaoEvento"
              value={form.descricaoEvento}
              onChange={handleChange}
              onBlur={() =>
                validateRequiredText("descricaoEvento", form.descricaoEvento)
              }
              rows={4}
              className="w-full border rounded-md p-2 focus:ring-2 focus:ring-indigo-500"
              required
            />
            {errors.descricaoEvento && (
              <p className="text-xs text-red-600 mt-1">
                {errors.descricaoEvento}
              </p>
            )}
          </div>
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
              <MapPinIcon className="w-5 h-5 text-rose-500" />
              Local do Evento
            </label>
            <input
              type="text"
              name="localEvento"
              value={form.localEvento}
              onChange={handleChange}
              onBlur={() =>
                validateRequiredText("localEvento", form.localEvento)
              }
              className="w-full border rounded-md p-2 focus:ring-2 focus:ring-indigo-500"
              required
            />
            {errors.localEvento && (
              <p className="text-xs text-red-600 mt-1">{errors.localEvento}</p>
            )}
          </div>
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
              <CalendarDaysIcon className="w-5 h-5 text-sky-500" />
              Data do Evento
            </label>
            <input
              type="text"
              name="dataEvento"
              inputMode="numeric"
              pattern="[0-9/]*"
              placeholder="dd/mm/aaaa"
              value={form.dataEvento}
              onChange={handleChange}
              onBlur={handleDateBlur}
              className="w-full border rounded-md p-2 focus:ring-2 focus:ring-indigo-500"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Formato:{" "}
              <span className="font-medium">
                {form.dataEvento || "dd/mm/aaaa"}
              </span>
            </p>
            {errors.dataEvento && (
              <p className="text-xs text-red-600 mt-1">{errors.dataEvento}</p>
            )}
          </div>
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
              <ClockIcon className="w-5 h-5 text-amber-500" />
              Hora do Evento
            </label>
            <input
              type="text"
              name="horaEvento"
              inputMode="numeric"
              pattern="[0-9:]*"
              placeholder="HH:mm"
              value={form.horaEvento}
              onChange={handleChange}
              onBlur={handleTimeBlur}
              className="w-full border rounded-md p-2 focus:ring-2 focus:ring-indigo-500"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Use o formato 24h (ex.: 16:00, 21:30). Digite 21 ou 2130 e será
              formatado automaticamente.
            </p>
            {errors.horaEvento && (
              <p className="text-xs text-red-600 mt-1">{errors.horaEvento}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md"
          >
            Criar Evento
          </button>
        </form>
        {statusModal && (
          <ModalStatusEvento
            tipo="criar"
            status={statusModal}
            mensagemErro={errorMsg}
            closeModal={closeStatusModal}
          />
        )}
      </main>
    </>
  );
};
