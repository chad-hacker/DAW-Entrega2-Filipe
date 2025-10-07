import { useState } from "react";
import api from "../../../api/api";

export default function LoginPage() {
  const [nome_login, setNomeLogin] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [resposta, setResposta] = useState<any>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro(null);
    setResposta(null);
    setLoading(true);
    try {
      // ajuste este endpoint se o seu back usar outro caminho
      const { data } = await api.post("/usuarios/login", { nome_login, senha });
      setResposta(data);
    } catch (err: any) {
      setErro(err?.response?.data?.erro || "Falha no login");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 420 }}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12 }}>
        <label>
          <div>Usuário (CPF ou usuário)</div>
          <input
            value={nome_login}
            onChange={(e) => setNomeLogin(e.target.value)}
            placeholder="digite seu CPF (sem máscara)"
            required
          />
        </label>

        <label>
          <div>Senha</div>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="senha"
            required
          />
        </label>

        <button disabled={loading} type="submit">
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </form>

      {erro && <p style={{ color: "crimson" }}>Erro: {erro}</p>}

      {resposta && (
        <pre style={{ background: "#111", color: "#0f0", padding: 12 }}>
          {JSON.stringify(resposta, null, 2)}
        </pre>
      )}
    </div>
  );
}
