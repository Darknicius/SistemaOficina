import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router";

import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import Input from "../../components/form/input/InputField";
import Button from "../../components/ui/button/Button";
import ComponentCard from "../../components/common/ComponentCard";
import Label from "../../components/form/Label";

// import { useVeiculos } from "../../hooks/useVeiculos";

import { Veiculo } from "../../types/veiculo";

export default function VeiculosAdd() {
    const navigate = useNavigate();

    // const { createVeiculo } = useVeiculos();

    const [formData, setFormData] = useState<Veiculo>({
        clienteId: 0,

        placa: "",
        marca: "",
        modelo: "",
        ano: new Date().getFullYear(),
        cor: "",
    });

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]:
                name === "clienteId" || name === "ano"
                    ? Number(value)
                    : value,
        }));
    }

    // Máscara simples para placa
    function handlePlaca(e: ChangeEvent<HTMLInputElement>) {
        const value = e.target.value
            .toUpperCase()
            .replace(/[^A-Z0-9]/g, "")
            .slice(0, 7);

        let placaFormatada = value;

        if (value.length > 3) {
            placaFormatada = `${value.slice(0, 3)}-${value.slice(3)}`;
        }

        setFormData((prev) => ({
            ...prev,
            placa: placaFormatada,
        }));
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            // const res = await createVeiculo(formData);

            // if (res) {
            //     alert("Veículo cadastrado com sucesso!");
            //     navigate("/veiculos");
            // }

            console.log(formData);

        } catch (error) {
            console.error("Erro ao cadastrar veículo:", error);
        }
    };

    return (
        <div>
            <PageMeta
                title="Cadastro de Veículos"
                description="Cadastro de veículos"
            />

            <PageBreadcrumb pageTitle="Veículos" />

            <div className="grid grid-cols-1 gap-6">
                <div className="space-y-6">
                    <ComponentCard title="Cadastro de Veículos">

                        <form
                            onSubmit={handleSubmit}
                            className="space-y-6"
                        >

                            {/* CLIENTE */}
                            <div>
                                <Label>ID do Cliente *</Label>

                                <Input
                                    type="number"
                                    name="clienteId"
                                    placeholder="Insira o ID do cliente"
                                    value={formData.clienteId}
                                    onChange={handleChange}
                                />
                            </div>

                            {/* DADOS DO VEÍCULO */}
                            <div className="grid grid-cols-2 gap-4">

                                <div>
                                    <Label>Placa *</Label>

                                    <Input
                                        type="text"
                                        name="placa"
                                        placeholder="ABC-1234"
                                        value={formData.placa}
                                        onChange={handlePlaca}
                                    />
                                </div>

                                <div>
                                    <Label>Ano *</Label>

                                    <Input
                                        type="number"
                                        name="ano"
                                        placeholder="2025"
                                        value={formData.ano}
                                        onChange={handleChange}
                                    />
                                </div>

                            </div>

                            <div className="grid grid-cols-2 gap-4">

                                <div>
                                    <Label>Marca *</Label>

                                    <Input
                                        type="text"
                                        name="marca"
                                        placeholder="Ex: Volkswagen"
                                        value={formData.marca}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div>
                                    <Label>Modelo *</Label>

                                    <Input
                                        type="text"
                                        name="modelo"
                                        placeholder="Ex: Gol"
                                        value={formData.modelo}
                                        onChange={handleChange}
                                    />
                                </div>

                            </div>

                            <div>
                                <Label>Cor</Label>

                                <Input
                                    type="text"
                                    name="cor"
                                    placeholder="Ex: Prata"
                                    value={formData.cor || ""}
                                    onChange={handleChange}
                                />
                            </div>

                            {/* BOTÕES */}
                            <div className="flex justify-end gap-3">

                                <Button
                                    size="sm"
                                    variant="outline"
                                    type="button"
                                    onClick={() => navigate("/veiculos")}
                                >
                                    Cancelar
                                </Button>

                                <Button
                                    size="sm"
                                    variant="primary"
                                    type="submit"
                                >
                                    Cadastrar Veículo
                                </Button>

                            </div>

                        </form>

                    </ComponentCard>
                </div>
            </div>
        </div>
    );
}