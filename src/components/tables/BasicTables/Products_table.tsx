import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";

import {
  TrashBinIcon,
  PencilIcon,
} from "../../../icons"; 

import Badge from "../../ui/badge/Badge";

interface product {
  id: number;
  descricao: string;
  custo: string
  valor: string;
  quantidade?: number;
  status: string;
}

// Define the table data using the interface
const tableData: product[] = [
  {
    id: 1,
    descricao: "Ponta Homocinetica Gol G5 1.6 8v 2005/2006",
    custo: "R$ 80,00",
    valor: "129,00",
    quantidade: 10,
    status: "Ativo",
  },
];

export default function TabelaProdutos() {
  return (
    <div className="overflow-hidden rounded-xl bproduct bproduct-gray-200 bg-white dark:bproduct-white/[0.05] dark:bg-white/[0.03] border border-gray-200 dark:border-gray-600">
      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* Table Header */}
          <TableHeader className="bproduct-b bproduct-gray-100 dark:bproduct-white/[0.05]">
            <TableRow className="divide-x divide-gray-200 dark:divide-gray-600">
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-center text-theme-xs dark:text-gray-400"
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
                  Descrição
                </span>
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-center text-theme-xs dark:text-gray-400"
              >
                <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                  Custo
                </span>
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-center text-theme-xs dark:text-gray-400"
              >
                <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                  Valor
                </span>
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-center text-theme-xs dark:text-gray-400"
              >
                <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                  Quantidade
                </span>
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-center text-theme-xs dark:text-gray-400"
              >
                <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                  Status
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
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {tableData.map((product) => (
              <TableRow 
                key={product.id}
                className="divide-x divide-gray-200 dark:divide-gray-600"
              >

                {/* ID */}
                <TableCell className="py-4 text-gray-500 text-center text-theme-sm dark:text-gray-400 border-t border-gray-200 dark:border-gray-600">
                    {product.id}
                </TableCell>

                {/* Descrição */}
                <TableCell className="py-4 text-gray-500 text-center text-theme-sm dark:text-gray-400 border-t border-gray-200 dark:border-gray-600">
                    {product.descricao}
                </TableCell>

                {/* Custo */}
                <TableCell className="py-3 text-gray-500 text-center text-theme-sm dark:text-gray-400 border-t border-gray-200 dark:border-gray-600">
                    {product.custo}
                </TableCell>

                {/* Valor */}
                <TableCell className="py-3 text-gray-500 text-center text-theme-sm dark:text-gray-400 border-t border-gray-200 dark:border-gray-600">
                    R$ {product.valor}
                </TableCell>

                {/* Quantidade */}
                <TableCell className="py-3 text-gray-500 text-center text-theme-sm dark:text-gray-400 border-t border-gray-200 dark:border-gray-600">
                    {product.quantidade}
                </TableCell>

                {/* Status */}
                <TableCell className="py-3 text-gray-500 text-center text-theme-sm dark:text-gray-400 border-t border-gray-200 dark:border-gray-600">
                  <Badge
                    size="sm"
                    color={product.status === "Ativo" ? "success" : "error"}
                  >
                    {product.status}
                  </Badge>
                </TableCell>
                <TableCell className="px-5 py-3 text-gray-500 text-center text-theme-sm dark:text-gray-400 border-t border-gray-200 dark:border-gray-600">
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
