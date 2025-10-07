import { useState } from "react";
import api from "../../../api/api";

export default function CadastroPage() {
  const [cpf, setCpf] = useState("");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [perfil, setPerfil] = useState<"ALUNO" | "PROFESSOR">("ALUNO");
  const [questao, setQuestao] = useState("Cor do Temas?");
  const [resposta, setResposta] = useState("");
  const [cor_tema, setCorTema] = useState("azul");

  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [ok, setOk] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro(null);
    setOk(null);
    setLoading(true);
    try {
      // ajuste este endpoint se o seu back usar outro caminho
      await api.post("/usuarios", {
        cpf,
        nome,
        email,
        senha,
        perfil,
        questao,
        resposta,
        cor_tema
      });
      setOk("Cadastro realizado com sucesso!");
    } catch (err: any) {
      setErro(err?.response?.data?.erro || "Erro ao cadastrar usuário");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Cadastro</h1>
      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12 }}>
        <label>
          <div>CPF (somente números)</div>
          <input value={cpf} onChange={(e) => setCpf(e.target.value)} required />
        </label>

        <label>
          <div>Nome</div>
          <input value={nome} onChange={(e) => setNome(e.target.value)} required />
        </label>

        <label>
          <div>Email</div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <label>
          <div>Senha</div>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </label>

        <label>
          <div>Perfil</div>
          <select value={perfil} onChange={(e) => setPerfil(e.target.value as any)}>
            <option value="ALUNO">ALUNO</option>
            <option value="PROFESSOR">PROFESSOR</option>
          </select>
        </label>

        <label>
          <div>Pergunta secreta</div>
          <input value={questao} onChange={(e) => setQuestao(e.target.value)} />
        </label>

        <label>
          <div>Resposta</div>
          <input value={resposta} onChange={(e) => setResposta(e.target.value)} />
        </label>

        <label>
          <div>Cor do Tema</div>
          <input value={cor_tema} onChange={(e) => setCorTema(e.target.value)} />
        </label>

        <button type="submit" disabled={loading}>
          {loading ? "Enviando..." : "Cadastrar"}
        </button>
      </form>

      {erro && <p style={{ color: "crimson" }}>{erro}</p>}
      {ok && <p style={{ color: "green" }}>{ok}</p>}
    </div>
  );
}
