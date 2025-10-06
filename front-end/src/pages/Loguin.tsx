import React, { useState } from "react";
import axios from "axios";

export default function Login() {
  const [nome_login, setNomeLogin] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      // Envia login e senha para o backend
      const response = await axios.post("http://localhost:3333/usuario/login", {
        nome_login,
        senha,
      });

      // Caso dê certo, salva o token no localStorage
      const token = response.data.usuarioLogado.token;
      localStorage.setItem("token", token);

      // Mensagem de sucesso
      setMensagem("✅ Login realizado com sucesso!");
      console.log("Usuário logado:", response.data.usuarioLogado);

      // Redireciona para a página inicial
      window.location.href = "/home";

    } catch (error: any) {
      console.error(error);
      if (error.response) {
        setMensagem(`❌ Erro: ${error.response.data.erro}`);
      } else {
        setMensagem("❌ Erro ao conectar com o servidor.");
      }
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "80px" }}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="CPF ou Nome de Usuário"
            value={nome_login}
            onChange={(e) => setNomeLogin(e.target.value)}
            style={{ margin: "10px", padding: "8px" }}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            style={{ margin: "10px", padding: "8px" }}
          />
        </div>
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Entrar
        </button>
      </form>

      {mensagem && <p style={{ marginTop: "20px" }}>{mensagem}</p>}
    </div>
  );
}
