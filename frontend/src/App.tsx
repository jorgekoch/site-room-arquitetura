import { Routes, Route } from "react-router-dom";
import { PageShell } from "./components/layout/PageShell";
import { Home } from "./pages/Home";
import Contato from "./pages/Contato";
import PropostaEnviada from "./pages/PropostaEnviada";
import AdminLogin from "./pages/AdminLogin";
import AdminRequestAccess from "./pages/AdminRequestAccess";
import AdminPropostas from "./pages/AdminPropostas";
import AdminUsuarios from "./pages/AdminUsuarios";
import { AdminRoute } from "./components/auth/AdminRoute";
import ProjetoDetalhe from "./pages/ProjetoDetalhe";
import { ScrollToTop } from "./components/utils/ScrollToTop";
import { ProtectedSuccessRoute } from "./components/auth/ProtectedSuccessRoute";

function App() {
  return (
    <>
      <ScrollToTop/>
        <Routes>
          <Route
            path="/"
            element={
              <PageShell>
                <Home />
              </PageShell>
            }
          />

          <Route path="/contato" element={<Contato />} />

          <Route
            path="/proposta-enviada"
            element={
              <ProtectedSuccessRoute>
                <PropostaEnviada />
              </ProtectedSuccessRoute>
            }
          />

          <Route path="/projetos/:slug" element={<ProjetoDetalhe />} />

          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/solicitar-acesso" element={<AdminRequestAccess />} />

          <Route
            path="/admin/propostas"
            element={
              <AdminRoute>
                <AdminPropostas />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/usuarios"
            element={
              <AdminRoute>
                <AdminUsuarios />
              </AdminRoute>
            }
          />
        </Routes>
    </>
  );
}

export default App;