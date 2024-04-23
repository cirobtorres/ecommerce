import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Privileges } from "../enum/privilege.enum";
import { AddressEntity } from "../../address/entity/address.entity";
import { UserPFEntity } from "./pf.entity";
import { UserPJEntity } from "./pj.entity";

@Entity({
  name: "user",
})
export class UserEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({
    length: 125,
    unique: true,
  })
  email: string;

  @Column({
    length: 11,
  })
  phone: string;

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

  @OneToOne(() => UserPFEntity, (pf) => pf.userId, {
    eager: true,
    nullable: true,
  })
  @JoinColumn({ name: "pf" })
  PF: UserPFEntity;

  @OneToOne(() => UserPJEntity, (pj) => pj.userId, {
    eager: true,
    nullable: true,
  })
  @JoinColumn({ name: "pj" })
  PJ: UserPJEntity;

  @OneToMany(() => AddressEntity, (address) => address.id, {
    nullable: true,
    cascade: true,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "address" })
  address?: AddressEntity[];
}
