export const formatCep = (value: string) => {
  return value
    .replace(/\D/g, "")
    .replace(/^(\d{5})(\d)/, "$1-$2")
    .slice(0, 9);
};

export const formatTelefone = (value: string) => {
  const numeros = value.replace(/\D/g, "").slice(0, 10);

  return numeros
    .replace(/^(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{4})(\d)/, "$1-$2");
};

export const formatCelular = (value: string) => {
  const numeros = value.replace(/\D/g, "").slice(0, 11);

  return numeros
    .replace(/^(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2");
};