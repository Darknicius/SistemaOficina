export interface Produto {
    codigoInterno?: string,
    descricao: string,
    valorVenda: number,
    valorCusto?: number,
    estoque?: number,
    estoqueMinimo?: number,
    categoria?: string,
    observacao?: string,
}

export interface ProdutoAPI extends Produto {
    id: number;
    status: boolean;
    created_at: string;
    updated_at: string;
}
