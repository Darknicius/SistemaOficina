import { useState } from "react";
import { useNavigate } from "react-router";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import { TrashBinIcon, PencilIcon } from "../../icons";
import { ClienteAPI } from "../../types/cliente";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";

type Props = {
  clientes: ClienteAPI[];
  loading: boolean;
  error: string | null;
  deleteCliente: (id: number) => Promise<boolean>;
};

export default function TabelaClientes({ clientes, loading, error, deleteCliente }: Props) {
  const navigate = useNavigate();


  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedCliente, setSelectedCliente] = useState<ClienteAPI | null>(null);
  const [deleting, setDeleting] = useState(false);

  function handleDeleteClick(cliente: ClienteAPI) {
    setSelectedCliente(cliente);
    setConfirmOpen(true);
  }

  function handleUpdateClick(cliente: ClienteAPI) {
    navigate(`/clientes/${cliente.id}`);
  }

  async function handleConfirmDelete() {
    if (!selectedCliente) return;
    setDeleting(true);
    await deleteCliente(selectedCliente.id);
    setDeleting(false);
    setConfirmOpen(false);
    setSelectedCliente(null);
  }

  /* ── estados de carregamento / erro ── */
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
        Carregando clientes...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-12 text-error-500">
        <span className="text-sm font-medium">Erro: {error}</span>
      </div>
    );
  }

  if (clientes.length === 0) {
    return (
      <div className="flex items-center justify-center py-12 text-gray-400 dark:text-gray-500 text-sm">
        Nenhum cliente cadastrado ainda.
      </div>
    );
  }

  return (
    <>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-600 dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <Table>
            {/* Cabeçalho */}
            <TableHeader className="border-b border-gray-200 dark:border-gray-600">
              <TableRow className="divide-x divide-gray-200 dark:divide-gray-600">
                {["ID", "Nome", "Celular", "Telefone", "Cidade / UF", "Ações"].map(
                  (col) => (
                    <TableCell
                      key={col}
                      isHeader
                      className="py-3 text-center font-medium text-gray-800 text-theme-sm dark:text-white/90"
                    >
                      {col}
                    </TableCell>
                  )
                )}
              </TableRow>
            </TableHeader>

            {/* Corpo */}
            <TableBody className="divide-y divide-gray-200 dark:divide-gray-700">
              {clientes.map((cliente) => (
                <TableRow
                  key={cliente.id}
                  className="divide-x divide-gray-200 dark:divide-gray-700"
                >
                  <TableCell className="px-2 py-4 text-center text-theme-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-600">
                    {cliente.id}
                  </TableCell>

                  <TableCell className="px-2 py-4 text-center text-theme-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-600">
                    {cliente.nome}
                  </TableCell>

                  <TableCell className="px-2 py-4 text-center text-theme-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-600">
                    {formatarTelefone(cliente.celular, true)}
                  </TableCell>

                  <TableCell className="px-2 py-4 text-center text-theme-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-600">
                    {cliente.telefone
                      ? formatarTelefone(cliente.telefone, false)
                      : <span className="text-gray-300 dark:text-gray-600">—</span>}
                  </TableCell>

                  <TableCell className="px-2 py-4 text-center text-theme-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-600">
                    {cliente.cidade} / {cliente.estado}
                  </TableCell>

                  <TableCell className="px-2 py-3 text-center text-theme-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-600">
                    <div className="flex items-center justify-center gap-3">
                      <button
                        onClick={() => handleUpdateClick(cliente)}
                        className="p-2 rounded-lg text-blue-500 hover:bg-brand-50 hover:text-blue-600 transition-colors duration-200"
                        title="Editar"
                      >
                        <PencilIcon />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(cliente)}
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

      {/* Modal de confirmação de exclusão */}
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
            Deseja realmente excluir o cliente{" "}
            <span className="font-medium text-gray-800 dark:text-white/90">
              {selectedCliente?.nome}
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
function formatarTelefone(numero: string, isCelular: boolean): string {
  const n = numero.replace(/\D/g, "");
  if (isCelular && n.length === 11) {
    return `(${n.slice(0, 2)}) ${n.slice(2, 7)}-${n.slice(7)}`;
  }
  if (!isCelular && n.length === 10) {
    return `(${n.slice(0, 2)}) ${n.slice(2, 6)}-${n.slice(6)}`;
  }
  return numero;
}