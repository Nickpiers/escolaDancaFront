export const formatarVencimentoDiaMes = (dataISO) => {
  if (!dataISO) return "";
  // eslint-disable-next-line no-unused-vars
  const [ano, mes, dia] = dataISO.split("-");
  return `${dia}/${mes}`;
};

export const filterProximoEvento = (eventosList, idProximoEvento) => {
  if (!eventosList || !idProximoEvento) return null;

  return (
    eventosList.find((evento) => evento.idEvento === idProximoEvento) || null
  );
};

export const filterProximaCobranca = (cobrancas) => {
  const { cobrancasEmAberto, idProximaCobranca } = cobrancas || {};
  return (
    cobrancasEmAberto.find(
      (cobranca) => cobranca.idCobranca === idProximaCobranca,
    ) || null
  );
};
