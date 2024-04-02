import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { UserEntity } from "./user.entity";

@Entity({
  name: "user_pj",
})
export class UserPJEntity {
  @PrimaryGeneratedColumn()
  id?: string;

  @Column()
  legalName: string; // Razão Social

  @Column()
  brandName: string; // Nome Fantasia

  @Column({
    length: 14,
  })
  cnpj: string;

  @Column()
  ie: string;

  @Column({
    nullable: true,
  })
  im?: string;

  @Column()
  establishmentAt: string; // Data de abertura

  @OneToOne(() => UserEntity, (user) => user.PJ)
  @JoinColumn({ name: "userId" })
  userId: UserEntity;
}
