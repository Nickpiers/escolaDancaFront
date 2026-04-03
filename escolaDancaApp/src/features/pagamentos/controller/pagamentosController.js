export const formatarVencDiaMes = (dataISO) => {
  if (!dataISO) return "";
  // eslint-disable-next-line no-unused-vars
  const [ano, mes, dia] = dataISO.split("-");
  return `${dia}/${mes}`;
};

export const formataValor = (valor) => {
  if (valor == null) return "-";
  const num =
    typeof valor === "number" ? valor : Number(String(valor).replace(",", "."));
  if (Number.isNaN(num)) return valor;
  return num.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
};
