import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import ServicosUsuario from "./serviços-usuario";
import { Professor } from "../entidades/Professor";
import { Usuario } from "../entidades/Usuario";

export default class ServicosProfessor {
  static async cadastrarProfessor(request: Request, response: Response): Promise<Response> {
    try {
      const usuario_info = request.body;

      const { usuario, token } = await ServicosUsuario.cadastrarUsuario(usuario_info);

      const professorRepo = AppDataSource.getRepository(Professor);
      const professor = professorRepo.create({ usuario });

      await professorRepo.save(professor);

      return response.json({ professor, token });
    } catch (error) {
      return response.status(500).json({ erro: "Erro BD: cadastrarProfessor" });
    }
  }

  static async buscarProfessorPorId(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;

      const professorRepo = AppDataSource.getRepository(Professor);
      const professor = await professorRepo.findOne({
        where: { id: Number(id) },
        relations: ["usuario"],
      });

      if (!professor) {
        return response.status(404).json({ erro: "Professor não encontrado." });
      }

      return response.json(professor);
    } catch {
      return response.status(500).json({ erro: "Erro BD: buscarProfessorPorId" });
    }
  }
}
