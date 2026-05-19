export interface Veiculo {
    clienteId?: number;

    placa: string;
    marca?: string;
    modelo: string;
    ano: number;
    combustivel?: "Gasolina" | "Alcool" | "Flex" | "Diesel";
}

export interface VeiculoAPI extends Veiculo {
    id: number;
    created_at: string;
    updated_at: string;
}