import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import Contato from "./pages/Contato";
import PropostaEnviada from "./pages/PropostaEnviada";
import AdminPropostas from "./pages/AdminPropostas";
import AdminLogin from "./pages/AdminLogin";
import AdminRequestAccess from "./pages/AdminRequestAccess";
import AdminUsuarios from "./pages/AdminUsuarios";
import { AdminRoute } from "./components/auth/AdminRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/contato" element={<Contato />} />
      <Route path="/proposta-enviada" element={<PropostaEnviada />} />

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