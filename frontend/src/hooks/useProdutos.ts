import { useState, useEffect, useCallback } from "react";
import { Produto, ProdutoAPI } from "../types/produto";

const API_URL = "http://localhost:5000";

export const useProdutos = () => {
    const [produtos, setProdutos] = useState<ProdutoAPI[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // LISTAR PRODUTOS
    const fetchProdutos = useCallback(
        async (search = "") => {

            setLoading(true);
            setError(null);

            try {
                const query = search.trim();

                const res = await fetch(
                    `${API_URL}/produtos?search=${encodeURIComponent(query)}`
                );

                if (!res.ok) {
                    throw new Error("Erro ao buscar produtos");
                }

                const data = await res.json();

                setProdutos(data.produtos ?? []);

            } catch (err: any) {

                setError(
                    err.message ?? "Erro desconhecido"
                );

            } finally {

                setLoading(false);

            }
        },
        []
    );

    // BUSCAR POR ID
    const getProdutoById = useCallback(
        async (id: number): Promise<ProdutoAPI> => {

            const res = await fetch(
                `${API_URL}/produtos/${id}`
            );

            if (!res.ok) {
                throw new Error("Erro ao buscar produto");
            }

            return await res.json();
        },
        []
    );

    // DELETAR
    const deleteProduto = useCallback(
        async (id: number): Promise<boolean> => {

            try {
                const res = await fetch(
                    `${API_URL}/produtos/${id}`,
                    {
                        method: "DELETE",
                    }
                );

                if (!res.ok) {
                    throw new Error("Erro ao deletar produto");
                }

                await fetchProdutos();

                return true;

            } catch (err: any) {

                setError(
                    err.message ?? "Erro ao deletar"
                );

                return false;
            }
        },
        [fetchProdutos]
    );

    // CRIAR
    const createProduto = useCallback(
        async (produto: Produto): Promise<boolean> => {

            try {

                const res = await fetch(
                    `${API_URL}/produtos/adicionar`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(produto),
                    }
                );

                if (!res.ok) {
                    throw new Error("Erro ao criar produto");
                }

                await fetchProdutos();

                return true;

            } catch (err: any) {

                setError(
                    err.message ?? "Erro ao criar"
                );

                return false;
            }
        },
        [fetchProdutos]
    );

    // ATUALIZAR
    const updateProduto = useCallback(
        async (produto: ProdutoAPI): Promise<boolean> => {

            try {

                const res = await fetch(
                    `${API_URL}/produtos/${produto.id}`,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(produto),
                    }
                );

                if (!res.ok) {
                    throw new Error("Erro ao atualizar produto");
                }

                await fetchProdutos();

                return true;

            } catch (err: any) {

                setError(
                    err.message ?? "Erro ao atualizar"
                );

                return false;
            }
        },
        [fetchProdutos]
    );

    useEffect(() => {
        fetchProdutos();
    }, [fetchProdutos]);

    return {
        produtos,
        loading,
        error,

        fetchProdutos,
        getProdutoById,
        deleteProduto,
        createProduto,
        updateProduto,
    };
};