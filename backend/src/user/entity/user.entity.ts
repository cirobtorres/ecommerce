import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Privileges } from "../enum/privilege.enum";
import { AddressEntity } from "../../address/entity/address.entity";

@Entity({
  name: "user",
})
export class UserEntity {
  @PrimaryGeneratedColumn()
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

  @OneToMany(() => AddressEntity, (address) => address.userId, {
    cascade: true,
  })
  @JoinColumn({ name: "user_address" })
  address?: AddressEntity;

  @Column({
    nullable: true,
  })
  src?: string;

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
