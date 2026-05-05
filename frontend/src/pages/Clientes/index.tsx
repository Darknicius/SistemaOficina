import { useNavigate } from "react-router";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import TabelaProdutos from "../../components/tables/Clientes_table";
import Button from "../../components/ui/button/Button";

export default function ClientesList() {
  const navigate = useNavigate();

  return (
    <>
      <PageMeta
        title="React.js Basic Tables Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Clientes" />
      <div className="space-y-6">
        <ComponentCard title="Meus Clientes">
            <div className="flex justify-end gap-3">
                <Button size="sm" variant="primary" onClick={() => navigate("/clientes/add")}>
                    Adicionar Cliente
                </Button>
            </div>
          <TabelaProdutos />
        </ComponentCard>
      </div>
    </>
  );
}
