export interface Cliente {
    nome: string,
    celular: string,
    telefone: string | null,
    cep: string,
    cidade: string,
    estado: string,
    endereco: string,
    bairro: string,
    numero: string | null,
    complemento: string | null,
};

export interface ClienteAPI extends Cliente {
  id: number;
  ativo: boolean;
  created_at: string;
  updated_at: string;
}