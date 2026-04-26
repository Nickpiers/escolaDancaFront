export const mascararCPF = (cpf) => {
  if (!cpf) return "";

  const ultimos4 = cpf.slice(-4);
  const prefixo = cpf.slice(0, -4);

  const prefixoMascarado = prefixo.replace(/\d/g, "x");

  const combinado = prefixoMascarado + ultimos4;

  const p = combinado;
  return `${p.slice(0, 3)}.${p.slice(3, 6)}.${p.slice(6, 9)}-${p.slice(9, 11)}`;
};

export const formatarDiaMes = (dataISO) => {
  if (!dataISO) return "";
  // eslint-disable-next-line no-unused-vars
  const [ano, mes, dia] = dataISO.split("-");
  return `${dia}/${mes}`;
};

export const formatarDataCompleta = (dataISO) => {
  if (!dataISO) return "";
  const [ano, mes, dia] = dataISO.split("-");
  return `${dia}/${mes}/${ano}`;
};

export const formataValor = (valor) => {
  if (valor == null) return "-";
  const num =
    typeof valor === "number" ? valor : Number(String(valor).replace(",", "."));
  if (Number.isNaN(num)) return valor;
  return num.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
};
