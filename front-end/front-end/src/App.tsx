import { Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";

export default function App() {
  return (
    <div style={{ padding: 20 }}>
      <h1>Portal DAW</h1>
      <nav>
        <Link to="/login">Login</Link> |{" "}
        <Link to="/cadastro">Cadastro</Link>
      </nav>

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="*" element={<h2>Página não encontrada</h2>} />
      </Routes>
    </div>
  );
}
