import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Professor } from "./Professor";
import { Aluno } from "./Aluno";

export enum Perfil {
  PROFESSOR = "PROFESSOR",
  ALUNO = "ALUNO",
}

@Entity("usuarios")
export class Usuario {
  @PrimaryGeneratedColumn()
  id!: number;

  // no sistema seu "login" é o CPF md5
  @Column({ unique: true })
  cpf!: string;

  @Column()
  nome!: string;

  @Column({ type: "enum", enum: Perfil })
  perfil!: Perfil;

  @Column({ unique: true })
  email!: string;

  @Column()
  senha!: string;

  @Column({ nullable: true })
  questao!: string;

  @Column({ nullable: true })
  resposta!: string;

  @Column({ nullable: true })
  cor_tema!: string;

  // Relacionamentos opcionais (inverse side)
  @OneToOne(() => Professor, (p) => p.usuario, { cascade: true })
  professor?: Professor;

  @OneToOne(() => Aluno, (a) => a.usuario, { cascade: true })
  aluno?: Aluno;
}
