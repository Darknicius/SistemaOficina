import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router";

import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import Input from "../../components/form/input/InputField";
import Select from "../../components/form/Select";
import Button from "../../components/ui/button/Button";
import ComponentCard from "../../components/common/ComponentCard";
import Label from "../../components/form/Label";

import { Produto } from "../../types/produto";
import { useProdutos } from "../../hooks/useProdutos";

export default function ProdutosAdd() {
    const navigate = useNavigate();

    const { createProduto } = useProdutos();

    // Estado do formulário
    const [formData, setFormData] = useState<Produto>({
        codigoInterno: "",
        descricao: "",
        valorVenda: 0,
        valorCusto: 0,
        estoque: 0,
        estoqueMinimo: 0,
        categoria: "",
        observacao: "",
    });

    // Categorias
    const categorias = [
        { value: "suspensao", label: "Suspensão" },
        { value: "ignicao", label: "Ignição" },
        { value: "freio", label: "Freio" },
    ];

    // Campos comuns
    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    // Campos numéricos
    function handleNumber(e: ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: Number(value),
        }));
    }

    // Select categoria
    function handleCategoria(value: string) {
        setFormData((prev) => ({
            ...prev,
            categoria: value,
        }));
    }

    // Submit
    async function handleSubmit(e: FormEvent) {
        e.preventDefault();

        try {
            const res = await createProduto(formData);

            if (res) {
                alert("Produto cadastrado com sucesso!");

                navigate("/produtos");
            }

        } catch (error) {
            console.error("Erro ao cadastrar produto:", error);
        }
    }

    return (
        <div>
            <PageMeta
                title="Cadastro de Produtos"
                description="Página de cadastro de produtos"
            />

            <PageBreadcrumb pageTitle="Produtos" />

            <div className="grid grid-cols-1 gap-6">
                <div className="space-y-6">

                    <ComponentCard title="Cadastro de produtos">

                        {/* FORMULÁRIO */}
                        <form
                            onSubmit={handleSubmit}
                            className="space-y-6"
                        >

                            {/* CÓDIGO + DESCRIÇÃO */}
                            <div className="grid grid-cols-4 gap-3">

                                <div>
                                    <Label htmlFor="inputCodigoInterno">
                                        Código Interno
                                    </Label>
                                    <Input
                                        type="text"
                                        id="inputCodigoInterno"
                                        name="codigoInterno"
                                        placeholder="Insira o código interno"
                                        value={formData.codigoInterno}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="col-span-3">
                                    <Label htmlFor="inputDescricao">
                                        Descrição *
                                    </Label>
                                    <Input
                                        type="text"
                                        id="inputDescricao"
                                        name="descricao"
                                        placeholder="Insira a descrição"
                                        value={formData.descricao}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            {/* CATEGORIA */}
                            <div>
                                <Label>Categoria</Label>
                                <Select
                                    options={categorias}
                                    onChange={handleCategoria}
                                    placeholder="Selecione uma categoria"
                                    defaultValue=""
                                />
                            </div>

                            {/* VALORES */}
                            <div className="grid grid-cols-2 gap-3">
                                <div className="relative">
                                    <Label htmlFor="inputValorCusto">
                                        Custo
                                    </Label>
                                    <Input
                                        type="number"
                                        id="inputValorCusto"
                                        name="valorCusto"
                                        placeholder="0,00"
                                        value={formData.valorCusto}
                                        onChange={handleNumber}
                                        className="pl-[62px]"
                                    />
                                    <span className="absolute top-1/2 left-0 -translate-y-2.5 border-r border-gray-200 px-3 py-2.5 text-gray-500 dark:border-gray-800 dark:text-gray-400">
                                        R$
                                    </span>
                                </div>

                                <div className="relative">
                                    <Label htmlFor="inputValorVenda">
                                        Preço *
                                    </Label>
                                    <Input
                                        type="number"
                                        id="inputValorVenda"
                                        name="valorVenda"
                                        placeholder="0,00"
                                        value={formData.valorVenda}
                                        onChange={handleNumber}
                                        className="pl-[62px]"
                                    />
                                    <span className="absolute top-1/2 left-0 -translate-y-2.5 border-r border-gray-200 px-3 py-2.5 text-gray-500 dark:border-gray-800 dark:text-gray-400">
                                        R$
                                    </span>
                                </div>
                            </div>

                            {/* ESTOQUE */}
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <Label htmlFor="inputEstoque">
                                        Estoque *
                                    </Label>
                                    <Input
                                        type="number"
                                        id="inputEstoque"
                                        name="estoque"
                                        placeholder="Insira a quantidade em estoque"
                                        value={formData.estoque}
                                        onChange={handleNumber}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="inputEstoqueMinimo">
                                        Estoque Mínimo *
                                    </Label>
                                    <Input
                                        type="number"
                                        id="inputEstoqueMinimo"
                                        name="estoqueMinimo"
                                        placeholder="Insira a quantidade mínima"
                                        value={formData.estoqueMinimo}
                                        onChange={handleNumber}
                                    />
                                </div>
                            </div>

                            {/* OBSERVAÇÃO */}
                            <div>

                                <Label htmlFor="inputObservacao">
                                    Observação
                                </Label>
                                <Input
                                    type="text"
                                    id="inputObservacao"
                                    name="observacao"
                                    placeholder="Observações adicionais"
                                    value={formData.observacao}
                                    onChange={handleChange}
                                />
                            </div>

                            {/* BOTÕES */}
                            <div className="flex justify-end gap-3">
                                <Button
                                    size="sm"
                                    variant="outline"
                                    type="button"
                                    onClick={() => navigate("/produtos")}
                                >
                                    Cancelar
                                </Button>
                                <Button
                                    size="sm"
                                    variant="primary"
                                    type="submit"
                                >
                                    Cadastrar Produto
                                </Button>
                            </div>
                        </form>
                    </ComponentCard>
                </div>
            </div>
        </div>
    );
}