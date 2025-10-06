"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../data-source");
const servi_os_usuario_1 = __importDefault(require("./servi\u00E7os-usuario"));
const Professor_1 = require("../entidades/Professor");
class ServicosProfessor {
    static async cadastrarProfessor(request, response) {
        try {
            const usuario_info = request.body;
            const { usuario, token } = await servi_os_usuario_1.default.cadastrarUsuario(usuario_info);
            const professorRepo = data_source_1.AppDataSource.getRepository(Professor_1.Professor);
            const professor = professorRepo.create({ usuario });
            await professorRepo.save(professor);
            return response.json({ professor, token });
        }
        catch (error) {
            return response.status(500).json({ erro: "Erro BD: cadastrarProfessor" });
        }
    }
    static async buscarProfessorPorId(request, response) {
        try {
            const { id } = request.params;
            const professorRepo = data_source_1.AppDataSource.getRepository(Professor_1.Professor);
            const professor = await professorRepo.findOne({
                where: { id: Number(id) },
                relations: ["usuario"],
            });
            if (!professor) {
                return response.status(404).json({ erro: "Professor não encontrado." });
            }
            return response.json(professor);
        }
        catch {
            return response.status(500).json({ erro: "Erro BD: buscarProfessorPorId" });
        }
    }
}
exports.default = ServicosProfessor;
