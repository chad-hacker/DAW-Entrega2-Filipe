import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Professor } from "./Professor";

@Entity("propostas")
export class Proposta {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  titulo!: string;

  @Column({ type: "text" })
  descricao!: string;

  @ManyToOne(() => Professor, { eager: true })
  professor!: Professor;
}
