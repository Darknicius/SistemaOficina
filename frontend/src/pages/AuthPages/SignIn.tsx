import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import SignInForm from "../../components/auth/SignInForm";

export default function SignIn() {
  return (
    <>
      <PageMeta
        title="Login - Mecanix"
        description="Mecanix é um sistema para gerencimento de oficinas mecânicas, oferecendo controle de estoque, agendamento de serviços, emissão de orçamentos e muito mais."
      />
      <AuthLayout>
        <SignInForm />
      </AuthLayout>
    </>
  );
}
