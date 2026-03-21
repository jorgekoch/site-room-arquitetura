import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { ScrollToHash } from "./components/ScrollToHash";
import Contato from "./pages/Contato";
import PropostaEnviada from "./pages/PropostaEnviada";

function App() {
  return (
    <>
      <ScrollToHash />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="/proposta-enviada" element={<PropostaEnviada />} />
        </Routes>

    </>
  );
}

export default App;