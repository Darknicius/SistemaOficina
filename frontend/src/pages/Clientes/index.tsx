import { useNavigate } from "react-router";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import TabelaProdutos from "../../components/tables/Clientes_table";
import Button from "../../components/ui/button/Button";
import { SearchBar } from "../../components/ui/searchbar/Searchbar";
import { useEffect, useState } from "react";
import { useClientes } from "../../hooks/useClientes";

export default function ClientesList() {
  const navigate = useNavigate();

  const {
    clientes,
    loading,
    error,
    fetchClientes,
    deleteCliente,
  } = useClientes();
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchClientes(search);
  }, [search, fetchClientes]);

  return (
    <>
      <PageMeta
        title="React.js Basic Tables Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Clientes" />
      <div className="space-y-6">
        <ComponentCard title="Meus Clientes">
          <div className="flex items-center justify-between mb-4">
            <div className="flex justify-start gap-3">
              <SearchBar value={search} onChange={setSearch} placeholder="João Marques..." />
            </div>
            <div className="flex justify-end gap-3">
              <Button size="sm" variant="primary" onClick={() => navigate("/clientes/add")}>
                Adicionar Cliente
              </Button>
            </div>
          </div>
          <TabelaProdutos clientes={clientes} loading={loading} error={error} deleteCliente={deleteCliente} />
        </ComponentCard>
      </div>
    </>
  );
}
