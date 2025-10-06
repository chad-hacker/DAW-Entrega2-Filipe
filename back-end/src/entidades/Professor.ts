import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Usuario } from "./Usuario";

@Entity("professores")
export class Professor {
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToOne(() => Usuario, (u) => u.professor, { eager: true })
  @JoinColumn()
  usuario!: Usuario;
}
