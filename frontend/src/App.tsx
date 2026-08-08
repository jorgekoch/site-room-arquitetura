import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { PageShell } from "./components/layout/PageShell";
import { ScrollToTop } from "./components/utils/ScrollToTop";

import { AdminRoute } from "./components/auth/AdminRoute";
import { ProtectedSuccessRoute } from "./components/auth/ProtectedSuccessRoute";

import { AdminLayout } from "./components/admin/AdminLayout";

// Páginas públicas
import Home from "./pages/public/Home";
import Contato from "./pages/public/Contato";
import Projetos from "./pages/public/Projetos";
import ProjetoDetalhe from "./pages/public/ProjetoDetalhe";
import PropostaEnviada from "./pages/public/PropostaEnviada";

// Administração
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminPropostas from "./pages/admin/AdminPropostas/index";
import AdminRequestAccess from "./pages/admin/AdminRequestAccess";
import AdminUsuarios from "./pages/admin/AdminUsuarios";
import AdminProjetos from "./pages/admin/AdminProjetos";
import AdminConfiguracoes from "./pages/admin/AdminConfiguracoes";

function App() {
  return (
    <>
      <ScrollToTop />

      <Routes>
        {/* ========================= */}
        {/* PÁGINAS PÚBLICAS */}
        {/* ========================= */}

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
          element={
            <PageShell>
              <Contato />
            </PageShell>
          }
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
          element={
            <PageShell>
              <Projetos />
            </PageShell>
          }
        />

        <Route
          path="/projetos/:slug"
          element={
            <PageShell>
              <ProjetoDetalhe />
            </PageShell>
          }
        />

        {/* ========================= */}
        {/* AUTENTICAÇÃO ADMIN */}
        {/* ========================= */}

        <Route
          path="/admin/login"
          element={<AdminLogin />}
        />

        <Route
          path="/admin/solicitar-acesso"
          element={
            <AdminRequestAccess />
          }
        />

        {/* ========================= */}
        {/* PAINEL ADMINISTRATIVO */}
        {/* ========================= */}

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          {/* Dashboard */}
          <Route
            index
            element={<AdminDashboard />}
          />

          {/* Projetos */}
          <Route
            path="projetos"
            element={<AdminProjetos />}
          />

          {/* Propostas */}
          <Route
            path="propostas"
            element={<AdminPropostas />}
          />

          {/* Usuários */}
          <Route
            path="usuarios"
            element={<AdminUsuarios />}
          />

          <Route
            path="configuracoes"
            element={<AdminConfiguracoes />}
          />
          
        </Route>

        {/* ========================= */}
        {/* FALLBACK */}
        {/* ========================= */}

        <Route
          path="*"
          element={
            <Navigate
              to="/"
              replace
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;