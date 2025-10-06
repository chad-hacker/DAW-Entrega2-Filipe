import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Usuario } from "./Usuario";

@Entity("alunos")
export class Aluno {
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToOne(() => Usuario, (u) => u.aluno, { eager: true })
  @JoinColumn()
  usuario!: Usuario;
}
