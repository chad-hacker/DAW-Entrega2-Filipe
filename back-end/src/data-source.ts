import "reflect-metadata";
import { DataSource } from "typeorm";
import { Aluno } from "./entidades/Aluno";
import { Professor } from "./entidades/Professor";
import { Usuario } from "./entidades/Usuario";
import { Proposta } from "./entidades/Proposta";
import { Interesse } from "./entidades/Interesse";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.TYPEORM_HOST || "localhost",
  port: Number(process.env.TYPEORM_PORT) || 3306,
  username: process.env.TYPEORM_USERNAME || "root",
  password: process.env.TYPEORM_PASSWORD || "admin",
  database: process.env.TYPEORM_DATABASE || "banco",
  synchronize: false,
  logging: false,
  entities: [Aluno, Professor, Usuario, Proposta, Interesse],
  migrations: ["src/migrations/*.ts"],
  subscribers: [],
});
