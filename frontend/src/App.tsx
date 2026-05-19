import { BrowserRouter as Router, Routes, Route } from "react-router";

{/* Auth */ }
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";

import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/UserProfiles";

{/* Dashboard */ }
import Blank from "./pages/Blank";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";

{/* Produtos */ }
import ProdutosList from "./pages/Produtos";
import ProdutosAdd from "./pages/Produtos/add";

{/* Clientes */ }
import ClientesList from "./pages/Clientes";
import ClientesAdd from "./pages/Clientes/add";
import ClientesUpdate from "./pages/Clientes/update";

{/* Ordem serviço */ }
import OSList from "./pages/OrdensServicos";

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>

        {/* Dashboard Layout */}
        <Route element={<AppLayout />}>
          <Route index element={<Home />} />
          
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<UserProfiles />} />
          <Route path="/blank" element={<Blank />} />

          {/* Produtos */}
          <Route path="/produtos" element={<ProdutosList />} />
          <Route path="/produtos/add" element={<ProdutosAdd />} />


          {/* Clientes */}
          <Route path="/clientes" element={<ClientesList />} />
          <Route path="/clientes/add" element={<ClientesAdd />} />
          <Route path="/clientes/:id" element={<ClientesUpdate />} />

          {/* Ordem Serviço */}
          <Route path="/ordemServicos" element={<OSList />} />


        </Route>

        {/* Auth Routes (fora do AppLayout) */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Fallback */}
        <Route path="*" element={<NotFound />} />

      </Routes>
    </Router>
  );
}