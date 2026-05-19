import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";

import Badge from "../ui/badge/Badge";

import {
  PencilIcon,
  TrashBinIcon,
} from "../../icons";

import { OrdemServicoAPI, StatusOS } from "../../types/ordemServico";

interface TabelaOSProps {
  onEdit?: (os: OrdemServicoAPI) => void;
  onDelete?: (id: number) => void;
}

const statusConfig: Record<
  StatusOS,
  {
    label: string;
    color: "success" | "warning" | "error" | "info" | "light";
  }
> = {
  aberta: {
    label: "Aberta",
    color: "info",
  },

  em_andamento: {
    label: "Em andamento",
    color: "warning",
  },

  aguardando_aprovacao: {
    label: "Aguardando aprovação",
    color: "light",
  },

  aguardando_peca: {
    label: "Aguardando peça",
    color: "warning",
  },

  finalizada: {
    label: "Finalizada",
    color: "success",
  },

  entregue: {
    label: "Entregue",
    color: "success",
  },

  cancelada: {
    label: "Cancelada",
    color: "error",
  },
};

export default function TabelaOS({
  onEdit,
  onDelete,
}: TabelaOSProps) {
  const ordens: OrdemServicoAPI[] = [
    {
      id: 1,

      clienteId: 101,

      veiculoId: 201,

      status: "em_andamento",

      produtos: [
        {
          produtoId: 1,
          quantidade: 2,
          valorUnitario: 45,
          valorTotal: 90,
        },

        {
          produtoId: 2,
          quantidade: 1,
          valorUnitario: 120,
          valorTotal: 120,
        },
      ],

      valorProdutos: 210,
      valorServico: 150,
      valorTotal: 360,

      observacoes: "Troca de óleo e filtros.",

      dataAbertura: "2026-05-17",
    },

    {
      id: 2,

      clienteId: 102,

      veiculoId: 202,

      status: "aguardando_peca",

      produtos: [
        {
          produtoId: 3,
          quantidade: 4,
          valorUnitario: 35,
          valorTotal: 140,
        },
      ],

      valorProdutos: 140,
      valorServico: 250,
      valorTotal: 390,

      observacoes: "Aguardando chegada da peça do freio.",

      dataAbertura: "2026-05-16",
    },
  ];

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-b border-gray-100 dark:border-gray-800">
            <TableRow>
              <TableCell
                isHeader
                className="px-5 py-3 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400"
              >
                OS
              </TableCell>

              <TableCell
                isHeader
                className="px-5 py-3 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400"
              >
                Cliente
              </TableCell>

              <TableCell
                isHeader
                className="px-5 py-3 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400"
              >
                Veículo
              </TableCell>

              <TableCell
                isHeader
                className="px-5 py-3 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400"
              >
                Status
              </TableCell>

              <TableCell
                isHeader
                className="px-5 py-3 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400"
              >
                Produtos
              </TableCell>

              <TableCell
                isHeader
                className="px-5 py-3 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400"
              >
                Valor Total
              </TableCell>

              <TableCell
                isHeader
                className="px-5 py-3 text-center text-theme-xs font-medium text-gray-500 dark:text-gray-400"
              >
                Ações
              </TableCell>
            </TableRow>
          </TableHeader>

          <TableBody>
            {ordens.map((os) => (
              <TableRow
                key={os.id}
                className="border-b border-gray-100 dark:border-gray-800"
              >
                {/* ID */}
                <TableCell className="px-5 py-4 text-sm font-medium text-gray-800 dark:text-white/90">
                  #{os.id}
                </TableCell>

                {/* Cliente */}
                <TableCell className="px-5 py-4 text-sm text-gray-700 dark:text-gray-300">
                  Cliente #{os.clienteId}
                </TableCell>

                {/* Veículo */}
                <TableCell className="px-5 py-4 text-sm text-gray-700 dark:text-gray-300">
                  Veículo #{os.veiculoId}
                </TableCell>

                {/* Status */}
                <TableCell className="px-5 py-4">
                  <Badge color={statusConfig[os.status].color}>
                    {statusConfig[os.status].label}
                  </Badge>
                </TableCell>

                {/* Produtos */}
                <TableCell className="px-5 py-4 text-sm text-gray-700 dark:text-gray-300">
                  {os.produtos.length} produto(s)
                </TableCell>

                {/* Valor */}
                <TableCell className="px-5 py-4 text-sm font-medium text-green-600">
                  {os.valorTotal.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </TableCell>

                {/* Ações */}
                <TableCell className="px-5 py-4">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => onEdit?.(os)}
                      className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-brand-500 dark:hover:bg-white/[0.05]"
                    >
                      <PencilIcon className="size-5" />
                    </button>

                    <button
                      onClick={() => onDelete?.(os.id)}
                      className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-error-500 dark:hover:bg-white/[0.05]"
                    >
                      <TrashBinIcon className="size-5" />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}