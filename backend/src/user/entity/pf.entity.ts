import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { UserEntity } from "./user.entity";

@Entity({
  name: "user_pf",
})
export class UserPFEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({
    length: 11,
  })
  cpf: string;

  @Column({
    length: 10,
    nullable: true,
  })
  rg?: string;

  @Column()
  birthAt?: string;

  @OneToOne(() => UserEntity, (user) => user.PF)
  @JoinColumn({ name: "userId" })
  userId: UserEntity;
}
