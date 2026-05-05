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

interface client {
  id: number;
  nome: string;
  telefone: string;
  celular: string;
}

// Define the table data using the interface
const tableData: client[] = [
  {
    id: 1,
    nome: "João Silva",
    telefone: "(11) 98765-4321",
    celular: "(11) 91234-5678",
  },
];

export default function TabelaClientes() {
  return (
    <div className="overflow-hidden rounded-xl bclient bclient-gray-200 bg-white dark:bclient-white/[0.05] dark:bg-white/[0.03] border border-gray-200 dark:border-gray-600">
      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* Table Header */}
          <TableHeader className="bclient-b bclient-gray-200 dark:bclient-white/[0.05]">
            <TableRow className="divide-x divide-gray-200 dark:divide-gray-600">
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-center text-theme-xs dark:text-gray-400"
              >
                <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                  ID
                </span>
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-center text-theme-xs dark:text-gray-400"
              >
                <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                  Nome
                </span>
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-center text-theme-xs dark:text-gray-400"
              >
                <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                  Telefone
                </span>
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-center text-theme-xs dark:text-gray-400"
              >
                <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                  Celular
                </span>
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-center text-theme-xs dark:text-gray-400"
              >
                <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                  Ações
                </span>
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody className="divide-y divide-gray-200 dark:divide-gray-700">
            {tableData.map((client) => (
              <TableRow
                key={client.id}
                className="divide-x divide-gray-200 dark:divide-gray-700"
              >

                {/* ID */}
                <TableCell className="py-4 text-gray-500 text-center text-theme-sm dark:text-gray-400 border-t border-gray-200 dark:border-gray-600">
                  {client.id}
                </TableCell>

                {/* Nome */}
                <TableCell className="py-4 text-gray-500 text-center text-theme-sm dark:text-gray-400 border-t border-gray-200 dark:border-gray-600">
                  {client.nome}
                </TableCell>

                {/* Telefone */}
                <TableCell className="py-4 text-gray-500 text-center text-theme-sm dark:text-gray-400 border-t border-gray-200 dark:border-gray-600">
                  {client.telefone}
                </TableCell>

                {/* Celular */}
                <TableCell className="py-4 text-gray-500 text-center text-theme-sm dark:text-gray-400 border-t border-gray-200 dark:border-gray-600">
                  {client.celular}
                </TableCell>

                <TableCell className="py-3 text-gray-500 text-center text-theme-sm dark:text-gray-400 border-t border-gray-200 dark:border-gray-600">
                  <div className="flex items-center justify-center gap-3">
                    <button className="p-2 rounded-lg text-blue-500 hover:bg-brand-400 hover:text-blue-600 transition-colors duration-200">
                      <PencilIcon />
                    </button>
                    <button className="p-2 rounded-lg text-red-500 hover:bg-brand-400 hover:text-red-600 transition-colors duration-200">
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
  );
}
