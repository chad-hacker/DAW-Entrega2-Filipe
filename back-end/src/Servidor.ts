import express from "express";
import RotasUsuario from "./rotas/rotas-usuário";
import RotasProfessor from "./rotas/rotas-professor";
import { AppDataSource } from "./data-source";

const app = express();
app.use(express.json());

AppDataSource.initialize()
  .then(() => console.log("Banco conectado!"))
  .catch((err) => console.error("Erro ao conectar BD:", err));

// usa as rotas
app.use("/usuario", RotasUsuario);
app.use("/professor", RotasProfessor);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
