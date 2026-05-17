export interface Funcionario {
    nome: string;
    email?: string;
    celular?: string;
    cargo: string;
    salario?: number;
}

export interface FuncionarioAPI extends Funcionario {
    id: number;
    status: boolean;
    created_at: string;
    updated_at: string;
}