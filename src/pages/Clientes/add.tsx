import { useNavigate } from "react-router";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import Input from "../../components/form/input/InputField";
import Button from "../../components/ui/button/Button";
import ComponentCard from "../../components/common/ComponentCard";
import Label from "../../components/form/Label";
import {
    SearchIcon,
} from "../../icons";

import { formatCep, formatTelefone, formatCelular } from "../../utils/masks";

import { useCep } from "../../hooks/useCep";
import { useState } from "react";


export default function ClientesAdd() {
    const navigate = useNavigate();

    const handleBuscarCep = async () => {
        if (!cep || cep.length < 9) {
            alert("Digite um CEP válido");
            return;
        }

        const data = await getCep(cep);

        if (!data) {
            alert("CEP não encontrado");
            return;
        }

        setForm((prev) => ({
            ...prev,
            ...data,
        }));
    };

    const [cep, setCep] = useState("");

    const [form, setForm] = useState({
        cidade: "",
        estado: "",
        bairro: "",
        endereco: "",
        telefone: "",
        celular: "",
    });

    const { getCep, loading } = useCep();

    return (
        <div>
            <PageMeta
                title="React.js Form Elements Dashboard | TailAdmin - React.js Admin Dashboard Template"
                description="This is React.js Form Elements  Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
            />
            <PageBreadcrumb pageTitle="Clientes" />
            <div className="grid grid-cols-1 gap-6">
                <div className="space-y-6">
                    <ComponentCard title="Cadastro de clientes">
                        <div className="space-y-6">

                            {/* DADOS PESSOAIS */}
                            <div>
                                <Label>Nome</Label>
                                <Input type="text" placeholder="Insira o nome completo" />
                            </div>

                            {/* CONTATO */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label>Celular</Label>
                                    <Input type="text" placeholder="(00) 00000-0000" value={form.celular} onChange={(e) => setForm({...form, celular: formatCelular(e.target.value)})} />
                                </div>
                                <div>
                                    <Label>Telefone</Label>
                                    <Input type="text" placeholder="(00) 0000-0000" value={form.telefone} onChange={(e) => setForm({...form, telefone: formatTelefone(e.target.value)})} />
                                </div>
                            </div>

                            {/* ENDEREÇO */}
                            <div className="grid grid-cols-3 gap-2">
                                <div>
                                    <Label>CEP</Label>
                                    <div className="flex items-stretch gap-2">
                                        <Input type="text" placeholder="00000-000 " value={cep} onChange={(e) => setCep(formatCep(e.target.value))} />
                                        <button
                                            className="w-10 h-10 flex items-center justify-center rounded-lg bg-brand-500 hover:bg-brand-600 transition-colors"
                                            onClick={handleBuscarCep}
                                            disabled={loading}
                                        >
                                            {loading ? (
                                                <span className="animate-spin">⏳</span>
                                            ) : (
                                                <SearchIcon className="w-5 h-5" />
                                            )}
                                        </button>
                                    </div>
                                </div>
                                <div>
                                    <Label>Cidade</Label>
                                    <Input type="text" placeholder="Cidade" value={form.cidade} />
                                </div>
                                <div>
                                    <Label>Estado</Label>
                                    <Input type="text" placeholder="UF" value={form.estado} />
                                </div>
                            </div>

                            <div>
                                <Label>Endereço</Label>
                                <Input type="text" placeholder="Rua, Avenida..." value={form.endereco} />
                            </div>

                            <div>
                                <Label>Bairro</Label>
                                <Input type="text" placeholder="Bairro" value={form.bairro} />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label>Número</Label>
                                    <Input type="text" placeholder="Nº" />
                                </div>
                                <div>
                                    <Label>Complemento</Label>
                                    <Input type="text" placeholder="Opcional" />
                                </div>
                            </div>

                            {/* BOTÕES */}
                            <div className="flex justify-end gap-3">
                                <Button size="sm" variant="primary" onClick={() => navigate("/clientes")}>
                                    Cancelar
                                </Button>
                                <Button size="sm" variant="primary">
                                    Cadastrar Cliente
                                </Button>
                            </div>

                        </div>
                    </ComponentCard>
                </div>
            </div>
        </div>
    );
}
