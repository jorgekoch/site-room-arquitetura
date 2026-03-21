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

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PageShell>
            <Home />
          </PageShell>
        }
      />

      <Route
        path="/contato"
        element={
          <PageShell>
            <Contato />
          </PageShell>
        }
      />

      <Route
        path="/proposta-enviada"
        element={
          <PageShell>
            <PropostaEnviada />
          </PageShell>
        }
      />

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
  );
}

export default App;