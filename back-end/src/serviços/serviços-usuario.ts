import bcrypt from "bcrypt";
import dotenv from "dotenv";
import md5 from "md5";
import { sign } from "jsonwebtoken";
import { Request, Response } from "express";

import { AppDataSource } from "../data-source";
import { Usuario, Perfil } from "../entidades/Usuario";
import { Professor } from "../entidades/Professor";
import { Aluno } from "../entidades/Aluno";

dotenv.config();

const SALT = 10;
const SENHA_JWT = process.env.SENHA_JWT as string;

export default class ServicosUsuario {
  static async verificarCpfExistente(request: Request, response: Response): Promise<Response> {
    try {
      const cpf_encriptado = md5(request.params.cpf);

      const usuarioRepo = AppDataSource.getRepository(Usuario);
      const usuario = await usuarioRepo.findOne({ where: { cpf: cpf_encriptado } });

      if (usuario) return response.status(409).json({ erro: "CPF já cadastrado." });

      return response.status(200).json({ existe: false });
    } catch {
      return response.status(500).json({ erro: "Erro BD: verificarCpfExistente" });
    }
  }

  static async verificarCadastroCompleto(usuario: Usuario): Promise<boolean> {
    switch (usuario.perfil) {
      case Perfil.PROFESSOR: {
        const professorRepo = AppDataSource.getRepository(Professor);
        const professor = await professorRepo.findOne({
          where: { usuario: { cpf: usuario.cpf } },
          relations: ["usuario"],
        });
        return !!professor;
      }
      case Perfil.ALUNO: {
        const alunoRepo = AppDataSource.getRepository(Aluno);
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

  static async logarUsuario(request: Request, response: Response): Promise<Response> {
    try {
      const { nome_login, senha } = request.body;
      if (!nome_login || !senha)
        return response.status(400).json({ erro: "nome_login e senha são obrigatórios." });

      const cpf_encriptado = md5(nome_login);

      const usuarioRepo = AppDataSource.getRepository(Usuario);
      const usuario = await usuarioRepo.findOne({ where: { cpf: cpf_encriptado } });

      if (!usuario) return response.status(404).json({ erro: "Nome de usuário não cadastrado." });

      const cadastro_completo = await this.verificarCadastroCompleto(usuario);
      if (!cadastro_completo) {
        await usuarioRepo.remove(usuario);
        return response.status(400).json({
          erro: "Cadastro incompleto. Por favor, realize o cadastro novamente.",
        });
      }

      const senha_correta = await bcrypt.compare(senha, usuario.senha);
      if (!senha_correta) return response.status(401).json({ erro: "Senha incorreta." });

      if (!SENHA_JWT) throw new Error("SENHA_JWT não configurada no .env");

      const token = sign(
        { perfil: usuario.perfil, email: usuario.email },
        SENHA_JWT,
        { subject: usuario.nome, expiresIn: "1d" }
      );

      return response.json({
        usuarioLogado: {
          nome: usuario.nome,
          perfil: usuario.perfil,
          email: usuario.email,
          questao: (usuario as any).questao,
          status: (usuario as any).status,
          cor_tema: (usuario as any).cor_tema,
          token,
        },
      });
    } catch {
      return response.status(500).json({ erro: "Erro BD: logarUsuario" });
    }
  }

  static async cadastrarUsuario(usuario_informado: any): Promise<{ usuario: Usuario; token: string }> {
    try {
      const { cpf, nome, perfil, email, senha, questao, resposta, cor_tema } = usuario_informado;

      const cpf_encriptado = md5(cpf);
      const senha_encriptada = await bcrypt.hash(senha, SALT);
      const resposta_encriptada = await bcrypt.hash(resposta, SALT);

      const repo = AppDataSource.getRepository(Usuario);
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

      if (!SENHA_JWT) throw new Error("SENHA_JWT não configurada no .env");

      const token = sign(
        { perfil: usuario.perfil, email: usuario.email },
        SENHA_JWT,
        { subject: usuario.nome, expiresIn: "1d" }
      );

      return { usuario, token };
    } catch {
      throw new Error("Erro BD: cadastrarUsuario");
    }
  }
}
