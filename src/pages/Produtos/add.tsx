import { useNavigate } from "react-router";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import Input from "../../components/form/input/InputField";
import Button from "../../components/ui/button/Button";
import ComponentCard from "../../components/common/ComponentCard";
import Label from "../../components/form/Label";

export default function ProdutosAdd() {
    const navigate = useNavigate();

    return (
        <div>
            <PageMeta
                title="React.js Form Elements Dashboard | TailAdmin - React.js Admin Dashboard Template"
                description="This is React.js Form Elements  Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
            />
            <PageBreadcrumb pageTitle="Produtos" />
            <div className="grid grid-cols-1 gap-6">
                <div className="space-y-6">
                    <ComponentCard title="Cadastro de produtos">
                        <div className="space-y-6">
                            <div>
                                <Label htmlFor="inputTwo">Descrição</Label>
                                <Input type="text" id="inputTwo" placeholder="Insira a descrição" />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <Label htmlFor="inputTwo">Custo</Label>
                                    <Input type="text" id="inputTwo" placeholder="R$ 0,00" />
                                </div>
                                <div>
                                    <Label htmlFor="inputTwo">Preço</Label>
                                    <Input type="text" id="inputTwo" placeholder="R$ 0,00" />
                                </div>
                            </div>
                            <div className="flex justify-end gap-3">
                                <Button size="sm" variant="primary" onClick={() => navigate("/produtos")}>
                                    Cancelar
                                </Button>
                                <Button size="sm" variant="primary">
                                    Cadastrar Produto
                                </Button>
                            </div>

                        </div>
                    </ComponentCard>
                </div>
            </div>
        </div>
    );
}
