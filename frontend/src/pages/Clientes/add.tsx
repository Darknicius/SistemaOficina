import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import Input from "../../components/form/input/InputField";
import Button from "../../components/ui/button/Button";
import ComponentCard from "../../components/common/ComponentCard";
import Label from "../../components/form/Label";
import { SearchIcon, HourglassIcon } from "../../icons";
import { formatCep, formatTelefone, formatCelular } from "../../utils/masks";
import { useClientes } from "../../hooks/useClientes";
import { useCep } from "../../hooks/useCep";
import { Cliente } from "../../types/cliente";

export default function ClientesAdd() {
    const { createCliente, error } = useClientes();
    const navigate = useNavigate();
    const { getCep, loading } = useCep();

    // Estado para armazenar os dados do formulário
    const [formData, setFormData] = useState<Cliente>({
        nome: "",
        celular: "",
        telefone: "",
        cep: "",
        cidade: "",
        estado: "",
        endereco: "",
        bairro: "",
        numero: "",
        complemento: "",
    });

    // Handler para campos sem máscara
    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    // Handlers com máscara para telefone, celular e cep
    function handleCelular(e: ChangeEvent<HTMLInputElement>) {
        setFormData((prev) => ({ ...prev, celular: formatCelular(e.target.value) }));
    }

    function handleTelefone(e: ChangeEvent<HTMLInputElement>) {
        setFormData((prev) => ({ ...prev, telefone: formatTelefone(e.target.value) }));
    }

    function handleCepInput(e: ChangeEvent<HTMLInputElement>) {
        setFormData((prev) => ({ ...prev, cep: formatCep(e.target.value) }));
    }

    // Busca CEP e preenche os campos de endereço
    async function handleBuscarCep() {
        if (!formData.cep || formData.cep.length < 9) {
            alert("Digite um CEP válido");
            return;
        }

        const data = await getCep(formData.cep);

        if (!data) {
            alert("CEP não encontrado");
            return;
        }

        setFormData((prev) => ({ ...prev, ...data }));
    }

    // Envio do formulário para a API
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const res = await createCliente(formData);

            if (res) {
                alert("Cliente cadastrado com sucesso!");
                navigate("/clientes");
            }

        } catch (error) {
            console.error("Erro ao ao criar cliente:", error);
        }
    };

    return (
        <div>
            <PageMeta
                title="Cadastro de Clientes"
                description="Cadastro de clientes"
            />
            <PageBreadcrumb pageTitle="Clientes" />
            <div className="grid grid-cols-1 gap-6">
                <div className="space-y-6">
                    <ComponentCard title="Cadastro de clientes">

                        {/* Formulário de cadastro de clientes */}
                        <form onSubmit={handleSubmit} className="space-y-6">

                            {/* DADOS PESSOAIS */}
                            <div>
                                <Label>Nome *</Label>
                                <Input
                                    type="text"
                                    name="nome"
                                    placeholder="Insira o nome completo"
                                    value={formData.nome}
                                    onChange={handleChange}
                                />
                            </div>

                            {/* CONTATO */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label>Celular *</Label>
                                    <Input
                                        type="text"
                                        name="celular"
                                        placeholder="(00) 00000-0000"
                                        value={formData.celular}
                                        onChange={handleCelular}
                                    />
                                </div>
                                <div>
                                    <Label>Telefone</Label>
                                    <Input
                                        type="text"
                                        name="telefone"
                                        placeholder="(00) 0000-0000"
                                        value={formData.telefone}
                                        onChange={handleTelefone}
                                    />
                                </div>
                            </div>

                            {/* ENDEREÇO */}
                            <div className="grid grid-cols-3 gap-2">
                                <div>
                                    <Label>CEP</Label>
                                    <div className="flex items-stretch gap-2">
                                        <Input
                                            type="text"
                                            name="cep"
                                            placeholder="00000-000"
                                            value={formData.cep}
                                            onChange={handleCepInput}
                                        />
                                        <Button
                                            type="button"
                                            variant="primary"
                                            iconOnly
                                            className="w-10 h-10"
                                            onClick={handleBuscarCep}
                                            disabled={loading}
                                        >
                                            {loading ? (
                                                <HourglassIcon className="w-5 h-5 animate-spin" />
                                            ) : (
                                                <SearchIcon className="w-5 h-5" />
                                            )}
                                        </Button>
                                    </div>
                                </div>
                                <div>
                                    <Label>Cidade</Label>
                                    <Input
                                        type="text"
                                        name="cidade"
                                        placeholder="Cidade"
                                        value={formData.cidade}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <Label>Estado</Label>
                                    <Input
                                        type="text"
                                        name="estado"
                                        placeholder="UF"
                                        value={formData.estado}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div>
                                <Label>Endereço</Label>
                                <Input
                                    type="text"
                                    name="endereco"
                                    placeholder="Rua, Avenida..."
                                    value={formData.endereco}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <Label>Bairro</Label>
                                <Input
                                    type="text"
                                    name="bairro"
                                    placeholder="Bairro"
                                    value={formData.bairro}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label>Número</Label>
                                    <Input
                                        type="text"
                                        name="numero"
                                        placeholder="Nº"
                                        value={formData.numero}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <Label>Complemento</Label>
                                    <Input
                                        type="text"
                                        name="complemento"
                                        placeholder="Opcional"
                                        value={formData.complemento}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            {/* BOTÕES */}
                            <div className="flex justify-end gap-3">
                                <Button
                                    size="sm"
                                    variant="outline"
                                    type="button"
                                    onClick={() => navigate("/clientes")}
                                >
                                    Cancelar
                                </Button>
                                <Button
                                    size="sm"
                                    variant="primary"
                                    type="submit"
                                >
                                    Cadastrar Cliente
                                </Button>
                            </div>

                        </form>
                    </ComponentCard>
                </div>
            </div>
        </div>
    );
}