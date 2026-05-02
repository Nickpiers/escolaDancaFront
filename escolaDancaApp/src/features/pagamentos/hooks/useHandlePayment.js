import { useState } from "react";
import { useUser } from "../../../UserContext";
// prettier-ignore
import { listarCobrancas, pagarCobranca } from "../controller/restPagamentosController";

export const useHandlePayment = ({ idUsuario, idCobranca }) => {
  const { saveCobrancas } = useUser();
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState("");

  const handlePayment = async () => {
    setLoading(true);
    setError("");

    try {
      await pagarCobranca({ idCobranca });
      const { data } = await listarCobrancas({ idUsuario });

      saveCobrancas(data);

      setLoading(false);
      return true;
    } catch (err) {
      setLoading(false);
      const mensagem = err.message || "Não foi possível pagar a cobrança.";

      setError(mensagem);

      throw new Error(mensagem);
    }
  };

  return {
    loading,
    error,
    handlePayment,
  };
};
