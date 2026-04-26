import { useState } from "react";

// prettier-ignore
import { convertDDMMYYYYToISODate, formatDateWhileTyping, formatTimeWhileTyping, isValidDateDDMMYYYY, isValidTime, normalizeDateOnBlur, normalizeTimeOnBlur } from "../controllers/adminController";
import { criarEvento, listarEventos } from "../controllers/adminRestController";

export const useFormCriarEvento = (saveAvisos) => {
  const [form, setForm] = useState({
    nomeEvento: "",
    descricaoEvento: "",
    localEvento: "",
    dataEvento: "",
    horaEvento: "",
  });

  const [errors, setErrors] = useState({
    nomeEvento: "",
    descricaoEvento: "",
    localEvento: "",
    dataEvento: "",
    horaEvento: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "horaEvento") {
      const formatted = formatTimeWhileTyping(value);
      setForm((s) => ({ ...s, horaEvento: formatted }));
      setErrors((err) => ({ ...err, horaEvento: "" }));
      return;
    }

    if (name === "dataEvento") {
      const formatted = formatDateWhileTyping(value);
      setForm((s) => ({ ...s, dataEvento: formatted }));
      setErrors((err) => ({ ...err, dataEvento: "" }));
      return;
    }

    setForm((s) => ({ ...s, [name]: value }));
    setErrors((err) => ({ ...err, [name]: "" }));
  };

  const handleTimeBlur = () => {
    const normalized = normalizeTimeOnBlur(form.horaEvento);
    setForm((s) => ({ ...s, horaEvento: normalized }));
    if (!isValidTime(normalized)) {
      setErrors((err) => ({
        ...err,
        horaEvento: "Horário inválido. Use HH:mm (24h).",
      }));
    } else {
      setErrors((err) => ({ ...err, horaEvento: "" }));
    }
  };

  const handleDateBlur = () => {
    const normalized = normalizeDateOnBlur(form.dataEvento);
    setForm((s) => ({ ...s, dataEvento: normalized }));
    if (!isValidDateDDMMYYYY(normalized)) {
      setErrors((err) => ({
        ...err,
        dataEvento: "Data inválida. Use dd/mm/aaaa.",
      }));
    } else {
      setErrors((err) => ({ ...err, dataEvento: "" }));
    }
  };

  const validateRequiredText = (fieldName, value) => {
    if (!value || value.trim() === "") {
      setErrors((err) => ({ ...err, [fieldName]: "Campo obrigatório." }));
      return false;
    }
    setErrors((err) => ({ ...err, [fieldName]: "" }));
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nomeOk = validateRequiredText("nomeEvento", form.nomeEvento);
    const descOk = validateRequiredText(
      "descricaoEvento",
      form.descricaoEvento,
    );
    const localOk = validateRequiredText("localEvento", form.localEvento);

    const dataNormalized = normalizeDateOnBlur(form.dataEvento);
    const dataOk = isValidDateDDMMYYYY(dataNormalized);
    if (!dataOk)
      setErrors((err) => ({
        ...err,
        dataEvento: "Data inválida. Use dd/mm/aaaa.",
      }));

    const timeNormalized = normalizeTimeOnBlur(form.horaEvento);
    const horaOk = isValidTime(timeNormalized);
    if (!horaOk)
      setErrors((err) => ({
        ...err,
        horaEvento: "Horário inválido. Use HH:mm (24h).",
      }));

    if (!nomeOk || !descOk || !localOk || !dataOk || !horaOk) return;

    const isoDate = convertDDMMYYYYToISODate(dataNormalized);
    const momentoLocal = `${isoDate}T${timeNormalized}:00`;

    const payload = {
      nomeEvento: form.nomeEvento.trim(),
      descricaoEvento: form.descricaoEvento.trim(),
      localEvento: form.localEvento.trim(),
      momentoEvento: momentoLocal,
    };

    try {
      await criarEvento(payload);
      const { data: eventos } = await listarEventos();

      saveAvisos(eventos);
    } catch (error) {
      console.error("Erro ao criar evento:", error.message);
    }
  };

  return {
    form,
    errors,
    handleChange,
    handleTimeBlur,
    handleDateBlur,
    validateRequiredText,
    handleSubmit,
  };
};
