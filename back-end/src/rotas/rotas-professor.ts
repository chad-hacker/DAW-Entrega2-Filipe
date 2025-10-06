import { Router } from "express";
import verificarToken from "../middlewares/verificar-token";
import verificarPerfilProfessor from "../middlewares/verificar-perfil-professor";
import ServiçosProfessor from "../serviços/serviços-professor";

const RotasProfessor = Router();
RotasProfessor.post("/", ServiçosProfessor.cadastrarProfessor);
// ...
RotasProfessor.get("/:id", verificarToken, verificarPerfilProfessor, ServiçosProfessor.buscarProfessorPorId);


export default RotasProfessor;
