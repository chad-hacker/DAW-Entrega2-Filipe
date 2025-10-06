import { Router } from "express";
import ServicosUsuario from "../serviços/serviços-usuario";

const RotasUsuario = Router();

// rota para cadastro
RotasUsuario.post("/cadastro", async (req, res) => {
  try {
    const { usuario, token } = await ServicosUsuario.cadastrarUsuario(req.body);
    res.json({ usuario, token });
  } catch (error) {
    res.status(500).json({ erro: "Erro BD: cadastrarUsuario" });
  }
});

// rota para login
RotasUsuario.post("/login", (req, res) =>
  ServicosUsuario.logarUsuario(req, res)
);

// rota para verificar cpf
RotasUsuario.get("/cpf/:cpf", (req, res) =>
  ServicosUsuario.verificarCpfExistente(req, res)
);

export default RotasUsuario;
