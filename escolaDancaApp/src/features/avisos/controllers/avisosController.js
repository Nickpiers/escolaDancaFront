export const formatarAvisoDiaMes = (dataISO) => {
  if (!dataISO) return "";
  // eslint-disable-next-line no-unused-vars
  const [ano, mes, dia] = dataISO.split("-");
  return `${dia}/${mes}`;
};
