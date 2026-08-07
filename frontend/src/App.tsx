import { Routes, Route, Navigate } from "react-router-dom";

import { PageShell } from "./components/layout/PageShell";

import { ScrollToTop } from "./components/utils/ScrollToTop";

import { AdminRoute } from "./components/auth/AdminRoute";
import { ProtectedSuccessRoute } from "./components/auth/ProtectedSuccessRoute";

// Páginas públicas
import Home from "./pages/public/Home";
import Contato from "./pages/public/Contato";
import Projetos from "./pages/public/Projetos";
import ProjetoDetalhe from "./pages/public/ProjetoDetalhe";
import PropostaEnviada from "./pages/public/PropostaEnviada";

// Administração
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminPropostas from "./pages/admin/AdminPropostas";
import AdminRequestAccess from "./pages/admin/AdminRequestAccess";
import AdminUsuarios from "./pages/admin/AdminUsuarios";

import AdminProjetos from "./pages/admin/AdminProjetos";

function App() {
  return (
    <>
      <ScrollToTop />

      <Routes>
        <Route
  path="/admin/projetos"
  element={
    <AdminRoute>
      <AdminProjetos />
    </AdminRoute>
  }
/>
        <Route
          path="/"
          element={
            <PageShell>
              <Home />
            </PageShell>
          }
        />

        <Route
          path="/orcamento"
          element={<Contato />}
        />

        <Route
          path="/contato"
          element={
            <Navigate
              to="/orcamento"
              replace
            />
          }
        />

        <Route
          path="/proposta-enviada"
          element={
            <ProtectedSuccessRoute>
              <PropostaEnviada />
            </ProtectedSuccessRoute>
          }
        />

        <Route
          path="/projetos"
          element={<Projetos />}
        />

        <Route
          path="/projetos/:slug"
          element={<ProjetoDetalhe />}
        />

        <Route
          path="/admin/login"
          element={<AdminLogin />}
        />

        <Route
          path="/admin/solicitar-acesso"
          element={<AdminRequestAccess />}
        />

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

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