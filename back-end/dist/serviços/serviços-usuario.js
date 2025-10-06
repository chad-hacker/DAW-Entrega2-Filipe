"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
const md5_1 = __importDefault(require("md5"));
const jsonwebtoken_1 = require("jsonwebtoken");
const data_source_1 = require("../data-source");
const Usuario_1 = require("../entidades/Usuario");
const Professor_1 = require("../entidades/Professor");
const Aluno_1 = require("../entidades/Aluno");
dotenv_1.default.config();
const SALT = 10;
const SENHA_JWT = process.env.SENHA_JWT;
class ServicosUsuario {
    static async verificarCpfExistente(request, response) {
        try {
            const cpf_encriptado = (0, md5_1.default)(request.params.cpf);
            const usuarioRepo = data_source_1.AppDataSource.getRepository(Usuario_1.Usuario);
            const usuario = await usuarioRepo.findOne({ where: { cpf: cpf_encriptado } });
            if (usuario)
                return response.status(409).json({ erro: "CPF já cadastrado." });
            return response.status(200).json({ existe: false });
        }
        catch {
            return response.status(500).json({ erro: "Erro BD: verificarCpfExistente" });
        }
    }
    static async verificarCadastroCompleto(usuario) {
        switch (usuario.perfil) {
            case Usuario_1.Perfil.PROFESSOR: {
                const professorRepo = data_source_1.AppDataSource.getRepository(Professor_1.Professor);
                const professor = await professorRepo.findOne({
                    where: { usuario: { cpf: usuario.cpf } },
                    relations: ["usuario"],
                });
                return !!professor;
            }
            case Usuario_1.Perfil.ALUNO: {
                const alunoRepo = data_source_1.AppDataSource.getRepository(Aluno_1.Aluno);
                const aluno = await alunoRepo.findOne({
                    where: { usuario: { cpf: usuario.cpf } },
                    relations: ["usuario"],
                });
                return !!aluno;
            }
            default:
                return false;
        }
    }
    static async logarUsuario(request, response) {
        try {
            const { nome_login, senha } = request.body;
            if (!nome_login || !senha)
                return response.status(400).json({ erro: "nome_login e senha são obrigatórios." });
            const cpf_encriptado = (0, md5_1.default)(nome_login);
            const usuarioRepo = data_source_1.AppDataSource.getRepository(Usuario_1.Usuario);
            const usuario = await usuarioRepo.findOne({ where: { cpf: cpf_encriptado } });
            if (!usuario)
                return response.status(404).json({ erro: "Nome de usuário não cadastrado." });
            const cadastro_completo = await this.verificarCadastroCompleto(usuario);
            if (!cadastro_completo) {
                await usuarioRepo.remove(usuario);
                return response.status(400).json({
                    erro: "Cadastro incompleto. Por favor, realize o cadastro novamente.",
                });
            }
            const senha_correta = await bcrypt_1.default.compare(senha, usuario.senha);
            if (!senha_correta)
                return response.status(401).json({ erro: "Senha incorreta." });
            if (!SENHA_JWT)
                throw new Error("SENHA_JWT não configurada no .env");
            const token = (0, jsonwebtoken_1.sign)({ perfil: usuario.perfil, email: usuario.email }, SENHA_JWT, { subject: usuario.nome, expiresIn: "1d" });
            return response.json({
                usuarioLogado: {
                    nome: usuario.nome,
                    perfil: usuario.perfil,
                    email: usuario.email,
                    questao: usuario.questao,
                    status: usuario.status,
                    cor_tema: usuario.cor_tema,
                    token,
                },
            });
        }
        catch {
            return response.status(500).json({ erro: "Erro BD: logarUsuario" });
        }
    }
    static async cadastrarUsuario(usuario_informado) {
        try {
            const { cpf, nome, perfil, email, senha, questao, resposta, cor_tema } = usuario_informado;
            const cpf_encriptado = (0, md5_1.default)(cpf);
            const senha_encriptada = await bcrypt_1.default.hash(senha, SALT);
            const resposta_encriptada = await bcrypt_1.default.hash(resposta, SALT);
            const repo = data_source_1.AppDataSource.getRepository(Usuario_1.Usuario);
            const usuario = repo.create({
                cpf: cpf_encriptado,
                nome,
                perfil,
                email,
                senha: senha_encriptada,
                questao,
                resposta: resposta_encriptada,
                cor_tema,
            });
            await repo.save(usuario);
            if (!SENHA_JWT)
                throw new Error("SENHA_JWT não configurada no .env");
            const token = (0, jsonwebtoken_1.sign)({ perfil: usuario.perfil, email: usuario.email }, SENHA_JWT, { subject: usuario.nome, expiresIn: "1d" });
            return { usuario, token };
        }
        catch {
            throw new Error("Erro BD: cadastrarUsuario");
        }
    }
}
exports.default = ServicosUsuario;
