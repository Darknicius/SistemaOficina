export interface Cliente {
    nome: string,
    celular: string,
    telefone?: string,
    cep: string,
    cidade: string,
    estado: string,
    endereco: string,
    bairro: string,
    numero?: string,
    complemento?: string,
};

export interface ClienteAPI extends Cliente {
  id: number;
  status: boolean;
  created_at: string;
  updated_at: string;
}