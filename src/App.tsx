import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { ScrollToHash } from "./components/ScrollToHash";

function App() {
  return (
    <>
      <ScrollToHash />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>

    </>
  );
}

export default App;