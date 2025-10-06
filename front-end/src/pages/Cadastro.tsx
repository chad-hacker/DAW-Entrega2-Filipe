import { useState } from "react";
import axios from "axios";

export default function Cadastro() {
  const [cpf, setCpf] = useState("");
  const [nome, setNome] = useState("");
  const [perfil, setPerfil] = useState("ALUNO"); // pode ser ALUNO ou PROFESSOR
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [questao, setQuestao] = useState("Qual sua cor favorita?");
  const [resposta, setResposta] = useState("");
  const [corTema, setCorTema] = useState("azul");
  const [mensagem, setMensagem] = useState("");

  const handleCadastro = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3333/usuario/cadastro", {
        cpf,
        nome,
        perfil,
        email,
        senha,
        questao,
        resposta,
        cor_tema: corTema,
      });

      setMensagem("Usuário cadastrado com sucesso!");
      console.log(response.data);
    } catch (error: any) {
      setMensagem(error.response?.data?.erro || "Erro ao cadastrar usuário");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Cadastro</h2>
      <form onSubmit={handleCadastro}>
        <div>
          <label>CPF:</label>
          <input type="text" value={cpf} onChange={(e) => setCpf(e.target.value)} required />
        </div>
        <div>
          <label>Nome:</label>
          <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />
        </div>
        <div>
          <label>Perfil:</label>
          <select value={perfil} onChange={(e) => setPerfil(e.target.value)}>
            <option value="ALUNO">Aluno</option>
            <option value="PROFESSOR">Professor</option>
          </select>
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Senha:</label>
          <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} required />
        </div>
        <div>
          <label>Pergunta de Segurança:</label>
          <input type="text" value={questao} onChange={(e) => setQuestao(e.target.value)} />
        </div>
        <div>
          <label>Resposta:</label>
          <input type="text" value={resposta} onChange={(e) => setResposta(e.target.value)} />
        </div>
        <div>
          <label>Cor do Tema:</label>
          <input type="text" value={corTema} onChange={(e) => setCorTema(e.target.value)} />
        </div>
        <button type="submit">Cadastrar</button>
      </form>
      {mensagem && <p>{mensagem}</p>}
    </div>
  );
}
