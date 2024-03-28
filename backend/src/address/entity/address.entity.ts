import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { UserEntity } from "../../user/entity/user.entity";

@Entity({
  name: "user_address",
})
export class AddressEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({
    length: 255,
  })
  street: string;

  @Column({
    length: 6,
  })
  number: string;

  @Column({
    length: 115,
  })
  neighborhood: string;

  @Column({
    length: 115,
  })
  city: string;

  @Column({
    length: 30,
  })
  state: string;

  @Column({
    length: 8,
  })
  zipCode: string; // CEP

  @Column({
    length: 115,
  })
  place: string; // Complemento

  @ManyToOne(() => UserEntity, (user) => user.id)
  @JoinColumn({ name: "user" })
  user: UserEntity;
}
