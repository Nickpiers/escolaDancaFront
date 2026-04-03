export const mascararCPF = (cpf) => {
  if (!cpf) return "";

  const ultimos4 = cpf.slice(-4);
  const prefixo = cpf.slice(0, -4);

  const prefixoMascarado = prefixo.replace(/\d/g, "x");

  const combinado = prefixoMascarado + ultimos4;

  const p = combinado;
  return `${p.slice(0, 3)}.${p.slice(3, 6)}.${p.slice(6, 9)}-${p.slice(9, 11)}`;
};
