import { useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";

import {
  TrashBinIcon,
  PencilIcon,
} from "../../icons";

import Badge from "../ui/badge/Badge";
import Button from "../ui/button/Button";
import { Modal } from "../ui/modal";

import { ProdutoAPI } from "../../types/produto";
import { useProdutos } from "../../hooks/useProdutos";

interface TabelaProdutosProps {
  onEdit?: (produto: ProdutoAPI) => void;
}

export default function TabelaProdutos({
  onEdit,
}: TabelaProdutosProps) {

  const {
    produtos,
    loading,
    deleteProduto,
  } = useProdutos();

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedProduto, setSelectedProduto] =
    useState<ProdutoAPI | null>(null);

  const [deleting, setDeleting] = useState(false);

  function handleDeleteClick(produto: ProdutoAPI) {
    setSelectedProduto(produto);
    setConfirmOpen(true);
  }

  async function handleConfirmDelete() {

    if (!selectedProduto) return;

    setDeleting(true);

    await deleteProduto(selectedProduto.id);

    setDeleting(false);
    setConfirmOpen(false);
    setSelectedProduto(null);
  }

  /* ── loading ── */
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12 text-gray-500 dark:text-gray-400">
        <svg
          className="animate-spin mr-3 h-5 w-5 text-brand-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />

          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8H4z"
          />
        </svg>

        Carregando produtos...
      </div>
    );
  }

  /* ── empty ── */
  if (produtos.length === 0) {
    return (
      <div className="flex items-center justify-center py-12 text-gray-400 dark:text-gray-500 text-sm">
        Nenhum produto cadastrado ainda.
      </div>
    );
  }

  return (
    <>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-600 dark:bg-white/[0.03]">

        <div className="max-w-full overflow-x-auto">

          <Table>

            {/* Header */}
            <TableHeader className="border-b border-gray-200 dark:border-gray-600">

              <TableRow className="divide-x divide-gray-200 dark:divide-gray-600">

                {[
                  "ID",
                  "Código Interno",
                  "Descrição",
                  "Categoria",
                  "Valor",
                  "Estoque",
                  "Status",
                  "Ações",
                ].map((col) => (

                  <TableCell
                    key={col}
                    isHeader
                    className="py-3 text-center font-medium text-gray-800 text-theme-sm dark:text-white/90"
                  >
                    {col}
                  </TableCell>

                ))}

              </TableRow>

            </TableHeader>

            {/* Body */}
            <TableBody className="divide-y divide-gray-200 dark:divide-gray-700">

              {produtos.map((produto) => (

                <TableRow
                  key={produto.id}
                  className="divide-x divide-gray-200 dark:divide-gray-700"
                >

                  {/* ID */}
                  <TableCell className="px-2 py-4 text-center text-theme-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-600">
                    {produto.id}
                  </TableCell>

                  {/* Código Interno */}
                  <TableCell className="px-2 py-4 text-center text-theme-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-600">
                    {produto.codigoInterno || (
                      <span className="text-gray-300 dark:text-gray-600">
                        —
                      </span>
                    )}
                  </TableCell>

                  {/* Descrição */}
                  <TableCell className="px-2 py-4 text-center text-theme-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-600">
                    {produto.descricao}
                  </TableCell>

                  {/* Categoria */}
                  <TableCell className="px-2 py-4 text-center text-theme-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-600">
                    {produto.categoria || (
                      <span className="text-gray-300 dark:text-gray-600">
                        —
                      </span>
                    )}
                  </TableCell>

                  {/* Valor */}
                  <TableCell className="px-2 py-4 text-center text-theme-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-600">
                    {formatarMoeda(produto.valorVenda)}
                  </TableCell>

                  {/* Estoque */}
                  <TableCell className="px-2 py-4 text-center text-theme-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-600">
                    {produto.estoque}
                  </TableCell>

                  {/* Status */}
                  <TableCell className="px-2 py-4 text-center text-theme-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-600">

                    <div className="flex justify-center">

                      <Badge
                        size="sm"
                        color={
                          produto.estoque < produto.estoqueMinimo
                            ? "error"
                            : "success"
                        }
                      >
                        {produto.estoque < produto.estoqueMinimo
                          ? "Baixo"
                          : "OK"}
                      </Badge>

                    </div>

                  </TableCell>

                  {/* Ações */}
                  <TableCell className="px-2 py-3 text-center text-theme-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-600">

                    <div className="flex items-center justify-center gap-3">

                      <button
                        onClick={() => onEdit?.(produto)}
                        className="p-2 rounded-lg text-blue-500 hover:bg-brand-50 hover:text-blue-600 transition-colors duration-200"
                        title="Editar"
                      >
                        <PencilIcon />
                      </button>

                      <button
                        onClick={() => handleDeleteClick(produto)}
                        className="p-2 rounded-lg text-red-500 hover:bg-error-50 hover:text-red-600 transition-colors duration-200"
                        title="Excluir"
                      >
                        <TrashBinIcon />
                      </button>

                    </div>

                  </TableCell>

                </TableRow>

              ))}

            </TableBody>

          </Table>

        </div>

      </div>

      {/* Modal */}
      <Modal
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        className="max-w-[420px] p-6"
      >

        <div className="flex flex-col gap-4">

          <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Confirmar exclusão
          </h4>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            Deseja realmente excluir o produto{" "}
            <span className="font-medium text-gray-800 dark:text-white/90">
              {selectedProduto?.descricao}
            </span>
            ? Esta ação não pode ser desfeita.
          </p>

          <div className="flex justify-end gap-3 mt-2">

            <Button
              size="sm"
              variant="outline"
              onClick={() => setConfirmOpen(false)}
              disabled={deleting}
            >
              Cancelar
            </Button>

            <Button
              size="sm"
              variant="primary"
              onClick={handleConfirmDelete}
              disabled={deleting}
              className="bg-error-500 hover:bg-error-600 disabled:bg-error-300"
            >
              {deleting ? "Excluindo..." : "Excluir"}
            </Button>

          </div>

        </div>

      </Modal>
    </>
  );
}

/* ── helpers ── */

function formatarMoeda(valor: number): string {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}