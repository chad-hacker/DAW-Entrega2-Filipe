import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Aluno } from "./Aluno";
import { Proposta } from "./Proposta";

@Entity("interesses")
export class Interesse {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Aluno, { eager: true })
  aluno!: Aluno;

  @ManyToOne(() => Proposta, { eager: true })
  proposta!: Proposta;
}
