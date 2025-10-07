import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import CadastroPage from "./pages/CadastroPage";

export default function App() {
  return (
    <BrowserRouter>
      <div style={{ fontFamily: "system-ui, sans-serif", padding: 24 }}>
        <nav style={{ display: "flex", gap: 16, marginBottom: 24 }}>
          <Link to="/login">Login</Link>
          <Link to="/cadastro">Cadastro</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/cadastro" element={<CadastroPage />} />
          <Route path="*" element={<div>Página não encontrada.</div>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
