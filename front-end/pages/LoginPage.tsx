import { useState } from "react";
import axios from "axios";

export default function Login() {
  const [nomeLogin, setNomeLogin] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3333/usuario/login", {
        nome_login: nomeLogin,
        senha,
      });
      setMensagem("Login realizado com sucesso!");
      console.log(response.data);
    } catch (error: any) {
      setMensagem(error.response?.data?.erro || "Erro ao logar");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>CPF:</label>
          <input type="text" value={nomeLogin} onChange={(e) => setNomeLogin(e.target.value)} />
        </div>
        <div>
          <label>Senha:</label>
          <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} />
        </div>
        <button type="submit">Entrar</button>
      </form>
      {mensagem && <p>{mensagem}</p>}
    </div>
  );
}
