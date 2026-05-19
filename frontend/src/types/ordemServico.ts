import { Veiculo } from "./veiculo";

export type StatusOS =
  | "Aberta"
  | "Em andamento"
  | "Aguardando Aprovação"
  | "Aguardando peças"
  | "Finalizada"
  | "Entregue"
  | "Cancelada";

export interface ProdutoOS {
  produtoId: number;
  quantidade: number;
  valorUnitario: number;
  valorTotal: number;
}

export interface OrdemServico {
  
  // Cliente
  clienteId: number;

  // Veiculo
  veiculo: Veiculo;

  // Controle da OS
  status: StatusOS;

  // Produtos utilizados
  produtos: ProdutoOS[];

  // Diagnostico
  diagnostico?: string;

  // Mão de obra
  descricaoServico?: string;

  // Valores
  valorProdutos: number;
  valorServico: number;
  valorTotal: number;

  // Observações
  observacoes?: string;

  // Datas
  dataAbertura?: string;
  dataFinalizacao?: string;
}

export interface OrdemServicoAPI extends OrdemServico {
  id: number;
  created_at: string;
  updated_at: string;
}