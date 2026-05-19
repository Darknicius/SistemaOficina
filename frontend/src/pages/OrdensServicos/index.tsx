import { useNavigate } from "react-router";
import { useState } from "react";

import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";

import Button from "../../components/ui/button/Button";
import { SearchBar } from "../../components/ui/searchbar/Searchbar";

import TabelaOS from "../../components/tables/OrdensServico_table";

import { OrdemServicoAPI } from "../../types/ordemServico";

export default function OSList() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const ordens: OrdemServicoAPI[] = [
    {
      id: 1,

      clienteNome: "Michael Jackson",

      veiculoPlaca: "DFW3B42",
      veiculoModelo: "GOL 1.0 G5 2005/06",

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

      clienteNome: "Luigi",

      veiculoPlaca: "DFH3N64",
      veiculoModelo: "Fiesta 1.0 2005",

      status: "Aguardando peças",

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

  const handleDelete = (id: number) => {
    console.log("Excluir OS:", id);
  };

  const handleEdit = (os: OrdemServicoAPI) => {
    console.log("Editar OS:", os);
  };

  return (
    <>
      <PageMeta
        title="Ordens de Serviço"
        description="Lista de ordens de serviço da oficina"
      />

      <PageBreadcrumb pageTitle="Ordens de Serviço" />

      <div className="space-y-6">
        <ComponentCard title="Minhas Ordens de Serviço">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex justify-start gap-3">
              <SearchBar
                value={search}
                onChange={setSearch}
                placeholder="Pesquisar por OS..."
              />
            </div>

            <div className="flex justify-end gap-3">
              <Button
                size="sm"
                variant="primary"
                onClick={() => navigate("/os/add")}
              >
                Adicionar OS
              </Button>
            </div>
          </div>

          <TabelaOS
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        </ComponentCard>
      </div>
    </>
  );
}