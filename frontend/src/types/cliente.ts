export interface Cliente {
    nome: string,
    celular: string,
    telefone: string | undefined,
    cep: string,
    cidade: string,
    estado: string,
    endereco: string,
    bairro: string,
    numero: string | undefined,
    complemento: string | undefined,
};

export interface ClienteAPI extends Cliente {
  id: number;
  ativo: boolean;
  created_at: string;
  updated_at: string;
}