import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Privileges } from "../enum/privilege.enum";

@Entity({
  name: "users",
  // schema: "ecommerce",
})
export class UserEntity {
  @PrimaryGeneratedColumn({
    unsigned: true,
  })
  id?: number;

  @Column({
    length: 65,
  })
  firstName: string;

  @Column({
    length: 125,
  })
  lastName?: string;

  @Column({
    type: "date",
    nullable: true,
  })
  birthAt?: string;

  @Column({
    length: 11,
    unique: true,
  })
  cpf: string;

  @Column({
    length: 11,
  })
  phone: string;

  @Column({
    length: 125,
    unique: true,
  })
  email: string;

  @Column()
  password: string;

  @CreateDateColumn()
  createdAt?: string;

  @UpdateDateColumn()
  updatedAt?: string;

  @Column()
  privacyPolicy: boolean;

  @Column({
    default: Privileges.User,
  })
  privileges?: number;

  @Column({
    default: true,
  })
  active?: boolean;
}
