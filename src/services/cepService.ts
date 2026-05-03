export const buscarCep = async (cep: string) => {
  const cleanCep = cep.replace(/\D/g, "");

  if (cleanCep.length !== 8) return null;

  try {
    const res = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
    const data = await res.json();

    if (data.erro) throw new Error("CEP não encontrado");

    return {
      cidade: data.localidade,
      estado: data.uf,
      bairro: data.bairro,
      endereco: data.logradouro,
    };
  } catch (error) {
    console.error("Erro ao buscar CEP:", error);
    return null;
  }
};