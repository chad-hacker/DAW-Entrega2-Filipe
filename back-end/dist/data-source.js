"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const Aluno_1 = require("./entidades/Aluno");
const Professor_1 = require("./entidades/Professor");
const Usuario_1 = require("./entidades/Usuario");
const Proposta_1 = require("./entidades/Proposta");
const Interesse_1 = require("./entidades/Interesse");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: process.env.TYPEORM_HOST || "localhost",
    port: Number(process.env.TYPEORM_PORT) || 3306,
    username: process.env.TYPEORM_USERNAME || "root",
    password: process.env.TYPEORM_PASSWORD || "admin",
    database: process.env.TYPEORM_DATABASE || "banco",
    synchronize: false,
    logging: false,
    entities: [Aluno_1.Aluno, Professor_1.Professor, Usuario_1.Usuario, Proposta_1.Proposta, Interesse_1.Interesse],
    migrations: ["src/migrations/*.ts"],
    subscribers: [],
});
