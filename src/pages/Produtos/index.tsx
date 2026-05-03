import { useNavigate } from "react-router";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import TabelaProdutos from "../../components/tables/BasicTables/Products_table";
import Button from "../../components/ui/button/Button";

export default function ProdutosList() {
  const navigate = useNavigate();

  return (
    <>
      <PageMeta
        title="React.js Basic Tables Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Produtos" />
      <div className="space-y-6">
        <ComponentCard title="Meus Produtos">
            <div className="flex justify-end gap-3">
                <Button size="sm" variant="primary" onClick={() => navigate("/produtos/add")}>
                    Adicionar Produto
                </Button>
            </div>
          <TabelaProdutos />
        </ComponentCard>
      </div>
    </>
  );
}
